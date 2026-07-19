import type { Metadata } from "next";
import Link from "next/link";
import styles from "../privacy/page.module.css";
import accountStyles from "./page.module.css";

const supportEmail = "a.hakandemir23@gmail.com";
const deletionRequestSubject = "VitaDraft Account Deletion Request";
const deletionRequestBody = [
  "Hello,",
  "",
  "Please permanently delete my VitaDraft account and associated data.",
  "",
  "Account email: [enter the email used for VitaDraft]",
  "Sign-in method: [Apple or Google]",
  "",
  "I understand that account deletion is permanent and does not cancel an App Store or Google Play subscription.",
].join("\n");
const deletionRequestMailto = `mailto:${supportEmail}?subject=${encodeURIComponent(
  deletionRequestSubject,
)}&body=${encodeURIComponent(deletionRequestBody)}`;

const sections = [
  ["request", "Request account deletion"],
  ["deleted-data", "What will be deleted"],
  ["subscriptions", "Store subscriptions"],
  ["other-options", "Other options"],
] as const;

export const metadata: Metadata = {
  title: "Delete Your VitaDraft Account",
  description:
    "Request permanent deletion of your VitaDraft account and associated data.",
  alternates: {
    canonical: "/vitadraft/delete-account",
  },
  openGraph: {
    title: "Delete Your VitaDraft Account",
    description: "Request deletion of a VitaDraft account and associated data.",
    url: "/vitadraft/delete-account",
    type: "website",
  },
};

export default function VitaDraftDeleteAccountPage() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.topbar}>
        <Link
          className={styles.brand}
          href="/"
          aria-label="VitaDraft delete account home"
        >
          <span className={styles.brandMark} aria-hidden="true">
            VD
          </span>
          <span>
            <strong>VitaDraft</strong>
            <small>Account Center</small>
          </span>
        </Link>
        <a className={styles.contactLink} href={`mailto:${supportEmail}`}>
          Contact support
        </a>
      </header>

      <section className={styles.hero} aria-labelledby="delete-account-title">
        <div className={styles.eyebrow}>Account · Privacy</div>
        <h1 id="delete-account-title">Delete Account</h1>
        <p className={styles.heroText}>
          Request permanent deletion of your VitaDraft account and associated data.
        </p>
      </section>

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Account deletion contents">
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
              You can permanently delete your VitaDraft account in the app from
              <strong> Profile → Delete account permanently</strong>. If you cannot
              access the app, send us an account deletion request by email below.
            </p>
            <p>
              Send the request from the email address associated with your
              VitaDraft account. We will reply to that address to confirm the
              request before deletion. Confirmed requests are processed within
              seven days.
            </p>
          </div>

          <section id="request">
            <h2>Request account deletion</h2>
            <p>
              Use the button below to open a pre-filled email. Complete the account
              email and sign-in method, then send it from the email address you use
              for VitaDraft. If you signed in with Apple Hide My Email, include your
              Apple private relay address if you know it.
            </p>
            <div className={accountStyles.requestActions}>
              <a className={accountStyles.requestButton} href={deletionRequestMailto}>
                Email account deletion request
              </a>
              <span>
                Or email <a href={`mailto:${supportEmail}`}>{supportEmail}</a> with
                the subject &quot;{deletionRequestSubject}.&quot;
              </span>
            </div>
            <ol className={accountStyles.requestSteps}>
              <li>Send the request from the email linked to your VitaDraft account.</li>
              <li>Do not send your password, resume, identity document, or payment information.</li>
              <li>Reply to our confirmation email to confirm permanent deletion.</li>
              <li>We will complete the confirmed request within seven days.</li>
            </ol>
          </section>

          <section id="deleted-data">
            <h2>What will be deleted</h2>
            <p>Permanent account deletion removes VitaDraft data associated with your account, including:</p>
            <ul>
              <li>your VitaDraft authentication account and account identifiers;</li>
              <li>uploaded or parsed resume information stored by VitaDraft;</li>
              <li>generated resumes, cover letters, reports, and generation history;</li>
              <li>credit balances, usage records, and rewarded-ad history; and</li>
              <li>VitaDraft billing-customer metadata and digital access records.</li>
            </ul>
            <p>
              The deletion cannot be undone. Limited records may be retained only
              where required by law, necessary to resolve disputes, or needed to
              prevent fraud and abuse. Data held independently by Apple, Google, or
              another service provider is governed by that provider&apos;s policies.
            </p>
          </section>

          <section id="subscriptions">
            <h2>Store subscriptions are separate</h2>
            <p>
              Deleting your VitaDraft account or uninstalling the app does
              <strong> not</strong> cancel an active App Store or Google Play
              subscription. Cancel it separately through the store where you made
              the purchase:
            </p>
            <ul>
              <li>
                <a
                  href="https://apps.apple.com/account/subscriptions"
                  target="_blank"
                  rel="noreferrer"
                >
                  Manage Apple subscriptions
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/account/subscriptions"
                  target="_blank"
                  rel="noreferrer"
                >
                  Manage Google Play subscriptions
                </a>
              </li>
            </ul>
          </section>

          <section id="other-options" className={styles.contactCard}>
            <div>
              <p className={styles.sectionLabel}>Need another option?</p>
              <h2>Other options</h2>
              <p>
                If you only want to remove resume and generation content while
                keeping your account, use <strong>Profile → Clear app content</strong>
                in VitaDraft. For privacy questions, contact us directly.
              </p>
            </div>
            <address>
              <span>
                <strong>Developer</strong>
                Ahmet Hakan Demir
              </span>
              <span>
                <strong>Privacy email</strong>
                <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
              </span>
              <span>
                <strong>Privacy information</strong>
                <Link href="/vitadraft/privacy">Read the Privacy Policy</Link>
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
          <Link href="/vitadraft/terms">Terms</Link>
        </span>
      </footer>
    </main>
  );
}
