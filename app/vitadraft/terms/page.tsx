import type { Metadata } from "next";
import Link from "next/link";
import styles from "../privacy/page.module.css";

const effectiveDate = "July 19, 2026";
const supportEmail = "a.hakandemir23@gmail.com";

const sections = [
  ["agreement", "1. Agreement and Eligibility"],
  ["service", "2. The Service"],
  ["accounts", "3. Accounts"],
  ["user-content", "4. Your Content"],
  ["ai-content", "5. AI-Assisted Features"],
  ["acceptable-use", "6. Acceptable Use"],
  ["purchases", "7. Purchases and Subscriptions"],
  ["credits", "8. Credits and Digital Access"],
  ["third-parties", "9. Third-Party Services"],
  ["privacy", "10. Privacy and Account Deletion"],
  ["ownership", "11. Ownership"],
  ["availability", "12. Availability and Changes"],
  ["disclaimers", "13. Disclaimers"],
  ["liability", "14. Limitation of Liability"],
  ["termination", "15. Suspension and Termination"],
  ["law", "16. Governing Law"],
  ["changes", "17. Changes and Contact"],
] as const;

export const metadata: Metadata = {
  title: "VitaDraft Terms of Use",
  description:
    "Terms governing access to and use of the VitaDraft mobile application and related services.",
  alternates: {
    canonical: "/vitadraft/terms",
  },
  openGraph: {
    title: "VitaDraft Terms of Use",
    description: "Terms for the VitaDraft mobile application and related services.",
    url: "/vitadraft/terms",
    type: "website",
  },
};

