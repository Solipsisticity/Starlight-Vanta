import Stripe from "stripe";
import { clientAddress, isSameOrigin, withinLimit } from "@/lib/server/guard";

export const dynamic = "force-dynamic";

const MIN_CENTS = 200;
const MAX_CENTS = 50000;
const PRESETS = [300, 500, 1000, 2500];
const REQUESTS_PER_MINUTE = 8;

function stripeKeys() {
  return {
    secret: process.env.STRIPE_LIVE_SECRET_KEY || process.env.STRIPE_SECRET_KEY || "",
    publishable: process.env.STRIPE_LIVE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY || "",
  };
}

function reply(body, status = 200) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

export function GET() {
  const { secret, publishable } = stripeKeys();
  const enabled = Boolean(secret && publishable);
  return reply({
    enabled,
    publishableKey: enabled ? publishable : "",
    livemode: publishable.startsWith("pk_live_"),
    currency: "usd",
    presets: PRESETS,
    min: MIN_CENTS,
    max: MAX_CENTS,
  });
}

export async function POST(request) {
  const { secret, publishable } = stripeKeys();
  if (!secret || !publishable) return reply({ error: "donations_unavailable" }, 503);
  if (!isSameOrigin(request)) return reply({ error: "forbidden" }, 403);
  if (!withinLimit(`donate:${clientAddress(request)}`, REQUESTS_PER_MINUTE)) return reply({ error: "rate_limited" }, 429);

  let body;
  try {
    body = await request.json();
  } catch {
    return reply({ error: "invalid_body" }, 400);
  }

  const amount = Math.round(Number(body?.amount));
  if (!Number.isFinite(amount) || amount < MIN_CENTS || amount > MAX_CENTS) {
    return reply({ error: "invalid_amount", min: MIN_CENTS, max: MAX_CENTS }, 400);
  }

  try {
    const stripe = new Stripe(secret, { apiVersion: "2025-08-27.basil" });
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      description: "Donation to Starlapse Vanta",
      automatic_payment_methods: { enabled: true },
      metadata: { product: "starlight-vanta", kind: "donation" },
    });
    return reply({ clientSecret: intent.client_secret, amount });
  } catch (error) {
    console.error("donate", error?.type || error?.code || "unknown");
    return reply({ error: "stripe_error" }, 500);
  }
}
