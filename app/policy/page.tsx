import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BilingualLegalPage } from "@/components/legal/bilingual-legal-page"
import { getCurrentUser } from "@/lib/auth"
import { getWidget } from "@/lib/discord"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Privacy Policy — Nyova",
  description: "The Privacy Policy for the Nyova website and app.",
}

// ---------------------------------------------------------------------------
// Want to edit or add a clause? There are two arrays below: `sectionsEn` and
// `sectionsAr`. Each item is an id + title + body — edit the text inside
// like normal HTML/JSX. Keep both arrays in the same order with matching
// ids so the language toggle switches cleanly between them. If you only
// care about one language, you can leave the other array's text as-is (or
// duplicate the English text into it) — it just won't be perfectly
// translated.
// ---------------------------------------------------------------------------
const LAST_UPDATED = "August 28, 2026"
const SUPPORT_EMAIL = "support@nyova.xyz"

const sectionsEn = [
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
          The Site uses essential cookies to keep your login session working. It also uses{" "}
          <strong>Google AdSense</strong> to display ads, and asks for your consent before any
          advertising cookie is set — you'll see a banner the first time you visit where you can accept
          or decline. Google may use these cookies or similar identifiers to show you ads relevant to
          your visits to this Site and other sites, once you've agreed.
        </p>
        <ul>
          <li>You can change your choice at any time by clearing the banner's cookie in your browser.</li>
          <li>
            You can also manage Google's personalized ad settings directly at{" "}
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
        <li>Serving ads through Google AdSense, once you've consented to advertising cookies.</li>
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
            <strong>Google AdSense:</strong> to serve ads, subject to Google's own policies and your
            cookie consent choice.
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

const sectionsAr = [
  {
    id: "intro",
    title: "مقدمة",
    body: (
      <p>
        توضح سياسة الخصوصية هذه إزاي موقع وتطبيق <strong>Nyova</strong> ("نحن"، "الموقع") بيتعامل مع بياناتك
        لما تستخدم <strong>nyova.xyz</strong> أو أي خدمة مرتبطة بيه، زي تسجيل الدخول بحساب Discord، إرسال
        فيدباك، أو تحميل التطبيق. باستخدامك للموقع، يبقى موافق على الطريقة الموضحة هنا.
      </p>
    ),
  },
  {
    id: "data-we-collect",
    title: "البيانات اللي بنجمعها",
    body: (
      <>
        <p>احنا بنجمع أقل قدر ممكن من البيانات، وبس اللي محتاجينه عشان الموقع يشتغل صح:</p>
        <ul>
          <li>
            <strong>بيانات تسجيل الدخول بـ Discord:</strong> لو سجّلت دخول، بناخد الآيدي، اسم المستخدم،
            الاسم المعروض، وصورة البروفايل من حسابك على Discord (عن طريق OAuth الرسمي بتاع Discord). احنا
            مش بناخد باسورد حسابك ولا أي صلاحية زيادة عن كده.
          </li>
          <li>
            <strong>جلسة الدخول (Session):</strong> بنخزّن بياناتك دي جوه كوكي واحدة موقّعة (signed cookie) على
            جهازك عشان نعرف إنك مسجل دخول، من غير ما نحتفظ بحساب ليك في قاعدة بيانات منفصلة.
          </li>
          <li>
            <strong>الفيدباك:</strong> أي تقييم أو تعليق بتكتبه في صفحة الفيدباك بينشر في سيرفر الـ Discord
            بتاعنا وبيظهر بشكل عام على الموقع (مع اسمك وصورتك اللي جايين من Discord).
          </li>
          <li>
            <strong>عداد التحميلات:</strong> كل مرة تضغط زرار التحميل، بنسجّل حدث بسيط (النوع/المنصة، وقت
            الضغط، وآيدي حسابك لو كنت مسجل دخول) عشان نعرض عدد التحميلات الإجمالي. الزوار الغير مسجلين
            برضه يقدروا يحمّلوا عادي من غير ما نربط التحميل بأي حساب.
          </li>
          <li>
            <strong>عدد الزوار المتصلين حاليًا:</strong> بنسجّل مؤشر مؤقت (visitor id عشوائي) عشان نعرض عدد
            الناس المتصلين بالموقع دلوقتي، وده بيتمسح تلقائيًا بعد فترة قصيرة من عدم النشاط.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies-ads",
    title: "الكوكيز والإعلانات",
    body: (
      <>
        <p>
          الموقع بيستخدم كوكيز أساسية عشان جلسة الدخول تشتغل. وبيستخدم كمان <strong>Google AdSense</strong>{" "}
          لعرض الإعلانات، وبيطلب موافقتك الأول قبل ما يفعّل أي كوكي إعلاني — هتشوف بانر أول ما تزور
          الموقع تقدر توافق أو ترفض منه. لو وافقت، جوجل ممكن تستخدم الكوكيز دي عشان تعرض إعلانات مناسبة
          ليك بناءً على زياراتك لهذا الموقع ومواقع تانية.
        </p>
        <ul>
          <li>تقدر تغيّر اختيارك في أي وقت بمسح كوكي البانر من المتصفح بتاعك.</li>
          <li>
            تقدر كمان تتحكم في إعلانات جوجل الشخصية من خلال{" "}
            <a href="https://myadcenter.google.com" target="_blank" rel="noopener noreferrer">
              إعدادات إعلانات جوجل
            </a>
            .
          </li>
          <li>
            لمزيد من التفاصيل عن إزاي جوجل بتستخدم البيانات، شوف{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              صفحة جوجل الخاصة بالشركاء
            </a>
            .
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "إزاي بنستخدم بياناتك",
    body: (
      <ul>
        <li>تسجيل دخولك وعرض اسمك وصورتك في الموقع.</li>
        <li>نشر وعرض الفيدباك بتاعك في سيرفر الـ Discord وعلى الموقع.</li>
        <li>حساب عدد التحميلات وعدد المتصلين حاليًا لعرضهم بشكل عام على الصفحة الرئيسية.</li>
        <li>عرض إعلانات عن طريق Google AdSense، بعد ما توافق على كوكيز الإعلانات.</li>
        <li>الحفاظ على أمان الموقع ومنع إساءة الاستخدام.</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "مشاركة البيانات مع أطراف تانية",
    body: (
      <>
        <p>احنا مش بنبيع بياناتك لأي حد. البيانات ممكن تتشارك بس في الحالات دي:</p>
        <ul>
          <li>
            <strong>Discord:</strong> عشان تسجيل الدخول يشتغل، ونشر الفيدباك في السيرفر.
          </li>
          <li>
            <strong>Google AdSense:</strong> عشان عرض الإعلانات، حسب سياسة جوجل الخاصة بيهم واختيارك
            بخصوص الكوكيز.
          </li>
          <li>
            <strong>مزوّد الاستضافة/قاعدة البيانات:</strong> (زي Vercel وقاعدة بيانات الموقع) لتشغيل الموقع
            نفسه وتخزين عداد التحميلات والزوار المتصلين.
          </li>
          <li>لو طُلب منّا قانونيًا الإفصاح عن بيانات معينة من جهة رسمية مختصة.</li>
        </ul>
      </>
    ),
  },
  {
    id: "retention",
    title: "مدة الاحتفاظ بالبيانات",
    body: (
      <p>
        جلسة الدخول بتفضل موجودة لحد ما تعمل تسجيل خروج أو تنتهي صلاحيتها. الفيدباك بيفضل ظاهر على الموقع
        وفي سيرفر Discord لحد ما يتمسح يدويًا. سجلات التحميلات وبيانات الزوار المتصلين بتتخزّن بشكل مبسّط
        (بدون تفاصيل حساسة) لغرض العدّادات فقط.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "حقوقك",
    body: (
      <ul>
        <li>تقدر تسجّل خروج في أي وقت من الموقع عشان تمسح جلستك.</li>
        <li>تقدر تطلب حذف الفيدباك بتاعك بالتواصل معانا.</li>
        <li>تقدر تراجع أو تلغي صلاحيات تطبيق Nyova من إعدادات حسابك على Discord مباشرة.</li>
        <li>
          لأي طلب يخص بياناتك، تواصل معانا على{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </li>
      </ul>
    ),
  },
  {
    id: "children",
    title: "الأطفال",
    body: (
      <p>
        الموقع مش موجّه للأطفال أقل من 13 سنة، ومش بنجمع بيانات بشكل متعمد من فئة عمرية أقل من كده. لو
        عندك اعتقاد إن طفل قدّم بياناته من غير موافقة ولي الأمر، تواصل معانا عشان نتصرف فورًا.
      </p>
    ),
  },
  {
    id: "changes",
    title: "التعديلات على السياسة",
    body: (
      <p>
        ممكن نحدّث سياسة الخصوصية دي بين فترة وأخرى. أي تعديل هيتم نشره في نفس الصفحة مع تحديث تاريخ
        "آخر تحديث" في الأعلى. استمرارك في استخدام الموقع بعد التعديل معناه إنك موافق على النسخة الجديدة.
      </p>
    ),
  },
  {
    id: "contact",
    title: "التواصل معانا",
    body: (
      <p>
        لأي استفسار عن سياسة الخصوصية دي، ابعتلنا على{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> أو من خلال سيرفر Discord بتاعنا.
      </p>
    ),
  },
]

export default async function PrivacyPolicyPage() {
  const [user, widget] = await Promise.all([getCurrentUser(), getWidget()])

  return (
    <div className="min-h-screen">
      <SiteHeader user={user} />
      <BilingualLegalPage
        titleEn="Privacy Policy"
        titleAr="سياسة الخصوصية"
        introEn="Your privacy matters to us. This page explains, in plain terms, what data we collect and how we use it."
        introAr="خصوصيتك مهمة بالنسبالنا. الصفحة دي بتشرح ببساطة إيه البيانات اللي بنجمعها وإزاي بنستخدمها."
        lastUpdated={LAST_UPDATED}
        sectionsEn={sectionsEn}
        sectionsAr={sectionsAr}
      />
      <SiteFooter inviteUrl={widget?.instantInvite ?? null} />
    </div>
  )
}
