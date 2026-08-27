import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LegalPage } from "@/components/legal/legal-page"
import { getCurrentUser } from "@/lib/auth"
import { getWidget } from "@/lib/discord"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Privacy Policy — Nyova",
  description: "The Privacy Policy for the Nyova website and app.",
}

// ---------------------------------------------------------------------------
// Want to edit or add a clause? Everything you need is in the `sections`
// array below. Each item is just an id + title + body. Edit the text inside
// <p> or <ul>/<li> like any normal HTML/JSX, and the page (including the
// jump-links nav at the top) updates automatically.
// ---------------------------------------------------------------------------
const LAST_UPDATED = "August 28, 2026"
const SUPPORT_EMAIL = "support@nyova.xyz"

const sections = [
  {
    id: "intro",
    title: "Introduction",
    body: (
      <p>
        This Privacy Policy explains how <strong>Nyova</strong> ("we", "us", "the Site") handles your
        data when you use <strong>nyova.xyz</strong> or any related service, such as signing in with
        Discord, submitting feedback, or downloading the app. By using the Site, you agree to the
        practices described here.
      </p>
    ),
  },
  {
    id: "data-we-collect",
    title: "Information We Collect",
    body: (
      <>
        <p>We keep data collection to the minimum needed to make the Site work:</p>
        <ul>
          <li>
            <strong>Discord login data:</strong> If you sign in, we receive your Discord ID, username,
            display name, and avatar from your Discord account through Discord's official OAuth flow.
            We never receive your password or any extra permissions beyond that.
          </li>
          <li>
            <strong>Session cookie:</strong> This information is stored in a single signed cookie on
            your device so we know you're logged in, without keeping a separate account record in a
            database.
          </li>
          <li>
            <strong>Feedback:</strong> Any review or comment you submit on the feedback page is posted
            to our Discord server and displayed publicly on the Site, along with your name and avatar
            from Discord.
          </li>
          <li>
            <strong>Download counter:</strong> Each time you click the download button, we log a simple
            event (platform, timestamp, and your account ID if you're logged in) so we can display a
            total download count. Visitors who aren't logged in can still download without the event
            being tied to any account.
          </li>
          <li>
            <strong>Live visitor count:</strong> We record a temporary, randomly generated visitor ID to
            show how many people are currently on the Site. It's automatically cleared shortly after you
            stop being active.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies-ads",
    title: "Cookies & Advertising",
    body: (
      <>
        <p>
          The Site uses essential cookies to keep your login session working, and it also uses{" "}
          <strong>Google AdSense</strong> to display ads. Google may use cookies or similar identifiers
          to show you ads relevant to your visits to this Site and other sites.
        </p>
        <ul>
          <li>
            You can manage Google's personalized ad settings at{" "}
            <a href="https://myadcenter.google.com" target="_blank" rel="noopener noreferrer">
              Google Ad Center
            </a>
            .
          </li>
          <li>
            For more on how Google uses data from partner sites, see Google's{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              partner sites policy
            </a>
            .
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Your Data",
    body: (
      <ul>
        <li>Signing you in and displaying your name and avatar on the Site.</li>
        <li>Publishing and displaying your feedback on our Discord server and the Site.</li>
        <li>Counting downloads and live visitors to display public totals on the homepage.</li>
        <li>Serving ads through Google AdSense.</li>
        <li>Keeping the Site secure and preventing abuse.</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "Sharing Your Data",
    body: (
      <>
        <p>We never sell your data. It's only shared in the following cases:</p>
        <ul>
          <li>
            <strong>Discord:</strong> to power login and to post your feedback to our server.
          </li>
          <li>
            <strong>Google AdSense:</strong> to serve ads, subject to Google's own policies.
          </li>
          <li>
            <strong>Our hosting/database provider</strong> (e.g. Vercel and the Site's database) to run
            the Site itself and store the download and live-visitor counters.
          </li>
          <li>If required to disclose specific data by a competent legal authority.</li>
        </ul>
      </>
    ),
  },
  {
    id: "retention",
    title: "Data Retention",
    body: (
      <p>
        Your login session stays active until you log out or it expires. Feedback remains visible on
        the Site and on our Discord server until it's manually removed. Download logs and live-visitor
        data are stored in a minimal form (no sensitive details) purely to power the counters.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    body: (
      <ul>
        <li>You can log out at any time to clear your session.</li>
        <li>You can request removal of your feedback by contacting us.</li>
        <li>You can review or revoke Nyova's access directly from your Discord account settings.</li>
        <li>
          For any request about your data, reach out at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </li>
      </ul>
    ),
  },
  {
    id: "children",
    title: "Children's Privacy",
    body: (
      <p>
        The Site is not directed at children under 13, and we do not knowingly collect data from users
        in that age group. If you believe a child has submitted data without parental consent, contact
        us so we can act on it right away.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. Any change will be posted on this same
        page along with an updated "Last updated" date above. Continuing to use the Site after a change
        means you accept the new version.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    body: (
      <p>
        For any question about this Privacy Policy, reach out at{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or through our Discord server.
      </p>
    ),
  },
]

export default async function PrivacyPolicyPage() {
  const [user, widget] = await Promise.all([getCurrentUser(), getWidget()])

  return (
    <div className="min-h-screen">
      <SiteHeader user={user} />
      <LegalPage
        title="Privacy Policy"
        lastUpdated={LAST_UPDATED}
        intro="Your privacy matters to us. This page explains, in plain terms, what data we collect and how we use it."
        sections={sections}
      />
      <SiteFooter inviteUrl={widget?.instantInvite ?? null} />
    </div>
  )
}
