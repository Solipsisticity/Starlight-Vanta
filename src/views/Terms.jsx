import LegalPage from "../components/LegalPage";

const SECTIONS = [
  {
    id: "agreement",
    heading: "Agreement",
    body: [
      "These Terms govern your use of Starlight Vanta at vanta.starsolenterprise.com, operated by Starlight Solutions, Inc., a Wyoming corporation. By using the site you accept them, together with our Privacy Policy, Cookie Policy, and the company-wide Terms of Service at starsolenterprise.com/terms. These product terms control for subjects they address specifically; the company-wide terms govern other matters. If you do not accept them, do not use the site.",
      "There is no account to create, so acceptance is by use. You must be old enough to enter into a binding agreement where you live, and at least 13 years old, to use the site.",
    ],
  },
  {
    id: "service",
    heading: "What the service is",
    body: [
      "Starlight Vanta generates candidate usernames. The generator runs inside your browser using code delivered with the page. It produces character strings from a vocabulary and a set of phonetic rules.",
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
      "The site itself — its interface, wording, the generation engine, the curated vocabulary, the scoring model and the Starlight Vanta and Starlight Solutions names and marks — is owned by Starlight Solutions and protected by copyright and other laws.",
      "You are granted a personal, revocable, non-exclusive licence to use the site as published. That licence does not include the right to copy the engine or vocabulary into another product, to resell access, or to present the service as your own.",
    ],
  },
  {
    id: "donations",
    heading: "Donations",
    body: [
      "Donations are voluntary contributions to Starlight Solutions. They are not a purchase, they do not buy a product, a feature, a service level or any other benefit, and they do not create a contract for the supply of anything.",
      "Donations are not tax deductible. Starlight Solutions is not a charitable organisation.",
      "Because nothing is supplied in return, donations are generally non-refundable, except where a refund is required by law or where a payment was made in error. Write to help@starsolenterprise.com before raising a dispute with your bank; a mistaken or duplicated payment is faster to resolve directly.",
      "Payments are processed by Stripe and are subject to Stripe's own terms. We never receive or store your card details.",
      "We may retain the customer, transaction, donation, refund, dispute, chargeback, risk and limited payment-method information Stripe makes available when reasonably necessary to administer the donation, issue a receipt or refund, prevent or investigate fraud and abuse, keep accounting and tax records, comply with law or legal process, enforce our agreements, or establish, exercise or defend legal claims.",
    ],
  },
  {
    id: "infrastructure",
    heading: "Infrastructure, domains and provider changes",
    body: [
      "We may select, replace or migrate hosting, cloud, storage, payment, security, DNS, domain-registration, certificate and other infrastructure providers, and may change servers, data centres, domains, subdomains, network addresses, endpoints or deployment architecture, when reasonably necessary to operate, maintain, secure, restore, scale, improve or transition Vanta, or to comply with law.",
      "A migration may require transaction, counter, configuration, security and other records to be transferred to a successor provider. Personal-information processing remains subject to the Privacy Policy, applicable safeguards and applicable law. Replacing infrastructure does not authorise a materially different use of information previously collected.",
      "We may redirect Vanta to an official replacement address and discontinue an earlier address after a reasonable transition where practicable. A migration may cause temporary interruption. Nothing in this section limits a right that cannot lawfully be waived.",
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
      "To the fullest extent permitted by law, Starlight Solutions is not liable for indirect, incidental, special, consequential or punitive damages, or for loss of profit, goodwill, data or opportunity, arising from your use of the site or from your adoption of a generated name.",
      "Where liability cannot be excluded, our total aggregate liability arising out of or relating to the site is limited to the greater of the amount you donated in the twelve months before the claim, or twenty-five US dollars.",
      "Nothing here excludes or limits liability that cannot lawfully be excluded, including for fraud or for death or personal injury caused by negligence. Some jurisdictions do not allow certain exclusions, in which case those exclusions apply only so far as that jurisdiction permits.",
    ],
  },
  {
    id: "indemnity",
    heading: "Indemnity",
    body: [
      "You agree to indemnify Starlight Solutions against claims, losses and reasonable legal costs arising from your use of the site in breach of these Terms, or from your use of a generated name in a way that infringes the rights of a third party.",
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
      "Wyoming law and applicable United States federal law govern these Terms, without regard to conflict-of-law rules. Before bringing a claim, write to legal@starsolenterprise.com so we can try to resolve it informally within 30 days. This does not prevent urgent injunctive relief or a filing needed to preserve a legal deadline.",
      "Except where mandatory law provides otherwise, any dispute not resolved informally must be brought in a court with jurisdiction in Wyoming. Nothing here removes mandatory consumer protections or forums available where you live.",
      "If any provision of these Terms is found unenforceable, the rest remain in force. Not enforcing a provision straight away does not waive it.",
      "The English version is the original and controlling version. Any translation is offered solely for convenience and accessibility. Although we use reasonable care, we cannot guarantee that a translation is complete, current or error-free. If a translation conflicts with the English version, the English version governs unless applicable law requires otherwise.",
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
        updated="13 November 2026"
        intro={[
          "Terms for a free tool operated by Starlight Solutions, Inc. The sections on generated names, donations, infrastructure and liability deserve particular attention.",
        ]}
        sections={SECTIONS}
      />
    </>
  );
}