export default function VitaDraftTermsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.topbar}>
        <Link className={styles.brand} href="/" aria-label="VitaDraft terms home">
          <span className={styles.brandMark} aria-hidden="true">
            VD
          </span>
          <span>
            <strong>VitaDraft</strong>
            <small>Legal Center</small>
          </span>
        </Link>
        <a className={styles.contactLink} href={`mailto:${supportEmail}`}>
          Contact support
        </a>
      </header>

      <section className={styles.hero} aria-labelledby="terms-title">
        <div className={styles.eyebrow}>Legal · Terms</div>
        <h1 id="terms-title">Terms of Use</h1>
        <p className={styles.heroText}>
          The rules that apply when you access or use VitaDraft and its
          AI-assisted resume tools.
        </p>
        <div className={styles.dateRow}>
          <span>Effective {effectiveDate}</span>
          <span aria-hidden="true">·</span>
          <span>Last updated {effectiveDate}</span>
        </div>
      </section>

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Terms of use contents">
          <p className={styles.sidebarTitle}>On this page</p>
          <nav>
            <ol>
              {sections.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className={styles.policy}>
          <div className={styles.introCard}>
            <p>
              These Terms of Use (&quot;Terms&quot;) are an agreement between you and
              <strong> Ahmet Hakan Demir</strong>, an individual developer located
              in <strong>Ankara, Türkiye</strong> (&quot;VitaDraft,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;). They govern your use of the VitaDraft
              mobile application and related services (collectively, the
              &quot;Service&quot;).
            </p>
            <p>
              Please read these Terms together with our{" "}
              <Link href="/vitadraft/privacy">Privacy Policy</Link>.
            </p>
          </div>

          <section id="agreement">
            <h2>1. Agreement and Eligibility</h2>
            <p>
              By downloading, accessing, creating an account for, purchasing
              through, or using the Service, you agree to these Terms. If you do
              not agree, do not use the Service.
            </p>
            <p>
              You must be at least 16 years old and legally able to enter into this
              agreement. If the law where you live requires parental or guardian
              consent, you may use the Service only with that consent.
            </p>
          </section>

          <section id="service">
            <h2>2. The Service</h2>
            <p>
              VitaDraft helps users parse, organize, tailor, generate, edit, and
              export resumes and cover letters. Features may include resume
              analysis, AI-assisted writing, templates, document exports,
              subscription plans, and optional rewarded advertisements.
            </p>
            <p>
              VitaDraft is a drafting and productivity tool. It is not an employer,
              recruiter, staffing agency, career adviser, lawyer, or government
              service, and it does not submit job applications on your behalf.
            </p>
          </section>

          <section id="accounts">
            <h2>3. Accounts</h2>
            <p>
              Some features require you to sign in with Google or Apple. You are
              responsible for maintaining control of your device and identity
              provider account and for activity performed through your VitaDraft
              account. Information you provide must be accurate and must not
              impersonate another person.
            </p>
            <p>
              Contact us promptly if you believe your account has been accessed
              without authorization.
            </p>
          </section>

          <section id="user-content">
            <h2>4. Your Content</h2>
            <p>
              You retain your rights in resumes, job descriptions, photos,
              instructions, and other content you provide (&quot;User Content&quot;).
              You grant VitaDraft a limited, non-exclusive license to host, copy,
              transmit, format, and process User Content only as reasonably needed
              to operate, secure, and improve the Service and to fulfill your
              requests.
            </p>
            <p>
              You represent that you have the rights and permissions needed to
              submit User Content. Do not upload confidential third-party material
              or unnecessary sensitive information. You are responsible for
              reviewing documents before exporting, sharing, or submitting them.
            </p>
          </section>

          <section id="ai-content">
            <h2>5. AI-Assisted Features</h2>
            <p>
              AI-assisted output may be incomplete, inaccurate, outdated, generic,
              or unsuitable for a particular role. VitaDraft does not guarantee an
              interview, employment, an applicant-tracking-system result, or any
              particular hiring outcome.
            </p>
            <p>
              You must review and, where necessary, correct all generated content.
              You remain responsible for the truthfulness, accuracy, legality, and
              appropriateness of documents you use or share. Do not represent
              generated claims, qualifications, or experience as true unless you
              have verified them.
            </p>
          </section>

          <section id="acceptable-use">
            <h2>6. Acceptable Use</h2>
            <p>You may not use the Service to:</p>
            <ul>
              <li>violate a law, regulation, court order, or another person&apos;s rights;</li>
              <li>upload content you do not have permission to use;</li>
              <li>create fraudulent credentials or materially misleading applications;</li>
              <li>harass, discriminate against, exploit, or harm another person;</li>
              <li>
                bypass usage limits, advertising verification, purchase checks,
                security controls, or access restrictions;
              </li>
              <li>
                reverse engineer, disrupt, overload, scrape, probe, or introduce
                malicious code into the Service, except where applicable law
                expressly permits otherwise; or
              </li>
              <li>resell or provide unauthorized access to the Service.</li>
            </ul>
          </section>

          <section id="purchases">
            <h2>7. Purchases and Subscriptions</h2>
            <p>
              Purchases are offered through the Apple App Store or Google Play and
              are processed by the applicable store. The price, currency, billing
              period, taxes, trial terms, and included benefits shown in the store
              purchase screen at confirmation control your purchase.
            </p>
            <ul>
              <li>
                Monthly subscriptions renew automatically unless cancelled through
                the applicable store before renewal, subject to the store&apos;s rules.
              </li>
              <li>
                You can manage or cancel an Apple subscription in your Apple account
                settings and a Google Play subscription in Google Play.
              </li>
              <li>
                Uninstalling VitaDraft or deleting your VitaDraft account does not
                automatically cancel a store subscription.
              </li>
              <li>
                Refunds, payment disputes, billing failures, and price changes are
                handled under applicable law and the store&apos;s terms and policies.
              </li>
            </ul>
            <p>
              Apple users are also subject to the{" "}
              <a
                href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                target="_blank"
                rel="noreferrer"
              >
                Apple Standard Licensed Application End User License Agreement
              </a>{" "}
              to the extent applicable. Google Play users are also subject to the
              applicable Google Play terms.
            </p>
          </section>

          <section id="credits">
            <h2>8. Credits and Digital Access</h2>
            <p>
              Subscription tiers may include different generation-credit
              allowances and daily limits. The exact allowance is shown before
              purchase. Subscription credits reset at the start of each renewal
              period and do not roll over. Daily and abuse-prevention limits may
              apply even when credits remain.
            </p>
            <p>
              Free, starter, grace-period, promotional, or rewarded-ad credits are
              limited, non-transferable, have no cash value, and may expire or be
              changed. A failed generation may be restored according to the
              Service&apos;s technical rules, but credits are not a stored-value account
              or currency.
            </p>
            <p>
              A lifetime-template purchase provides access to eligible premium
              templates for as long as VitaDraft continues to offer and support
              that feature. It does not include a lifetime subscription, unlimited
              AI generation, or ownership of the Service. Store-approved refunds,
              reversals, or transfers may remove the corresponding access.
            </p>
          </section>

          <section id="third-parties">
            <h2>9. Third-Party Services</h2>
            <p>
              The Service relies on third parties for authentication, hosting,
              AI processing, purchases, analytics or operational monitoring,
              email, and advertising. Their services may be subject to separate
              terms and privacy policies. VitaDraft is not responsible for websites,
              advertisements, job listings, employers, or services you choose to
              access outside VitaDraft.
            </p>
          </section>

          <section id="privacy">
            <h2>10. Privacy and Account Deletion</h2>
            <p>
              Our <Link href="/vitadraft/privacy">Privacy Policy</Link> explains
              how information is handled. You can delete your account from the app
              or submit a request through the{" "}
              <Link href="/vitadraft/delete-account">Delete Account page</Link>.
              Account deletion is permanent once completed and does not cancel an
              App Store or Google Play subscription.
            </p>
          </section>

          <section id="ownership">
            <h2>11. Ownership</h2>
            <p>
              VitaDraft and its software, interface, visual design, templates,
              branding, and other Service materials are owned by us or our
              licensors and are protected by intellectual-property laws. Subject
              to these Terms, we grant you a limited, personal, revocable,
              non-exclusive, non-transferable license to use the Service for its
              intended purpose.
            </p>
            <p>
              Your license does not give you ownership of VitaDraft or permission
              to extract or commercially redistribute its templates, source code,
              branding, or other protected materials.
            </p>
          </section>

          <section id="availability">
            <h2>12. Availability and Changes</h2>
            <p>
              We may maintain, update, add, remove, suspend, or discontinue Service
              features. Availability can be affected by maintenance, network
              conditions, store rules, third-party providers, legal requirements,
              security concerns, or events outside our reasonable control. Where
              required, we will provide notice or a remedy under applicable law.
            </p>
          </section>

          <section id="disclaimers">
            <h2>13. Disclaimers</h2>
            <p>
              To the maximum extent permitted by law, the Service is provided
              &quot;as is&quot; and &quot;as available.&quot; We do not warrant that it will be
              uninterrupted, error-free, secure, or suitable for every employer,
              recruiter, applicant tracking system, device, or file format.
            </p>
            <p>
              Nothing in these Terms excludes warranties or consumer rights that
              cannot lawfully be excluded where you live.
            </p>
          </section>

          <section id="liability">
            <h2>14. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, VitaDraft will not be liable
              for indirect, incidental, special, consequential, or punitive damages,
              or for lost opportunities, income, data, goodwill, or business arising
              from use of or inability to use the Service.
            </p>
            <p>
              These limitations do not apply where liability cannot lawfully be
              limited, including any mandatory rights available to consumers.
            </p>
          </section>

          <section id="termination">
            <h2>15. Suspension and Termination</h2>
            <p>
              You may stop using the Service at any time. We may restrict or suspend
              access when reasonably necessary to address fraud, abuse, a security
              risk, legal requirements, non-payment, or a material breach of these
              Terms. Where appropriate and legally required, we will provide notice
              and an opportunity to resolve the issue.
            </p>
            <p>
              Provisions that by their nature should survive termination—including
              ownership, payment obligations, disclaimers, and liability
              limitations—will continue to apply.
            </p>
          </section>

          <section id="law">
            <h2>16. Governing Law</h2>
            <p>
              These Terms are governed by the laws of Türkiye, without regard to
              conflict-of-law rules. Courts with jurisdiction in Ankara, Türkiye
              will have jurisdiction, except where the mandatory consumer laws of
              your country give you the right to bring a claim elsewhere or require
              another governing law.
            </p>
          </section>

          <section id="changes" className={styles.contactCard}>
            <div>
              <p className={styles.sectionLabel}>Legal contact</p>
              <h2>17. Changes and Contact</h2>
              <p>
                We may update these Terms as the Service or legal requirements
                change. We will update the date above and provide additional notice
                where required. Continued use after an update takes effect means
                you accept the revised Terms, to the extent permitted by law.
              </p>
            </div>
            <address>
              <span>
                <strong>Developer</strong>
                Ahmet Hakan Demir (individual developer)
              </span>
              <span>
                <strong>Location</strong>
                Ankara, Türkiye
              </span>
              <span>
                <strong>Support email</strong>
                <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
              </span>
            </address>
          </section>
        </article>
      </div>

      <footer className={styles.footer}>
        <span>© 2026 VitaDraft · Ahmet Hakan Demir</span>
        <span>
          <Link href="/vitadraft/privacy">Privacy</Link>
          {" · "}
          <Link href="/vitadraft/delete-account">Delete account</Link>
        </span>
      </footer>
    </main>
  );
}
