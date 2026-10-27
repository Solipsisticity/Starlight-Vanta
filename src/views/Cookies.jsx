import LegalPage from "../components/LegalPage";

const SECTIONS = [
  {
    id: "summary",
    heading: "The short version",
    body: [
      "Starlight Vanta does not use advertising cookies, analytics cookies, tracking pixels or cross-site trackers. Your preferences and saved names live in your browser's local storage, and the only cookies come from Stripe, and only on the Donate page.",
    ],
  },
  {
    id: "storage",
    heading: "Local storage",
    body: [
      "Local storage keeps information on your device for this site only. It is never sent with a request, so we cannot read it. These are the values Starlight Vanta writes:",
    ],
    list: [
      "vanta.favorites: names you have bookmarked. Kept until you remove them.",
      "vanta.history: the first few names from each generator run. Trimmed to the limit set in Settings.",
      "vanta.config: your current generator options.",
      "vanta.settings: motion, sound, history and counter preferences.",
      "vanta.taste: your answers in the keep-or-pass panel on the home page.",
    ],
  },
  {
    id: "stripe",
    heading: "Cookies on the Donate page",
    body: [
      "When you open the Donate page, Stripe's payment script loads and may set these cookies to detect fraud and keep card payments safe. They are strictly necessary for taking a payment, and they are not set anywhere else on the site.",
    ],
    list: [
      "__stripe_mid: identifies the browser to Stripe's fraud checks. Lasts one year.",
      "__stripe_sid: identifies the current payment session. Lasts 30 minutes.",
    ],
  },
  {
    id: "none",
    heading: "What the site does not use",
    body: [
      "There are no advertising, analytics, social media or session cookies, because there are no ads, no analytics tools and no accounts. If that ever changes, this policy will be updated first, and we will ask for consent wherever the law requires it.",
    ],
  },
  {
    id: "control",
    heading: "Your choices",
    body: [
      "Settings has an Erase everything button that clears every local-storage value above in one step. You can also clear site data or block cookies from your browser's settings. Blocking Stripe's cookies may stop the donation form from working, and has no effect on the generator.",
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    body: ["Questions about this policy can be sent to privacy@starsolenterprise.com."],
  },
];

export default function Cookies() {
  return (
    <LegalPage
      title="Cookie policy"
      updated="27 October 2026"
      intro={["Every cookie and piece of browser storage Starlight Vanta can use, what each one is for, and how to remove it."]}
      sections={SECTIONS}
    />
  );
}
