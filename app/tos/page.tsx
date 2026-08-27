import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LegalPage } from "@/components/legal/legal-page"
import { getCurrentUser } from "@/lib/auth"
import { getWidget } from "@/lib/discord"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "شروط الاستخدام — Nyova",
  description: "شروط الاستخدام الخاصة بموقع وتطبيق Nyova.",
}

// ---------------------------------------------------------------------------
// نفس فكرة صفحة الخصوصية بالظبط: كل بند هنا عبارة عن عنصر في مصفوفة
// sections بـ id + title + body. عدّل النص جوه، أو ضيف/احذف عنصر كامل من
// المصفوفة، والصفحة هتتحدث تلقائيًا (بما فيها الفهرس اللي فوق).
// ---------------------------------------------------------------------------
const LAST_UPDATED = "28 أغسطس 2026"
const SUPPORT_EMAIL = "support@nyova.xyz"

const sections = [
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
        <p>
          بنحتفظ بحق حذف أي فيدباك مخالف، وإيقاف أو حظر أي حساب يسيء استخدام الخدمة، من غير إشعار مسبق.
        </p>
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
      <LegalPage
        title="شروط الاستخدام"
        lastUpdated={LAST_UPDATED}
        intro="من فضلك اقرأ الشروط دي كويس قبل ما تستخدم موقع أو تطبيق Nyova."
        sections={sections}
      />
      <SiteFooter inviteUrl={widget?.instantInvite ?? null} />
    </div>
  )
}
