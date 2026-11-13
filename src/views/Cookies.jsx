import LegalPage from "../components/LegalPage";

const SECTIONS = [
  {
    id: "summary",
    heading: "The short version",
    body: [
      "Starlight Vanta does not use advertising cookies, analytics cookies, tracking pixels or cross-site trackers. Your preferences and saved names live in your browser's local storage, Stripe may set payment cookies on the Donate page. Our delivery or security providers may also set necessary security cookies.",
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
      "When you open the Donate page, Stripe's payment script loads and may set these cookies to detect fraud and keep card payments safe. They are strictly necessary for taking a payment, and Stripe does not load on the generator pages.",
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
      "The site itself does not install advertising, analytics, or social media cookies. Security providers may set a cookie during a bot check or challenge. If that ever changes, this policy will be updated first, and we will ask for consent wherever the law requires it.",
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
    id: "providers",
    heading: "Provider changes and language",
    body: [
      "We may replace hosting, network-security or payment providers. If that changes the cookies or browser storage used on your device, we will update this policy and obtain consent before using optional technology where applicable law requires it.",
      "The English version is the original and controlling version. Any translation is offered solely for convenience and accessibility and cannot be guaranteed to be complete, current or error-free. If a translation conflicts with the English version, the English version governs unless applicable law requires otherwise.",
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
      updated="13 November 2026"
      intro={["Every cookie and piece of browser storage Starlight Vanta can use, what each one is for, and how to remove it."]}
      sections={SECTIONS}
    />
  );
}
