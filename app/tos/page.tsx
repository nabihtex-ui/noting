import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LegalPage } from "@/components/legal/legal-page"
import { getCurrentUser } from "@/lib/auth"
import { getWidget } from "@/lib/discord"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Terms of Service — Nyova",
  description: "The Terms of Service for the Nyova website and app.",
}

// ---------------------------------------------------------------------------
// Same idea as the privacy page: every clause below is an item in the
// `sections` array with an id + title + body. Edit the text inside, or
// add/remove a whole item from the array, and the page updates automatically
// (including the jump-links nav at the top).
// ---------------------------------------------------------------------------
const LAST_UPDATED = "August 28, 2026"
const SUPPORT_EMAIL = "support@nyova.xyz"

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    body: (
      <p>
        By using the <strong>nyova.xyz</strong> website or downloading and using the{" "}
        <strong>Nyova</strong> app, you agree to be bound by these Terms in full. If you don't agree to
        any part of them, you must stop using the Site and the app immediately.
      </p>
    ),
  },
  {
    id: "the-service",
    title: "Description of the Service",
    body: (
      <p>
        Nyova is a website that provides the app for download, a feedback page where signed-in Discord
        users can post a review that's published to our Discord server, and a link to the Nyova
        community on Discord. The Service is provided "as is" and may change or evolve over time
        without prior notice.
      </p>
    ),
  },
  {
    id: "account-login",
    title: "Signing In With Discord",
    body: (
      <ul>
        <li>Login happens through Discord's official OAuth flow — we never receive your password.</li>
        <li>
          You're responsible for keeping your Discord account secure, and any activity through your
          account is treated as coming from you.
        </li>
        <li>You can revoke Nyova's access to your account at any time from your Discord settings.</li>
      </ul>
    ),
  },
  {
    id: "feedback-conduct",
    title: "Feedback & Conduct",
    body: (
      <>
        <p>
          When you submit feedback through the Site, you agree that it will be published publicly on
          the Site and on our Discord server, together with your name and account avatar. By submitting
          any content, you agree not to post:
        </p>
        <ul>
          <li>Abusive, hateful, or harassing content directed at any person or entity.</li>
          <li>Spam, advertising, or malicious links.</li>
          <li>False or misleading information intended to harm the Service.</li>
          <li>Any content that violates the law or Discord's own Terms of Service.</li>
        </ul>
        <p>
          We reserve the right to remove any content that violates these rules, and to suspend or ban
          any account that misuses the Service, without prior notice.
        </p>
      </>
    ),
  },
  {
    id: "downloads-license",
    title: "Downloads & License",
    body: (
      <p>
        The app available for download from the Site is provided for personal use. You may not
        redistribute, resell, or reverse engineer it without our written permission. We are not
        responsible for any harm resulting from misuse of the app or from downloading it from sources
        other than the official nyova.xyz website.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    body: (
      <p>
        The Site relies on third-party services such as Discord, Google AdSense, and our hosting
        provider. We are not responsible for the content, policies, or availability of these
        third-party services, and you remain subject to their own terms as well (for example,
        Discord's Terms of Service).
      </p>
    ),
  },
  {
    id: "availability",
    title: "Service Availability",
    body: (
      <p>
        We try to keep the Site and app available at all times, but we don't guarantee the Service will
        be uninterrupted or error-free. We may suspend or change any part of the Service at any time.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    body: (
      <p>
        The Service is provided "as is" without warranties of any kind, express or implied. To the
        fullest extent permitted by law, Nyova is not liable for any direct or indirect damages arising
        from your use of, or inability to use, the Site or the app.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    body: (
      <p>
        We may update these Terms of Service at any time. Any change will be posted on this same page
        along with an updated "Last updated" date. Continuing to use the Site after a change means you
        accept the new version.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    body: (
      <p>
        For any question about these Terms of Service, reach out at{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or through our Discord server.
      </p>
    ),
  },
]

export default async function TermsOfServicePage() {
  const [user, widget] = await Promise.all([getCurrentUser(), getWidget()])

  return (
    <div className="min-h-screen">
      <SiteHeader user={user} />
      <LegalPage
        title="Terms of Service"
        lastUpdated={LAST_UPDATED}
        intro="Please read these Terms carefully before using the Nyova website or app."
        sections={sections}
      />
      <SiteFooter inviteUrl={widget?.instantInvite ?? null} />
    </div>
  )
}
