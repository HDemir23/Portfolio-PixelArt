import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

const effectiveDate = "July 13, 2026";
const privacyEmail = "a.hakandemir23@gmail.com";

const sections = [
  ["summary", "1. Summary"],
  ["information-we-collect", "2. Information We Collect"],
  ["how-we-use-information", "3. How We Use Information"],
  ["ai-processing", "4. AI Processing"],
  ["advertising-and-consent", "5. Advertising and Consent"],
  ["legal-bases", "6. Legal Bases for Processing"],
  ["disclosures", "7. How We Disclose Information"],
  ["international-transfers", "8. International Data Transfers"],
  ["data-retention", "9. Data Retention"],
  ["security", "10. Security"],
  ["choices-and-rights", "11. Your Choices and Rights"],
  ["children", "12. Children"],
  ["third-party-services", "13. Third-Party Services and User Sharing"],
  ["changes", "14. Changes to This Policy"],
  ["contact", "15. Contact Us"],
] as const;

export const metadata: Metadata = {
  title: "VitaDraft Privacy Policy",
  description:
    "Learn how VitaDraft collects, uses, stores, and protects information when you use the VitaDraft mobile application.",
  alternates: {
    canonical: "/vitadraft/privacy",
  },
  openGraph: {
    title: "VitaDraft Privacy Policy",
    description:
      "Privacy information for the VitaDraft mobile application and related services.",
    url: "/vitadraft/privacy",
    type: "website",
  },
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export default function VitaDraftPrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.topbar}>
        <Link className={styles.brand} href="/" aria-label="VitaDraft privacy policy home">
          <span className={styles.brandMark} aria-hidden="true">
            VD
          </span>
          <span>
            <strong>VitaDraft</strong>
            <small>Privacy Center</small>
          </span>
        </Link>
        <a className={styles.contactLink} href={`mailto:${privacyEmail}`}>
          Contact privacy
        </a>
      </header>

      <section className={styles.hero} aria-labelledby="privacy-title">
        <div className={styles.eyebrow}>Legal · Privacy</div>
        <h1 id="privacy-title">Privacy Policy</h1>
        <p className={styles.heroText}>
          How VitaDraft handles your resume data, account information, AI requests,
          and advertising choices.
        </p>
        <div className={styles.dateRow}>
          <span>Effective {effectiveDate}</span>
          <span aria-hidden="true">·</span>
          <span>Last updated {effectiveDate}</span>
        </div>
      </section>

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Privacy policy contents">
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
              VitaDraft is operated by <strong>Ahmet Hakan Demir</strong>, an
              individual developer (&quot;VitaDraft,&quot; &quot;we,&quot; &quot;us,&quot;
              or &quot;our&quot;), located in <strong>Ankara, Türkiye</strong>. This
              Privacy Policy explains how we collect, use, disclose, retain, and
              protect personal information when you use the VitaDraft mobile
              application and its related services (collectively, the
              &quot;Service&quot;).
            </p>
            <p>
              For privacy questions or requests, contact us at{" "}
              <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>.
            </p>
          </div>

          <section id="summary">
            <h2>1. Summary</h2>
            <p>
              VitaDraft helps you parse, standardize, tailor, and export resumes
              and cover letters. The Service is designed so that original resume
              files and resume photos remain primarily under your control on your
              device:
            </p>
            <ul>
              <li>
                Original resume files are stored in the VitaDraft app&apos;s private
                storage on your device. When you ask VitaDraft to parse a resume,
                the file is temporarily transmitted to our backend, processed in
                memory, and not intentionally saved to our server database or
                object storage.
              </li>
              <li>
                Resume photos are processed and stored locally on your device and
                are not uploaded to the VitaDraft backend.
              </li>
              <li>
                Resume text, structured resume data, job descriptions, and related
                instructions are transmitted when you request AI-assisted
                generation.
              </li>
              <li>
                Generated resumes, cover letters, and related generation history
                are stored on our servers so you can access and manage your
                results.
              </li>
              <li>
                VitaDraft uses Google AdMob to provide optional rewarded
                advertisements.
              </li>
            </ul>
          </section>

          <section id="information-we-collect">
            <h2>2. Information We Collect</h2>

            <h3>2.1 Account and authentication information</h3>
            <p>When you sign in with Google or Apple, we may receive:</p>
            <ul>
              <li>
                your email address, including an Apple private relay address if
                you choose Hide My Email;
              </li>
              <li>a provider-specific account identifier;</li>
              <li>
                the identity and session tokens needed to authenticate your
                account; and
              </li>
              <li>the identity provider you used to sign in.</li>
            </ul>
            <p>
              Authentication is managed using Supabase. Authentication tokens are
              also stored in secure device storage to keep you signed in.
            </p>

            <h3>2.2 Resume, career, and generation information</h3>
            <p>Depending on what you submit, we process:</p>
            <ul>
              <li>
                original resume files and file metadata, such as file name, type,
                and size;
              </li>
              <li>parsed or structured resume content;</li>
              <li>
                information contained in your resume, which may include your name,
                contact details, location, education, employment history, skills,
                qualifications, links, and any other information you choose to
                include;
              </li>
              <li>
                job descriptions, target roles, employer or company names, and
                tailoring instructions;
              </li>
              <li>
                generated resumes, match information, strengths, gaps, tailoring
                notes, and cover letters; and
              </li>
              <li>template and export selections.</li>
            </ul>
            <p>
              Please do not include sensitive personal information that is not
              necessary for creating your resume. VitaDraft does not require
              government identification numbers, financial account details, health
              information, or similar highly sensitive information.
            </p>

            <h3>2.3 Photos and device files</h3>
            <p>
              If you choose to add a resume photo, VitaDraft may request access to
              your camera or photo library. Selected photos are resized and stored
              locally in the app&apos;s private device storage. Photos are used only
              to create previews and exports on your device and are not uploaded to
              the VitaDraft backend.
            </p>
            <p>
              VitaDraft does not request access to your contacts, microphone, or
              precise GPS location.
            </p>

            <h3>2.4 Usage, entitlement, and rewarded-ad information</h3>
            <p>
              We process information needed to operate free credits, limits,
              premium-template credits, and rewarded ads, including:
            </p>
            <ul>
              <li>
                internal user, generation-job, and reward-challenge identifiers;
              </li>
              <li>plan and credit balances, usage counts, and timestamps;</li>
              <li>generation and export status;</li>
              <li>
                ad unit, reward type and amount, transaction identifier,
                verification timestamps, and signed server-side verification data;
                and
              </li>
              <li>
                an account identifier and an opaque challenge value sent to Google
                AdMob for reward verification.
              </li>
            </ul>

            <h3>2.5 Device, network, consent, and technical information</h3>
            <p>
              When you use the Service, we and our service providers may process:
            </p>
            <ul>
              <li>IP address and basic request information;</li>
              <li>
                device, operating system, app version, and language information;
              </li>
              <li>
                advertising identifiers or similar device identifiers where
                available and permitted;
              </li>
              <li>advertising consent and privacy-choice signals; and</li>
              <li>
                limited operational logs and AI usage metadata, such as request
                identifiers, model/provider information, token counts, latency, and
                cost.
              </li>
            </ul>
            <p>
              We do not intentionally include resume text, job descriptions,
              generated content, authentication tokens, or API keys in our
              application logs.
            </p>
          </section>

          <section id="how-we-use-information">
            <h2>3. How We Use Information</h2>
            <p>We use personal information to:</p>
            <ul>
              <li>authenticate users and maintain accounts;</li>
              <li>parse resumes and return structured resume information;</li>
              <li>
                generate, tailor, store, retrieve, and export resumes and cover
                letters;
              </li>
              <li>
                maintain generation history and restore active generation jobs;
              </li>
              <li>
                manage usage limits, credits, entitlements, and optional rewarded
                ads;
              </li>
              <li>
                verify rewarded-ad transactions and prevent duplicate or
                fraudulent rewards;
              </li>
              <li>
                secure, operate, troubleshoot, and improve the reliability of the
                Service;
              </li>
              <li>
                respond to support, privacy, and account-deletion requests;
              </li>
              <li>
                enforce our terms and protect the rights, safety, and integrity of
                users and the Service; and
              </li>
              <li>comply with applicable law and lawful requests.</li>
            </ul>
            <p>
              We do not use resume content to make employment, credit, insurance,
              legal, or similarly significant decisions about you. VitaDraft
              generates documents at your request, and you decide whether and how
              to use the output.
            </p>
          </section>

          <section id="ai-processing">
            <h2>4. AI Processing</h2>
            <p>
              When you request AI-assisted generation, VitaDraft sends the resume
              text or structured resume data, the job description and instructions
              you provide, and a response schema to OpenRouter. OpenRouter may route
              the request to a selected downstream AI model provider.
            </p>
            <p>
              AI providers process this information to return the generated result.
              Their handling, location, and retention of data may depend on the
              selected model, provider, and provider configuration. You can review
              OpenRouter&apos;s information at:
            </p>
            <ul>
              <li>
                <ExternalLink href="https://openrouter.ai/privacy">
                  OpenRouter Privacy Policy
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href="https://openrouter.ai/docs/guides/privacy/data-collection">
                  OpenRouter Data Collection documentation
                </ExternalLink>
              </li>
            </ul>
            <p>
              VitaDraft stores active generation input in its job system only while
              the generation is queued or processing. After a job completes or
              fails, the stored generation input is removed from the job record. A
              one-way request hash and non-content operational metadata may remain
              to prevent duplicate charging and safely handle retries. Generated
              resumes, cover letters, and generation history are retained as
              described in Section 9.
            </p>
            <p>
              AI output can be inaccurate or incomplete. Review every generated
              document before using or sharing it.
            </p>
          </section>

          <section id="advertising-and-consent">
            <h2>5. Advertising and Consent</h2>
            <p>
              VitaDraft uses Google AdMob to offer optional rewarded
              advertisements. Watching a rewarded ad may provide a generation,
              cover-letter, or premium-template benefit. AdMob and its advertising
              partners may process device information, IP address, advertising
              identifiers, consent signals, ad interactions, and fraud-prevention
              information.
            </p>
            <p>
              VitaDraft currently requests non-personalized ads. Non-personalized
              and limited ads may still use device storage or identifiers for
              purposes such as frequency capping, aggregated reporting, security,
              and fraud prevention.
            </p>
            <p>
              Where required, VitaDraft uses Google&apos;s User Messaging Platform
              to request advertising consent or provide opt-out choices. Depending
              on your region and app version, you may be able to reopen those
              choices through a <strong>Privacy Choices</strong> control in the
              VitaDraft Profile screen. You can also control certain advertising
              identifiers and tracking permissions through your device settings, or
              contact us to withdraw consent or request help with an advertising
              choice.
            </p>
            <p>For more information about Google&apos;s data practices, see:</p>
            <ul>
              <li>
                <ExternalLink href="https://policies.google.com/technologies/partner-sites">
                  How Google uses information from sites or apps that use its
                  services
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href="https://policies.google.com/privacy">
                  Google Privacy Policy
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href="https://policies.google.com/technologies/ads">
                  Google advertising technologies
                </ExternalLink>
              </li>
            </ul>
          </section>

          <section id="legal-bases">
            <h2>6. Legal Bases for Processing</h2>
            <p>
              Where the law requires us to identify a legal basis, we rely on one
              or more of the following:
            </p>
            <ul>
              <li>
                <strong>Performance of a contract:</strong> to create and operate
                your account and provide the resume, generation, history, export,
                and reward features you request.
              </li>
              <li>
                <strong>Consent:</strong> for advertising personalization, device
                storage, or other processing where consent is legally required. You
                may withdraw consent at any time, without affecting processing that
                occurred before withdrawal.
              </li>
              <li>
                <strong>Legitimate interests:</strong> to secure the Service,
                prevent abuse and reward fraud, enforce usage limits, troubleshoot
                failures, maintain service reliability, and protect our legal
                rights, where those interests are not overridden by your rights.
              </li>
              <li>
                <strong>Legal obligations:</strong> to comply with applicable law,
                valid legal process, and regulatory requirements.
              </li>
            </ul>
          </section>

          <section id="disclosures">
            <h2>7. How We Disclose Information</h2>
            <p>
              We disclose information only as reasonably necessary for the purposes
              described in this Policy:
            </p>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Recipient or category</th>
                    <th scope="col">Purpose and information involved</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Supabase</th>
                    <td>
                      Authentication, account identity, email address, provider
                      identifiers, and session management. See the{" "}
                      <ExternalLink href="https://supabase.com/privacy">
                        Supabase Privacy Policy
                      </ExternalLink>
                      .
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google and Apple</th>
                    <td>
                      Identity-provider processing when you choose Google Sign-In
                      or Sign in with Apple. See the{" "}
                      <ExternalLink href="https://policies.google.com/privacy">
                        Google Privacy Policy
                      </ExternalLink>{" "}
                      and{" "}
                      <ExternalLink href="https://www.apple.com/legal/privacy/data/en/sign-in-with-apple/">
                        Sign in with Apple &amp; Privacy
                      </ExternalLink>
                      .
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">OpenRouter and selected AI model providers</th>
                    <td>
                      Resume content, job information, instructions, and generated
                      responses needed to perform AI-assisted generation.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Google AdMob and advertising partners disclosed in the consent
                      form
                    </th>
                    <td>
                      Rewarded-ad delivery, measurement, consent management,
                      frequency capping, security, fraud prevention, and server-side
                      reward verification.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Cloud hosting, database, and infrastructure providers
                    </th>
                    <td>
                      Hosting the API and database, transmitting requests,
                      maintaining availability, backups, security, and operational
                      logs.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Professional advisers and authorities</th>
                    <td>
                      Compliance, legal claims, audits, safety, fraud prevention, or
                      a valid legal requirement.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">A successor in a business transaction</th>
                    <td>
                      A merger, financing, acquisition, reorganization, or sale of
                      assets, subject to appropriate confidentiality and legal
                      protections.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              We do not sell personal information for money. Depending on the law
              that applies to you, disclosures for targeted advertising may be
              considered a &quot;sale,&quot; &quot;sharing,&quot; or targeted
              advertising even when no money is exchanged. Where applicable, you
              can opt out using VitaDraft&apos;s consent or Privacy Choices controls
              when available, through supported device settings, or by contacting
              us.
            </p>
          </section>

          <section id="international-transfers">
            <h2>8. International Data Transfers</h2>
            <p>
              VitaDraft and its service providers may process information in
              countries other than the country where you live. These countries may
              have different data-protection laws. Where required, we use or rely on
              appropriate contractual, organizational, or legal safeguards for
              international transfers.
            </p>
          </section>

          <section id="data-retention">
            <h2>9. Data Retention</h2>
            <p>
              We retain information only for as long as reasonably necessary for
              the purposes described in this Policy:
            </p>
            <ul>
              <li>
                <strong>
                  Original resume files, parsed text, structured resume data,
                  photos, and the latest generated result stored on your device:
                </strong>{" "}
                retained until you remove the content, clear VitaDraft content,
                delete your account through the app, or uninstall the app, subject
                to your device&apos;s backup and operating-system behavior.
              </li>
              <li>
                <strong>Resume parsing uploads:</strong> processed transiently for
                the request and not intentionally saved in the VitaDraft server
                database or object storage.
              </li>
              <li>
                <strong>Active generation input:</strong> retained in the
                generation job only while queued or processing, then removed when
                the job completes or fails.
              </li>
              <li>
                <strong>
                  Generated resumes, cover letters, job information, and generation
                  history:
                </strong>{" "}
                retained until you delete an individual result, clear app content,
                or delete your account.
              </li>
              <li>
                <strong>Account and authentication information:</strong> retained
                while your account remains active and deleted when account deletion
                is completed, subject to limited retention required by law or a
                service provider&apos;s independent obligations.
              </li>
              <li>
                <strong>
                  Entitlement, usage, export, and rewarded-ad records:
                </strong>{" "}
                retained while needed to operate your account, prevent reward
                replay or credit abuse, resolve disputes, and meet legal
                obligations. Clearing app content does not delete the active
                account&apos;s entitlement counters or signed reward ledger.
                Permanently deleting the account deletes the VitaDraft account
                records associated with that account.
              </li>
              <li>
                <strong>Security and operational logs:</strong> retained only for a
                limited period based on security, troubleshooting, fraud-prevention,
                and legal needs.
              </li>
            </ul>
            <p>
              Our service providers may retain information under their own policies
              and legal obligations.
            </p>
          </section>

          <section id="security">
            <h2>10. Security</h2>
            <p>
              We use reasonable technical and organizational safeguards designed to
              protect personal information. These include authenticated and
              owner-scoped API access, secure device storage for session tokens,
              redaction of authentication headers from logs, server-side reward
              verification, and deletion controls.
            </p>
            <p>
              No transmission or storage system is completely secure. You are
              responsible for protecting access to your device, identity-provider
              account, exported documents, and any documents you share with other
              services.
            </p>
          </section>

          <section id="choices-and-rights">
            <h2>11. Your Choices and Rights</h2>

            <h3>11.1 In-app controls</h3>
            <p>The VitaDraft Profile screen provides the following controls:</p>
            <ul>
              <li>
                <strong>Clear app content:</strong> removes local resumes, photos,
                and generated documents and deletes resume/generated content stored
                by VitaDraft. It keeps your account, entitlement counters, and
                signed reward ledger active.
              </li>
              <li>
                <strong>Delete account permanently:</strong> deletes VitaDraft
                content, credits, reward history, and the authentication account,
                and clears VitaDraft&apos;s local app content.
              </li>
              <li>
                <strong>Sign out:</strong> removes the locally stored session but
                does not delete your account or server data.
              </li>
              <li>
                <strong>Advertising choices:</strong> depending on your region and
                app version, an in-app Privacy Choices control may be available. You
                may also use supported device settings or contact us.
              </li>
            </ul>

            <h3>11.2 Privacy rights</h3>
            <p>Depending on where you live, you may have the right to:</p>
            <ul>
              <li>request access to or a copy of personal information;</li>
              <li>request correction or deletion;</li>
              <li>request restriction of processing;</li>
              <li>
                object to certain processing, including targeted advertising;
              </li>
              <li>withdraw consent;</li>
              <li>request data portability;</li>
              <li>
                opt out of the sale or sharing of personal information or targeted
                advertising;
              </li>
              <li>appeal a denied privacy request, where applicable;</li>
              <li>
                receive equal service and not be discriminated against for
                exercising privacy rights; and
              </li>
              <li>complain to your local data-protection authority.</li>
            </ul>
            <p>
              To exercise a right, use the in-app controls or contact{" "}
              <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>. We may need to
              verify your identity before completing a request. Authorized agents
              may submit requests where permitted by law, subject to verification
              of their authority.
            </p>
          </section>

          <section id="children">
            <h2>12. Children</h2>
            <p>
              VitaDraft is intended for people preparing professional resumes and
              is not directed to children under 16. We do not knowingly collect
              personal information from children under 16. If you believe a child
              has provided personal information, contact us so we can investigate
              and take appropriate action.
            </p>
          </section>

          <section id="third-party-services">
            <h2>13. Third-Party Services and User Sharing</h2>
            <p>
              The Service may open identity-provider pages, advertising content, or
              operating-system sharing tools. If you export or share a document to
              another app, cloud-storage provider, employer, recruiter, or other
              recipient, that recipient&apos;s privacy practices apply. VitaDraft is
              not responsible for third-party services you choose to use.
            </p>
          </section>

          <section id="changes">
            <h2>14. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy to reflect changes to the Service,
              service providers, legal requirements, or data practices. We will
              update the &quot;Last updated&quot; date and provide additional notice
              where required. If a change materially affects processing based on
              consent, we will request new consent where required.
            </p>
          </section>

          <section id="contact" className={styles.contactCard}>
            <div>
              <p className={styles.sectionLabel}>Privacy contact</p>
              <h2>15. Contact Us</h2>
              <p>
                If applicable, you may also contact or submit a complaint to the
                data-protection authority in the country where you live or work.
              </p>
            </div>
            <address>
              <span>
                <strong>Data controller / developer</strong>
                Ahmet Hakan Demir (individual developer)
              </span>
              <span>
                <strong>Location</strong>
                Ankara, Türkiye
              </span>
              <span>
                <strong>Privacy email</strong>
                <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>
              </span>
            </address>
          </section>
        </article>
      </div>

      <footer className={styles.footer}>
        <span>© 2026 VitaDraft · Ahmet Hakan Demir</span>
        <Link href="/">Developer website</Link>
      </footer>
    </main>
  );
}
