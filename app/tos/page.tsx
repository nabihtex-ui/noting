import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BilingualLegalPage } from "@/components/legal/bilingual-legal-page"
import { getCurrentUser } from "@/lib/auth"
import { getWidget } from "@/lib/discord"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Terms of Service — Nyova",
  description: "The Terms of Service for the Nyova website and app.",
}

// ---------------------------------------------------------------------------
// Same idea as the privacy page: `sectionsEn` and `sectionsAr` below, each
// item an id + title + body. Keep both arrays in the same order with
// matching ids so the language toggle switches cleanly. Add or remove a
// clause by adding/removing an item from both arrays.
// ---------------------------------------------------------------------------
const LAST_UPDATED = "Sep 1, 2026"
const SUPPORT_EMAIL = "support@nyova.xyz"

const sectionsEn = [
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
    id: "termination",
    title: "Suspension & Termination",
    body: (
      <p>
        We may suspend or terminate your access to the Service at any time, with or without notice, if
        we believe you've violated these Terms or misused the Service. You're free to stop using the
        Service at any time — simply stop accessing it and, if you'd like, revoke Nyova's access from
        your Discord account settings.
      </p>
    ),
  },
  {
    id: "copyright-dmca",
    title: "Copyright Complaints",
    body: (
      <>
        <p>
          If you believe content on the Site or within the app infringes your copyright, contact us at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with:
        </p>
        <ul>
          <li>A description of the copyrighted work you believe is being infringed.</li>
          <li>The location of the material you're reporting (a link or clear description).</li>
          <li>Your contact information.</li>
          <li>A statement that you have a good-faith belief the use is unauthorized.</li>
        </ul>
        <p>We'll review the report and remove infringing content where appropriate.</p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    body: (
      <p>
        Nyova is used by people all over the world, so these Terms aren't written around the law of any
        single country. We apply them in good faith regardless of where you're located. If a dispute
        ever comes up, both sides agree to first try to resolve it informally by reaching out to{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Nothing in these Terms takes away any
        consumer-protection rights you're entitled to under the mandatory laws of the country where you
        live.
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

const sectionsAr = [
  {
    id: "acceptance",
    title: "الموافقة على الشروط",
    body: (
      <p>
        باستخدامك لموقع <strong>nyova.xyz</strong> أو تحميل واستخدام تطبيق <strong>Nyova</strong>، يبقى
        معناه إنك موافق على الشروط دي بالكامل. لو مش موافق على أي بند منها، محتاج توقف استخدام الموقع
        والتطبيق فورًا.
      </p>
    ),
  },
  {
    id: "the-service",
    title: "وصف الخدمة",
    body: (
      <p>
        Nyova هو موقع بيوفر تحميل التطبيق، صفحة فيدباك بيقدر فيها المستخدمين تسجيل الدخول بحساب Discord
        وكتابة تقييم بينشر في سيرفر Discord بتاعنا، وربط بمجتمع Nyova على Discord. الخدمة بتتقدّم "كما
        هي" وممكن تتغيّر أو تتطوّر بمرور الوقت من غير إشعار مسبق.
      </p>
    ),
  },
  {
    id: "account-login",
    title: "تسجيل الدخول بحساب Discord",
    body: (
      <ul>
        <li>تسجيل الدخول بيتم عن طريق Discord OAuth الرسمي — احنا مش بناخد الباسورد بتاعك أبدًا.</li>
        <li>
          إنت مسؤول عن الحفاظ على أمان حساب Discord بتاعك، وأي نشاط بيحصل من خلال حسابك بيتم اعتباره
          صادر منك.
        </li>
        <li>تقدر تلغي ربط تطبيق Nyova بحسابك في أي وقت من إعدادات Discord.</li>
      </ul>
    ),
  },
  {
    id: "feedback-conduct",
    title: "الفيدباك وقواعد السلوك",
    body: (
      <>
        <p>
          لما تبعت فيدباك من خلال الموقع، إنت بتوافق إنه هيتنشر بشكل عام على الموقع وفي سيرفر Discord،
          مع اسمك وصورة حسابك. من خلال إرسال أي محتوى، إنت بتلتزم بعدم نشر:
        </p>
        <ul>
          <li>محتوى مسيء، عنصري، أو مضايق لأي شخص أو جهة.</li>
          <li>سبام، إعلانات، أو روابط ضارة.</li>
          <li>معلومات كاذبة أو مضللة بقصد الإساءة للخدمة.</li>
          <li>أي محتوى مخالف للقانون أو لشروط استخدام Discord نفسها.</li>
        </ul>
      </>
    ),
  },
  {
    id: "downloads-license",
    title: "التحميل والترخيص",
    body: (
      <p>
        التطبيق المتاح للتحميل من الموقع مقدّم للاستخدام الشخصي. مش مسموح إعادة توزيعه أو بيعه أو التلاعب
        فيه (reverse engineering) من غير إذن كتابي منّا. احنا مش مسؤولين عن أي ضرر ينتج عن استخدام غير
        صحيح للتطبيق أو تحميله من مصادر غير رسمية غير nyova.xyz.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "خدمات وأطراف خارجية",
    body: (
      <p>
        الموقع بيعتمد على خدمات خارجية زي Discord وGoogle AdSense ومزوّد الاستضافة. احنا مش مسؤولين عن
        محتوى أو سياسات أو توقف أي خدمة خارجية دي، وخضوعك لشروطها الخاصة بيبقى مطلوب برضه (زي شروط
        استخدام Discord).
      </p>
    ),
  },
  {
    id: "availability",
    title: "توفر الخدمة",
    body: (
      <p>
        بنحاول نخلي الموقع والتطبيق متاحين دايمًا، لكن مفيش ضمان إن الخدمة هتفضل شغالة من غير انقطاع أو
        من غير أخطاء. ممكن نوقف أو نعدّل أي جزء من الخدمة في أي وقت.
      </p>
    ),
  },
  {
    id: "termination",
    title: "إيقاف وإلغاء الحساب",
    body: (
      <p>
        احنا نقدر نوقف أو نلغي وصولك للخدمة في أي وقت، بإخطار أو من غيره، لو حسينا إنك خالفت الشروط دي أو
        أسأت استخدام الخدمة. تقدر توقف استخدام الخدمة في أي وقت ببساطة بعدم الدخول عليها، ولو حبيت تلغي
        صلاحية تطبيق Nyova من إعدادات حسابك على Discord.
      </p>
    ),
  },
  {
    id: "copyright-dmca",
    title: "شكاوى الملكية الفكرية",
    body: (
      <>
        <p>
          لو حاسس إن محتوى على الموقع أو جوه التطبيق بينتهك حقوق الملكية الفكرية بتاعتك، تواصل معانا على{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> وابعتلنا:
        </p>
        <ul>
          <li>وصف للعمل اللي حاسس إن حقوقه اتنتهكت.</li>
          <li>مكان المحتوى اللي بتبلّغ عنه (رابط أو وصف واضح).</li>
          <li>بيانات التواصل بتاعتك.</li>
          <li>إفادة إنك معتقد بحسن نية إن الاستخدام غير مصرح بيه.</li>
        </ul>
        <p>هنراجع البلاغ ونشيل المحتوى المخالف لو لزم الأمر.</p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "القانون الحاكم",
    body: (
      <p>
        Nyova بيستخدمه ناس من كل دول العالم، فالشروط دي مش مكتوبة على أساس قانون دولة معينة. احنا
        بنطبّقها بحسن نية بغض النظر عن مكان إقامتك. لو حصل أي خلاف، الطرفين بيتفقوا إنهم يحاولوا يحلّوه
        وديًا الأول بالتواصل على <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. مفيش حاجة في
        الشروط دي بتلغي أي حقوق حماية للمستهلك متاحة ليك بموجب القوانين الإلزامية في بلد إقامتك.
      </p>
    ),
  },
  {
    id: "liability",
    title: "حدود المسؤولية",
    body: (
      <p>
        الخدمة بتتقدّم "كما هي" من غير أي ضمانات صريحة أو ضمنية. لأقصى حد يسمح بيه القانون، Nyova مش
        مسؤولة عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الموقع أو التطبيق أو عدم القدرة على
        استخدامهم.
      </p>
    ),
  },
  {
    id: "changes",
    title: "التعديلات على الشروط",
    body: (
      <p>
        ممكن نعدّل شروط الاستخدام دي في أي وقت. أي تعديل هيتنشر في نفس الصفحة مع تحديث تاريخ "آخر تحديث".
        استمرارك في استخدام الموقع بعد التعديل معناه موافقتك على النسخة الجديدة.
      </p>
    ),
  },
  {
    id: "contact",
    title: "التواصل معانا",
    body: (
      <p>
        لأي سؤال عن شروط الاستخدام دي، تواصل معانا على{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> أو من خلال سيرفر Discord بتاعنا.
      </p>
    ),
  },
]

export default async function TermsOfServicePage() {
  const [user, widget] = await Promise.all([getCurrentUser(), getWidget()])

  return (
    <div className="min-h-screen">
      <SiteHeader user={user} />
      <BilingualLegalPage
        titleEn="Terms of Service"
        titleAr="شروط الاستخدام"
        introEn="Please read these Terms carefully before using the Nyova website or app."
        introAr="من فضلك اقرأ الشروط دي كويس قبل ما تستخدم موقع أو تطبيق Nyova."
        lastUpdated={LAST_UPDATED}
        sectionsEn={sectionsEn}
        sectionsAr={sectionsAr}
      />
      <SiteFooter inviteUrl={widget?.instantInvite ?? null} />
    </div>
  )
}
