import LegalPage from "../components/LegalPage";

const SECTIONS = [
  {
    id: "agreement",
    heading: "Agreement",
    body: [
      "These Terms govern your use of Starlapse Vanta at vanta.starsolenterprise.com, operated by Starlapse Solutions, Inc., a Delaware corporation. By using the site you accept them, together with our Privacy Policy and Cookie Policy. If you do not accept them, do not use the site.",
      "There is no account to create, so acceptance is by use. You must be old enough to enter into a binding agreement where you live, and at least 13 years old, to use the site.",
    ],
  },
  {
    id: "service",
    heading: "What the service is",
    body: [
      "Starlapse Vanta generates candidate usernames. The generator runs inside your browser using code delivered with the page. It produces character strings from a vocabulary and a set of phonetic rules.",
      "The service is provided free of charge. We may change, suspend or discontinue any part of it at any time, and we are not obliged to keep any particular feature, preset or collection available.",
    ],
  },
  {
    id: "names",
    heading: "Names you generate",
    body: [
      "We claim no ownership of the character strings the generator produces and we place no restriction on your use of them. A generated string is not itself a creative work we license to you.",
      "That also means we make no promise about a generated name. In particular, we do not check whether a name is available on any platform, whether it is already used by somebody else, or whether it infringes a trademark, business name or personal name belonging to a third party. Those checks are yours to make before you register or publish a name.",
      "The generator filters an obvious blocklist, but it is producing novel strings by rule and may still output something that resembles an existing brand, a real person's name, or a word that is offensive in a language we did not anticipate. Use judgement before adopting a result.",
    ],
  },
  {
    id: "acceptable",
    heading: "Acceptable use",
    body: ["You agree not to:"],
    list: [
      "use the site to impersonate a person, brand or organisation, or to prepare an account intended to deceive;",
      "use generated names in connection with fraud, harassment, or any unlawful activity;",
      "automate requests against the site at a rate that degrades it for others, or attempt to inflate the public counter;",
      "create payment requests you do not intend to complete, or use the donation form to test payment cards;",
      "attempt to gain unauthorised access to the site, its infrastructure, or any data held by our providers;",
      "remove, obscure or alter any proprietary notice in the site or its source.",
    ],
  },
  {
    id: "ownership",
    heading: "Ownership of the site",
    body: [
      "The site itself — its interface, wording, the generation engine, the curated vocabulary, the scoring model and the Starlapse Vanta and Starlapse Solutions names and marks — is owned by Starlapse Solutions, Inc. and protected by copyright and other laws.",
      "You are granted a personal, revocable, non-exclusive licence to use the site as published. That licence does not include the right to copy the engine or vocabulary into another product, to resell access, or to present the service as your own.",
    ],
  },
  {
    id: "donations",
    heading: "Donations",
    body: [
      "Donations are voluntary contributions to Starlapse Solutions, Inc. They are not a purchase, they do not buy a product, a feature, a service level or any other benefit, and they do not create a contract for the supply of anything.",
      "Donations are not tax deductible. Starlapse Solutions, Inc. is not a charitable organisation.",
      "Because nothing is supplied in return, donations are generally non-refundable, except where a refund is required by law or where a payment was made in error. Write to help@starsolenterprise.com before raising a dispute with your bank; a mistaken or duplicated payment is faster to resolve directly.",
      "Payments are processed by Stripe and are subject to Stripe's own terms. We never receive or store your card details.",
    ],
  },
  {
    id: "warranty",
    heading: "No warranty",
    body: [
      "The site is provided “as is” and “as available”. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including any implied warranty of merchantability, fitness for a particular purpose and non-infringement.",
      "We do not warrant that the site will be uninterrupted, that generation will always succeed, that results will suit your purpose, or that any name will be available for you to register.",
    ],
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, Starlapse Solutions, Inc. is not liable for indirect, incidental, special, consequential or punitive damages, or for loss of profit, goodwill, data or opportunity, arising from your use of the site or from your adoption of a generated name.",
      "Where liability cannot be excluded, our total aggregate liability arising out of or relating to the site is limited to the greater of the amount you donated in the twelve months before the claim, or twenty-five US dollars.",
      "Nothing here excludes or limits liability that cannot lawfully be excluded, including for fraud or for death or personal injury caused by negligence. Some jurisdictions do not allow certain exclusions, in which case those exclusions apply only so far as that jurisdiction permits.",
    ],
  },
  {
    id: "indemnity",
    heading: "Indemnity",
    body: [
      "You agree to indemnify Starlapse Solutions, Inc. against claims, losses and reasonable legal costs arising from your use of the site in breach of these Terms, or from your use of a generated name in a way that infringes the rights of a third party.",
    ],
  },
  {
    id: "changes",
    heading: "Changes and termination",
    body: [
      "We may update these Terms as the service changes. The date at the top of this page changes with them, and material changes are described on this page before they take effect. Continued use after that point means you accept the revised Terms. Changes never apply to a dispute that arose before they were posted.",
      "We may suspend access for anyone using the site in breach of these Terms. You may stop using the site at any time; clearing your browser's site data removes everything the site has kept.",
    ],
  },
  {
    id: "law",
    heading: "Governing law",
    body: [
      "These Terms are governed by the laws of the State of Delaware and applicable United States federal law, without regard to conflict-of-law rules. Before bringing a claim, write to legal@starsolenterprise.com so we can try to resolve it informally within 60 days.",
      "Any dispute that is not resolved informally will be heard in the state or federal courts located in Delaware, and both sides consent to their jurisdiction. Nothing here removes mandatory consumer protections available to you where you live.",
      "If any provision of these Terms is found unenforceable, the rest remain in force. Not enforcing a provision straight away does not waive it.",
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    body: ["Legal enquiries can be directed to legal@starsolenterprise.com."],
  },
];

export default function Terms() {
  return (
    <>
      <LegalPage
        title="Terms of service"
        updated="27 October 2026"
        intro={[
          "Plain terms for a free tool, from Starlapse Solutions, Inc., a Delaware corporation. The parts most worth reading are what a generated name does not come with, and how donations are treated.",
        ]}
        sections={SECTIONS}
      />
    </>
  );
}
