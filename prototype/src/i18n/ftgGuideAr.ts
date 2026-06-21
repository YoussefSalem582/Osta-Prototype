export const FTG_GUIDE_AR = {
  'ftg-overview': {
    eyebrow: 'ابدأ هنا',
    title: 'التوجيه وترتيب القراءة',
    items: [
      {
        label: 'مصادر الحقيقة',
        body: 'اعتبر هذه المصادر مرجعية قبل كتابة الكود أو المخطط.',
        subs: [
          '<strong>Osta_PRD_v2.md</strong> — نطاق المنتج والأسطح وMVP مقابل المرحلة 2.',
          '<strong>نموذج HTML هذا</strong> — معرفات الشاشات والمجموعات ونصوص UX للتسليم.',
          '<strong>ADRs في المستودع</strong> — قرارات مقفلة (BaaS، شكل المصادقة، مزود الخريطة).',
        ],
      },
      {
        label: 'الأسطح (ما نُشحنه في Flutter)',
        body: 'لغة واحدة، تطبيقات أو نكهات متعددة؛ لا عميل ويب مخصص في الخارطة.',
        subs: [
          '<strong>B2C جوال</strong> — استكشاف يبدأ من الخريطة، حجز، كراج، حساب (هاتف).',
          '<strong>B2B متكيف</strong> — تابلت في الاستقبال + هاتف لصاحب الورشة؛ لوحة، تقويم، كتالوج.',
          '<strong>إدارة خفيفة</strong> — تطبيق عمليات بسيط؛ عمل مخصص كثيف في <strong>Supabase Studio</strong> مبكرًا.',
        ],
      },
      {
        label: 'تقسيم الملكية (5 مهندسين)',
        body: 'RACI تقريبي حتى لا يتعطل العمل المشترك.',
        subs: [
          '<strong>~2 مهندسين — B2C</strong> — خريطة، مسار الحجز، حساب المستهلك.',
          '<strong>~2 مهندسين — B2B</strong> — لوحة عمليات، كتالوج، تفاصيل الحجز، إشعارات لحظية.',
          '<strong>1 قائد تقني</strong> — <strong>حزم</strong> مشتركة (رموز تصميم، نواة، غلاف مصادقة)، <strong>BaaS</strong> (RLS، Edge Functions، migrations).',
        ],
      },
      {
        label: 'اقرأ أولًا (الأسبوع 0–1)',
        body: 'نفّذ بهذا الترتيب لرفع حدود التكامل.',
        subs: [
          '<strong>المصادقة</strong> — MVP بريد/كلمة مرور (نموذج + PRD)؛ دورة الجلسة والحماية.',
          '<strong>الخريطة + PostGIS</strong> — عقد الدبوس، الفلاتر، تبديل قائمة/خريطة، تجربة الإذن.',
          '<strong>الحجز + Realtime</strong> — آلة حالات، حجوزات، مزامنة B2B ↔ B2C.',
        ],
      },
    ],
  },
  'ftg-repo-flavors': {
    eyebrow: 'إعداد المشروع',
    title: 'المستودع، النكهات، البيئات',
    items: [
      {
        label: 'تخطيط المونوريبو',
        body: 'يحافظ على نطاق وواجهة مشتركة بين B2C وB2B.',
        subs: [
          '<strong>apps/osta_b2c</strong> — نقطة دخول المستهلك، أيقونات المنتج.',
          '<strong>apps/osta_b2b</strong> — نقطة دخول الأعمال، نقاط توقف متكيفة.',
          '<strong>packages/core</strong> — بيئة، تسجيل، أخطاء، توصيل عميل Supabase.',
          '<strong>packages/ui</strong> — ويدجت Osta، امتدادات السمة.',
          '<strong>packages/features/&lt;name&gt;</strong> — اختياري؛ استخرج عند استقرار API (خريطة، حجز).',
        ],
      },
      {
        label: 'النكهات ومصفوفة البيئة',
        body: 'استخدم <strong>--dart-define</strong> أو إعدادًا حسب النكهة — لا مفاتيح ثابتة في الكود.',
        subs: [
          '<strong>dev / staging / prod</strong> — URL مختلف لـ Supabase + مفتاح anon.',
          '<strong>معرّفات الحزم وأسماء التطبيقات</strong> لكل سطح ليبقى وصف المتجر واضحًا.',
        ],
      },
      {
        label: 'الأسرار وCI',
        body: '<strong>لا ترفع أبدًا</strong> مفاتيح service-role أو كلمات توقيع.',
        subs: [
          'محليًا: <strong>.env</strong> gitignored؛ وثّق أسماء المتغيرات في README.',
          'CI: أسرار GitHub (أو Codemagic) للـ defines والتوقيع؛ نفس الأسماء محليًا.',
        ],
      },
      {
        label: 'قائمة جهاز جديد',
        body: 'مسار تسليم مهندس Flutter جديد.',
        subs: [
          'Flutter <strong>stable</strong>؛ قبول تراخيص Android SDK / Xcode.',
          'اختياري: <strong>melos</strong> لسكربتات الحزم المتعددة.',
          '<strong>build_runner</strong> حيث freezed/json_serializable/riverpod_codegen.',
        ],
      },
    ],
  },
  'ftg-architecture': {
    eyebrow: 'البنية',
    title: 'الطبقات وقواعد الاعتماد',
    items: [
      {
        label: 'Feature-first + حدود نظيفة',
        body: 'كل ميزة تملك مجلد <strong>domain + data + presentation</strong>. الكود المشترك ينتقل إلى <strong>packages/</strong> فقط عندما يحتاجه تطبيقان.',
        subs: [
          'استخرج <strong>packages/features/booking</strong> عند استقرار API الحجز والحالات.',
          'حتى ذلك، مجلد <strong>feature/</strong> داخل كل تطبيق مقبول.',
        ],
      },
      {
        label: 'قاعدة الاعتماد (غير قابلة للنقاش)',
        body: '<strong>النطاق</strong> لا يعتمد على شيء خاص بـ Flutter. <strong>البيانات</strong> تنفذ واجهات النطاق وتتحدث مع Supabase.',
        subs: [
          'ممنوع: <code style="font-size:0.85em">import \'package:flutter/…\';</code> تحت domain/.',
          'UI قد تعتمد على النطاق؛ لا العكس.',
        ],
      },
      {
        label: 'نموذج الخطأ والنتيجة',
        body: 'أرجع <strong>Result / Either</strong> أو <strong>Failure</strong> مُنمّاة من المستودعات — لا ترمي للحالات المتوقعة.',
        subs: [
          '<strong>للمستخدم</strong> — حوّل إلى snackbar / خطأ حقل + i18n.',
          '<strong>للسجل فقط</strong> — أخطاء parsing، 5xx؛ أرسل للمراقبة مع معرف ارتباط.',
        ],
      },
    ],
    extraHtml: (function () {
      var pkgs = ['go_router','flutter_riverpod','riverpod_annotation','supabase_flutter','freezed','json_serializable','google_maps_flutter','geolocator','permission_handler','intl','cached_network_image','image_picker','flutter_secure_storage'];
      var pkgSpans = pkgs.map(function (p) { return '<span class="ftg-pkg">' + p + '</span>'; }).join('');
      return '<div class="ftg-arch-diagram"><div class="ftg-arch-title">بنية المشروع (مكدس الطبقات)</div><div class="ftg-arch-row"><span class="ftg-arch-layer">العرض</span><span class="ftg-arch-desc">شاشات وويدجت، <strong>go_router</strong> (تبويبات + مكدسات متداخلة)، Material 3. <strong>أسلوب MVVM:</strong> Notifier / Cubit / Bloc — بدون استدعاءات SDK مباشرة في build().</span></div><div class="ftg-arch-row"><span class="ftg-arch-layer">التطبيق (اختياري)</span><span class="ftg-arch-desc">تنسيق رفيع عندما تمرّ الميزة بعدة مستودعات (مثلاً حجز موعد → إنشاء حجز).</span></div><div class="ftg-arch-row"><span class="ftg-arch-layer">النطاق</span><span class="ftg-arch-desc">كيانات، كائنات قيمة، <strong>واجهات مستودع</strong>، أخطاء. <strong>لا يجوز</strong> استيراد <code style="font-size:0.9em">flutter</code> أو <code style="font-size:0.9em">supabase_flutter</code>.</span></div><div class="ftg-arch-row"><span class="ftg-arch-layer">البيانات</span><span class="ftg-arch-desc">تنفيذ المستودعات، Supabase/PostgREST، قنوات Realtime، Storage، كاش محلي. يحوّل DTOs ↔ نماذج النطاق.</span></div></div><div class="ftg-pkg-wrap"><div class="ftg-pkg-eyebrow">حزم مقترحة (اختر مكدس حالة واحد)</div><div class="ftg-pkg-row">' + pkgSpans + '<span class="ftg-pkg">bloc</span><span class="ftg-pkg">flutter_bloc</span></div><p class="ftg-li-body" style="margin:0.5rem 0 0;font-size:0.72rem;color:#64748b;">قاعدة الفريق: <strong>Riverpod أو Bloc في كل مكان</strong> — لا الاثنين معًا في ميزات الإنتاج.</p></div>';
    })(),
  },
  'ftg-routing-deeplinks': {
    eyebrow: 'البنية',
    title: 'التنقّل والروابط العميقة',
    items: [
      {
        label: 'شجرة مسارات go_router',
        body: '<strong>RouterConfig</strong> واحد لكل تطبيق؛ فروع متداخلة لكل تبويب سفلي.',
        subs: [
          '<strong>ShellRoute</strong> لتبويبات الخريطة / الحجوزات / الحساب (B2C).',
          '<strong>مكدسات منفصلة</strong> داخل كل تبويب حتى الرجوع يزيل فقط المكدس المحلي.',
        ],
      },
      {
        label: 'إعادة توجيه المصادقة',
        body: 'مسارات <strong>الضيف</strong>: splash، تسجيل، تصفح عام إن سمح المنتج. مسارات <strong>مُوثّق</strong>: حجز، كراج، عمليات B2B.',
        subs: [
          'احتفظ بـ <strong>رابط عميق معلّق</strong> عبر نجاح تسجيل الدخول.',
          'B2B: وجّه الورش غير المعتمدة إلى شاشة انتظار التحقق.',
        ],
      },
      {
        label: 'الروابط العميقة والدفع',
        body: 'وائِم أشكال المسارات مع حمولات FCM/APNS المستقبلية.',
        subs: [
          'أمثلة: <strong>/booking/:id</strong>، <strong>/shop/:id</strong>، <strong>/b2b/booking/:id</strong>.',
          'معرفات غير صالحة أو منتهية → خطأ ودّي + fallback للرئيسية.',
        ],
      },
      {
        label: 'رجوع أندرويد والاستعادة',
        body: 'اختبر على أجهزة حقيقية: رجوع النظام، الرجوع التنبؤي، موت العملية.',
        subs: [
          'وثّق أي المسارات <strong>جذر</strong> (إغلاق التطبيق مقابل تبديل التبويب).',
          'استعد <strong>التمرير + حالة النموذج</strong> حيث يحتاج الـ MVP (مثلاً نموذج حجز طويل).',
        ],
      },
    ],
  },
  'ftg-state-di': {
    eyebrow: 'البنية',
    title: 'الحالة وحقن الاعتماد',
    items: [
      {
        label: 'اختر نمطًا أساسيًا واحدًا',
        body: '<strong>Riverpod</strong> (AsyncNotifier / Notifier) <em>أو</em> <strong>Bloc/Cubit</strong> — وثّق الاختيار في ADR.',
        subs: [
          'تجنّب خلط الأنماط في نفس الميزة بدون طبقة وسيطة.',
          'القائد التقني يحسم النزاعات؛ حدّث التوثيق عند تغيير الاختيار.',
        ],
      },
      {
        label: 'المستودعات كفاصل',
        body: 'الويدجت ونماذج العرض تستدعي <strong>مستودعات مجردة</strong>؛ الاختبارات تُدخل مزيفات.',
        subs: [
          'لا <strong>Supabase.instance</strong> في كود العرض.',
          'واجهة غير متزامنة: <strong>AsyncValue</strong> (Riverpod) أو حالات صريحة (Bloc).',
        ],
      },
      {
        label: 'محلي مقابل عالمي',
        body: 'أبقِ الواجهة المؤقتة (الورقة مفتوحة، فهرس التبويب) قريبًا من شجرة الويدجت.',
        subs: [
          'استخدم <strong>ValueNotifier</strong> أو Cubit محلي لواجهة لحظية.',
          'الجلسة، الملف الشخصي، وتدفقات شبيهة بالسلة تستخدم موفّرات/بلوكات <strong>عالمية</strong>.',
        ],
      },
      {
        label: 'خطافات الاختبار',
        body: 'كل ميزة تُشحن مع <strong>اختبار ويدجت</strong> واحد على الأقل باستخدام overrides.',
        subs: [
          'Riverpod: <strong>ProviderScope(overrides: …)</strong>.',
          'Bloc: <strong>bloc_test</strong> + مستودعات وهمية.',
        ],
      },
    ],
  },
  'ftg-supabase': {
    eyebrow: 'المنصة',
    title: 'Supabase من Flutter',
    items: [
      {
        label: 'دورة حياة العميل',
        body: 'هيّئ <strong>Supabase</strong> مرة عند التشغيل؛ استمع لـ <strong>حالة المصادقة</strong> لتحديث الموجّه.',
        subs: [
          'عند <strong>signOut</strong>: امسح الكاشات في الذاكرة، ألغِ اشتراكات Realtime.',
          'عالج <strong>فشل تجديد التوكن</strong> بمسار إعادة مصادقة.',
        ],
      },
      {
        label: 'RLS والوصول للبيانات',
        body: 'Flutter يفترض أن <strong>RLS</strong> صحيح — وثّق السياسات لكل جدول في Notion أو المستودع.',
        subs: [
          '<strong>دبابيس الخريطة</strong> — قراءة عامة للمراكز الموثّقة ضمن قيود.',
          '<strong>الحجوزات</strong> — صفوف مالك السيارة مقابل موظف الورشة.',
          '<strong>التقييمات</strong> — إدراج بعد حجز مكتمل فقط.',
        ],
      },
      {
        label: 'Realtime',
        body: 'سمِّ القنوات بشكل متوقع، مثل <strong>booking:&lt;id&gt;</strong> أو <strong>shop:&lt;id&gt;:bookings</strong>.',
        subs: [
          'لوحة B2B: toast + إشعار صوتي اختياري عند <strong>حجز جديد</strong>.',
          'إعادة الاتصال بتراجع؛ اعرض رسالة «انقطع الاتصال» إن لزم.',
        ],
      },
      {
        label: 'Edge Functions وStorage',
        body: 'استخدم Edge Functions لـ <strong>قواعد قصيرة العمر</strong> (TTL لحجز الموعد، idempotency).',
        subs: [
          '<strong>حاويات Storage</strong> لصور الورشة ووثائق التحقق؛ روابط موقّعة من Flutter.',
          'تحقق من النوع والحجم قبل الرفع لتوفير النطاق.',
        ],
      },
    ],
  },
  'ftg-maps-location': {
    eyebrow: 'المنصة',
    title: 'الخرائط والموقع',
    hint: 'معاينة: <strong>خريطة B2C الرئيسية</strong> (للقراءة في الهاتف). ابنِ الشاشة الحقيقية في تطبيق المستهلك؛ استخدم هذه القائمة للخرائط والموقع والأداء.',
    items: [
      {
        label: 'اختيار SDK',
        body: '<strong>google_maps_flutter</strong> هو الافتراضي؛ Mapbox إذا احتجت الترخيص أو التصميم — يتطلب ADR.',
        subs: ['اعتبر قيود مفاتيح API (SHA-1 / bundle id) لكل نكهة.'],
      },
      {
        label: 'عقد الخلفية',
        body: 'قراءة الخريطة من API مدعوم بـ <strong>PostGIS</strong> أو RPC — اتفق على شكل JSON مرة واحدة.',
        subs: [
          'حقول الدبوس: <strong>id, lat, lng, name, verified, distance_m, open_now</strong> (مثال).',
          'ادعم <strong>شرائح الفلتر</strong> في الخادم حيثما أمكن.',
        ],
      },
      {
        label: 'تجربة الأذونات',
        body: 'اشرح <strong>لماذا</strong> نحتاج الموقع؛ اعرض تصفحًا بدون GPS إن سمح المنتج.',
        subs: [
          '<strong>الرفض</strong> — مركز على المدينة أو آخر موقع؛ زر إعدادات بارز.',
          '<strong>وضع الطوارئ</strong> — عنصر نموذجي لـ MVP؛ وثّق السلوك.',
        ],
      },
      {
        label: 'الأداء',
        body: 'جمّع الدبابيس؛ قلّل إعادة الجلب عند تحريك الكاميرا؛ أبقِ الورقة السفلية رخيصة إعادة البناء.',
        subs: ['استهدف تمريرًا/تكبيرًا سلسًا على أندرويد متوسط.'],
      },
    ],
  },
  'ftg-media-forms': {
    eyebrow: 'المنصة',
    title: 'النماذج والرفع',
    items: [
      {
        label: 'النماذج والتحقق',
        body: 'استخدم مكوّنات حقول متسقة مع رسائل خطأ <strong>i18n</strong>.',
        subs: [
          'اعرض الأخطاء عند الإرسال وعند فقدان التركيز عند الحاجة.',
          'إمكانية الوصول: semantics، ترتيب التركيز، إعلان الخطأ.',
        ],
      },
      {
        label: 'مسار الرفع',
        body: '<strong>image_picker</strong> → ضغط (مثلاً flutter_image_compress) → <strong>Storage</strong>.',
        subs: [
          'اعرض <strong>التقدم</strong> واسمح بالإلغاء.',
          'أعد المحاولة عند الأعطال المؤقتة؛ حوّل أخطاء Storage لنصوص المستخدم.',
        ],
      },
      {
        label: 'حقول مشتركة',
        body: 'أعد استخدام ويدجت لـ <strong>VIN</strong>، طراز السيارة، وصفوف <strong>الكتالوج</strong> عند تطابق النماذج.',
        subs: ['أبقِ قواعد التحقق في مكان واحد (النطاق أو حزمة نماذج مشتركة).'],
      },
    ],
  },
  'ftg-ui-i18n-rtl': {
    eyebrow: 'أساسيات تجربة الاستخدام',
    title: 'نظام التصميم، i18n، RTL',
    items: [
      {
        label: 'رموز التصميم',
        body: 'اربط متغيرات CSS من النموذج (<strong>--brand</strong>، نصف القطر، النوع) بـ <strong>ThemeExtension</strong>.',
        subs: ['مصدر واحد لـ <strong>OstaButton</strong>، البطاقات، الشرائح.'],
      },
      {
        label: 'سير عمل i18n',
        body: '<strong>flutter_localizations</strong> + <strong>intl</strong> + ملفات ARB؛ لا نصوص مستخدم ثابتة في الويدجت.',
        subs: ['لغة وهمية اختيارية لاختبار الoverflow.'],
      },
      {
        label: 'RTL (العربية)',
        body: 'عكس تحكمات الخريطة وأيقونات المقدمة في القائمة وخطوات الحجز.',
        subs: [
          '<strong>اختبارات ذهبية</strong> لكروم الخريطة + الحجز في RTL.',
          'المرحلة 2: تدقيق نص كبير وتباين.',
        ],
      },
    ],
  },
  'ftg-quality-release': {
    eyebrow: 'التسليم',
    title: 'الاختبار والإصدار',
    items: [
      {
        label: 'هرم الاختبار',
        body: '<strong>وحدة</strong> — النطاق + المحوّلات؛ <strong>ويدجت</strong> — تدفقات حرجة؛ <strong>تكامل</strong> — مسار سعيد لكل مرحلة.',
        subs: ['Patrol أو <strong>integration_test</strong> للنهاية للنهاية عند الاستقرار.'],
      },
      {
        label: 'بوابات CI',
        body: 'كل PR: <strong>dart format</strong>، <strong>analyze</strong>، <strong>test</strong>؛ بناء إصدار دوري.',
        subs: ['افشل PR عند أخطاء analyzer؛ تعامل مع infos/warnings حسب سياسة الفريق.'],
      },
      {
        label: 'المراقبة',
        body: 'اختر <strong>Sentry</strong> أو <strong>Crashlytics</strong>؛ امسح PII من السجلات والفتات.',
        subs: ['وسم الإصدارات بإصدار + نكهة للفرز.'],
      },
      {
        label: 'الإصدار',
        body: '<strong>نظام إصدارات</strong> + توقيع المتجر في CI؛ سياسة فرع hotfix موثّقة.',
        subs: ['المرحلة 2: طرح مرحلي، أعلام ميزات إن لزم.'],
      },
    ],
  },
} as const;