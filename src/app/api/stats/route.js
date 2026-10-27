import { neon } from "@neondatabase/serverless";
import { clientAddress, isSameOrigin, withinLimit } from "@/lib/server/guard";
import { STYLES } from "@/lib/engine/lexicon";

export const dynamic = "force-dynamic";

const BASELINE = 5000;
const MAX_PER_REQUEST = 240;
const WRITES_PER_MINUTE = 20;
const UNCONFIGURED = { configured: false, total: BASELINE, today: 0, week: 0, baseline: BASELINE, styles: [] };

let schemaReady = false;

function client() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  return url ? neon(url) : null;
}

async function ensureSchema(sql) {
  if (schemaReady) return;
  await sql`
    create table if not exists vanta_daily (
      day date primary key,
      names bigint not null default 0,
      sessions bigint not null default 0
    )
  `;
  await sql`
    create table if not exists vanta_style_daily (
      day date not null,
      style text not null,
      names bigint not null default 0,
      primary key (day, style)
    )
  `;
  schemaReady = true;
}

async function readStats(sql) {
  const [totals] = await sql`
    select
      coalesce(sum(names), 0)::bigint as total,
      coalesce(sum(names) filter (where day = current_date), 0)::bigint as today,
      coalesce(sum(names) filter (where day >= current_date - 6), 0)::bigint as week
    from vanta_daily
  `;
  const styles = await sql`
    select style, sum(names)::bigint as names
    from vanta_style_daily
    where day >= current_date - 6
    group by style
    order by names desc
    limit 5
  `;
  return {
    total: BASELINE + Number(totals?.total ?? 0),
    today: Number(totals?.today ?? 0),
    week: Number(totals?.week ?? 0),
    baseline: BASELINE,
    styles: styles.map((row) => ({ style: row.style, names: Number(row.names) })),
  };
}

function reply(body, status = 200) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

export async function GET() {
  const sql = client();
  if (!sql) return reply(UNCONFIGURED);
  try {
    await ensureSchema(sql);
    return reply({ configured: true, ...(await readStats(sql)) });
  } catch (error) {
    console.error("stats", error?.code || "unknown");
    return reply(UNCONFIGURED);
  }
}

export async function POST(request) {
  const sql = client();
  if (!sql) return reply(UNCONFIGURED);
  if (!isSameOrigin(request)) return reply({ error: "forbidden" }, 403);
  if (!withinLimit(`stats:${clientAddress(request)}`, WRITES_PER_MINUTE)) return reply({ error: "rate_limited" }, 429);

  let body;
  try {
    body = await request.json();
  } catch {
    return reply({ error: "invalid_body" }, 400);
  }

  const count = Math.min(MAX_PER_REQUEST, Math.max(0, Math.floor(Number(body?.count)) || 0));
  const style = STYLES.includes(body?.style) ? body.style : "unknown";

  try {
    await ensureSchema(sql);
    if (count > 0) {
      await sql`
        insert into vanta_daily (day, names, sessions)
        values (current_date, ${count}, 1)
        on conflict (day) do update
          set names = vanta_daily.names + ${count},
              sessions = vanta_daily.sessions + 1
      `;
      await sql`
        insert into vanta_style_daily (day, style, names)
        values (current_date, ${style}, ${count})
        on conflict (day, style) do update
          set names = vanta_style_daily.names + ${count}
      `;
    }
    return reply({ configured: true, ...(await readStats(sql)) });
  } catch (error) {
    console.error("stats", error?.code || "unknown");
    return reply(UNCONFIGURED);
  }
}
