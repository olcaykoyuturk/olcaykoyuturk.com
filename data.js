// CV / portfolio data — Turkish + English
const PROFILE = {
  name: "Olcay Koyutürk",
  role: { tr: "Yazılım Mühendisi", en: "Software Engineer" },
  location: { tr: "İstanbul, Esenler", en: "İstanbul / Esenler" },
  email: "olcaykoyuturk@gmail.com",
  github: "github.com/olcaykoyuturk",
  phone: "+90 553 850 25 78",
  taglines: {
    tr: [
      "sinyal işleme",
      "EEG & beyin–makine arayüzleri",
      "gömülü sistemler",
      "robotik kodlama",
      "veri görselleştirme",
    ],
    en: [
      "signal processing",
      "EEG & brain–machine interfaces",
      "embedded systems",
      "robotics programming",
      "data visualization",
    ],
  },
};

const ABOUT = {
  tr: "Analitik düşünen, detaylara önem veren ve sürekli öğrenmeyi temel ilke edinmiş bir yazılım mühendisliği öğrencisiyim. Teknolojik yeniliklere ayak uydurmayı, problemleri sistematik biçimde çözmeyi ve işlevsel, sürdürülebilir çözümler üretmeyi hedefliyorum. Bireysel olarak ve takım içinde yeni projelere katkıda bulunmayı önemseyen, güçlü iletişim becerilerine sahip, sorumluluk sahibi bir takım oyuncusuyum.",
  en: "I am a software engineering student who thinks analytically, pays attention to detail, and adopts continuous learning as a core principle. I aim to keep up with technological innovations, solve problems systematically, and create functional and sustainable solutions. I am a responsible team player with strong communication skills and value contributing to new projects both individually and collaboratively.",
};

const EXPERIENCE = [
  {
    period: "07/2024 — 09/2024",
    company: "Netax Technologies",
    role: {
      tr: "Yazılım Mühendisliği Stajı — Ses Veri İşleme",
      en: "Software Engineering Internship — Audio Data Processing",
    },
    location: "İstanbul",
    tags: ["DSP", "FFT", "Python", "Audio"],
    bullets: {
      tr: [
        "Ham ses verisini analiz edip dönüştürebilen modüler bir sinyal işleme uygulaması geliştirdim.",
        "Zaman ve frekans alanı analiz tekniklerini, FFT dahil, uçtan uca uyguladım.",
        "Spektrogram, osiloskop ve dalga formu görselleştirmeleri tasarladım.",
        "Pink Noise, White Noise ve Frequency Sweep sinyal üretim modülleri yazdım.",
        "Edinim ve işleme aşamaları arasında senkron çalışan ses kayıt/oynatma boru hattı kurdum.",
      ],
      en: [
        "Built a modular audio signal processing app capable of analyzing and transforming raw audio.",
        "Implemented time- and frequency-domain analysis including FFT for spectral decomposition.",
        "Designed visualizations: spectrograms, oscilloscopes, waveform plots.",
        "Built signal generation modules: Pink Noise, White Noise, Frequency Sweep.",
        "Integrated synchronized recording/playback pipelines with structured testing.",
      ],
    },
  },
  {
    period: "06/2025 — 08/2025",
    company: "Teksan",
    role: {
      tr: "Yazılım Mühendisliği Stajı — M-Bus Protokolü",
      en: "Software Engineering Internship — M-Bus Protocol",
    },
    location: "İstanbul",
    tags: ["Python", "M-Bus", "SQL", "Analytics"],
    bullets: {
      tr: [
        "M-Bus protokolüyle su sayacı verisi toplayan Python tabanlı bir masaüstü uygulama geliştirdim.",
        "Slave sayaçların anlık okumalarını yapılandırılmış veri akışıyla gerçek zamanlı izledim.",
        "Günlük, haftalık, aylık tüketim için analitik ve raporlama modülleri tasarladım.",
        "Trend ve pik tüketim analizleriyle anomali tespiti için altyapı kurdum.",
        "SQL ile kalıcı veri depolama ve PDF rapor üretimini otomatikleştirdim.",
      ],
      en: [
        "Built a Python desktop app collecting and processing water-meter data over M-Bus.",
        "Implemented real-time monitoring of instantaneous slave meter readings.",
        "Designed daily / weekly / monthly consumption analytics and reporting modules.",
        "Performed trend and peak consumption analysis to surface anomalies.",
        "Managed persistent storage via SQL; automated PDF report generation.",
      ],
    },
  },
];

const PROJECTS = [
  {
    id: "grad",
    featured: true,
    year: "2025—2026",
    title: { tr: "CubeFleet — Bitirme Projesi", en: "CubeFleet — Graduation Project" },
    short: {
      tr: "ESP32 tabanlı iki AGV'nin PC üzerinden koordineli görev yaptığı, YOLO + OpenCV ile küp tespiti yapan robot kollu küp toplama platformu.",
      en: "A cube-collection platform: two ESP32-based AGVs coordinated via a PC, with a robotic arm and YOLO + OpenCV cube detection.",
    },
    tags: ["ESP32", "AGV", "A*", "YOLO", "OpenCV", "WebSocket", "Python"],
    body: {
      tr: [
        "ESP32 tabanlı iki AGV'nin bir PC üzerinden koordineli görev yaptığı, A* + multi-agent çakışma çözümü ile yolların paralel kullanıldığı, YOLO + OpenCV ile küp tespiti yapan robot kollu bir küp toplama platformu.",
        "Üç farklı firmware + Python kontrol UI + WebSocket pipeline.",
      ],
      en: [
        "A cube-collection platform where two ESP32-based AGVs perform coordinated tasks via a PC. A* + multi-agent conflict resolution lets paths run in parallel, and a robotic arm picks cubes detected by YOLO + OpenCV.",
        "Three separate firmwares + a Python control UI + a WebSocket pipeline.",
      ],
    },
    link: "github.com/olcaykoyuturk",
  },
  {
    id: "stilai",
    year: "2025",
    title: { tr: "Stilai", en: "Stilai" },
    playStore: "#",
    short: {
      tr: "Dolabını dijitale taşı, yapay zekâyla kombin öner, topluluğa katıl — kişisel stil asistanı uygulaması.",
      en: "Digitize your wardrobe, get AI-powered outfit suggestions, join a community — a personal style assistant app.",
    },
    tags: ["AI", "Mobile", "Wardrobe", "Community"],
    body: {
      tr: [
        "Stilai, kullanıcının kendi dolabındaki kıyafetleri telefonuyla fotoğraflayıp dijitale aktarmasını sağlayan bir mobil uygulamadır. Yapay zekâ bu kıyafetleri otomatik olarak tanıyıp düzenliyor ve kullanıcıya her gün giyebileceği uyumlu kombinler öneriyor.",
        "Uygulamada kullanıcı isterse yapay zekânın hazırladığı kombinleri alıyor, isterse mağazada beğendiği bir kıyafetin kendi gardırobuyla uyumlu olup olmadığını yapay zekâya test ettirebiliyor ya da kendi seçtiği parçalardan kombin oluşturup değerlendirme alabiliyor.",
        "Bunun yanında bir topluluk akışı sunuyor; kullanıcılar kombinlerini paylaşabiliyor, başkalarının paylaşımlarını beğenip yorum yapabiliyor ve ilgisini çeken kişileri takip ederek onların stilinden ilham alabiliyor.",
        "Uygulama ayrıca kullanıcının gardırobunu inceleyip eksik kalan parçaları ve önerileri sunan bir tavsiye özelliği, haftalık stil temaları ve kombinleri istediği şekilde sıralayabilme imkânı sunuyor.",
      ],
      en: [
        "Stilai is a mobile app that lets users photograph the clothes in their own wardrobe with their phone and move them into a digital closet. AI automatically recognizes and organizes the items, then suggests outfits the user can wear every day.",
        "Inside the app, users can accept the AI's outfit suggestions, test whether an item they like in a store would match their existing wardrobe, or build their own outfit from selected pieces and get it rated.",
        "It also provides a community feed: users can share their outfits, like and comment on others' posts, and follow people whose style they want to draw inspiration from.",
        "The app also offers a recommendation feature that analyzes the user's wardrobe to surface missing pieces and suggestions, weekly style themes, and the ability to sort outfits however the user likes.",
      ],
    },
    link: "github.com/olcaykoyuturk",
  },
  {
    id: "cuzdanio",
    year: "2025",
    title: { tr: "CuzdanIO", en: "CuzdanIO" },
    playStore: "#",
    short: {
      tr: "Gelir, gider, abonelik, borç ve birikim hedeflerini tek yerden yöneten, çevrimdışı destekli kişisel finans uygulaması.",
      en: "Offline-capable personal finance app that manages income, expenses, subscriptions, debts and savings goals in one place.",
    },
    tags: ["Finance", "Mobile", "OCR", "Voice", "Offline"],
    body: {
      tr: [
        "Kullanıcıların gelir, gider, abonelik, borç ve birikim hedeflerini tek yerden yönetmesini sağlayan çevrimdışı destekli kişisel finans uygulaması.",
        "OCR ile fiş tarama, sesle işlem ekleme, otomatik kategori önerisi ve akıllı bildirim sistemi içerir.",
      ],
      en: [
        "An offline-capable personal finance app that lets users manage income, expenses, subscriptions, debts and savings goals in a single place.",
        "Includes OCR receipt scanning, voice-based transaction entry, automatic category suggestions, and a smart notification system.",
      ],
    },
    link: "github.com/olcaykoyuturk",
  },
  {
    id: "sound",
    year: "2024",
    title: { tr: "Sound Multitool", en: "Sound Multitool" },
    short: {
      tr: "Ses analizi ve üretimi için çok amaçlı uygulama — gerçek zamanlı dalga görselleştirme dahil.",
      en: "A multi-purpose app for audio analysis and generation — real-time waveform visualization included.",
    },
    tags: ["DSP", "Audio", "Visualization"],
    body: {
      tr: [
        "Ses analizi ve sinyal üretimini bir araya getiren bir uygulama. Ses dalgalarını gerçek zamanlı görselleştirir; çeşitli algoritmalarla farklı ses özniteliklerini görselleştirme, ses üretme, kaydetme ve oynatma desteği sunar.",
      ],
      en: [
        "An application that combines audio analysis and generation features. It visualizes sound waves in real time, supports visualizing different audio features via algorithms, plus audio generation, recording and playback.",
      ],
    },
    link: "github.com/olcaykoyuturk",
  },
  {
    id: "eeg-ai",
    year: "2025",
    title: { tr: "EEG Dalga Sinyali Görselleştirme + AI", en: "EEG Wave Signal Visualization + AI" },
    short: {
      tr: "Kendi topladığımız EEG verisini etiketleyip yapay zekâ ile özetliyor ve tahmin yapıyoruz.",
      en: "Self-collected EEG signals — visualized, labelled, summarized and predicted with AI.",
    },
    tags: ["EEG", "AI", "Visualization", "Python"],
    body: {
      tr: [
        "Amaç, kendimiz tarafından toplanan EEG sinyallerini görselleştirip etiketlemek; ardından bu veriler üzerinden özetler üretmek ve tahmin modelleri kurmak için AI kullanmaktır.",
      ],
      en: [
        "The aim is to visualize and label EEG signals collected by ourselves, and to use AI to generate summaries and make predictions based on the data.",
      ],
    },
    link: "github.com/olcaykoyuturk",
  },
  {
    id: "astar",
    year: "2024",
    title: { tr: "A* Algoritması — AGV Navigasyonu", en: "A* Algorithm — AGV Navigation" },
    short: {
      tr: "A* algoritması ile AGV navigasyonu; swarm (çok-ajanlı) senaryoları destekler.",
      en: "A*-based AGV navigation with swarm (multi-agent) support.",
    },
    tags: ["A*", "Pathfinding", "Multi-agent"],
    body: {
      tr: [
        "A* algoritması kullanılarak AGV araçlarının navigasyonunu sağlar. Çok-ajanlı (swarm) algoritmalarla birlikte çalışabilir.",
      ],
      en: [
        "AGV vehicle navigation using the A* algorithm. It supports swarm (multi-agent) algorithms.",
      ],
    },
    link: "github.com/olcaykoyuturk",
  },
];

const EDUCATION = [
  {
    period: "2021 — 2026",
    school: "İstanbul Atlas University",
    degree: { tr: "Yazılım Mühendisliği — Lisans", en: "Software Engineering — Bachelor's Degree" },
  },
];

const CERTIFICATES = [
  { title: { tr: "Bilgisayar İşletmenliği", en: "Computer Operation" }, source: "Milli Eğitim Bakanlığı", code: "37472920180058351638" },
  { title: { tr: "Diksiyon, Yorumlama ve Sunuculuk", en: "Diction, Commentary and Presenter" }, source: "Milli Eğitim Bakanlığı", code: "37472920240085657924" },
  { title: { tr: "Kampüs Akademia — Liderlik, İkna, Etkili İletişim", en: "Campus Academia — Leadership, Persuasion, Effective Communication" }, source: "Program", code: "—" },
  { title: { tr: "İngilizce A2", en: "English A2" }, source: "Milli Eğitim Bakanlığı", code: "37472920190062001742" },
  { title: { tr: "Diksiyon", en: "Diction" }, source: "Milli Eğitim Bakanlığı", code: "37472920230082631317" },
  { title: { tr: "Osmanlı Türkçesinde Türkçe Kelimelerin Yazımı", en: "Spelling of Turkish Words in Ottoman Turkish" }, source: "Milli Eğitim Bakanlığı", code: "37472920230082297011" },
];

const BLOG = [
  {
    id: "test",
    date: "2026-05-23",
    readTime: { tr: "2 dk okuma", en: "2 min read" },
    tags: ["test"],
    title: { tr: "Test", en: "Test" },
    excerpt: {
      tr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    body: {
      tr: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ],
      en: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ],
    },
  },
];

const LANGUAGES = [
  { name: { tr: "Türkçe", en: "Turkish" }, level: { tr: "Anadil", en: "Native" }, pct: 100 },
  { name: { tr: "İngilizce", en: "English" }, level: "B1", pct: 55 },
];

const SKILLS = [
  { label: "Python", group: "lang" },
  { label: "C / C++", group: "lang" },
  { label: "Java", group: "lang" },
  { label: "SQL", group: "lang" },
  { label: "IoT", group: "domain" },
  { label: "Embedded System", group: "domain" },
  { label: "Algoritma", group: "domain" },
  { label: "Robotik", group: "domain" },
  { label: "AI", group: "domain" },
  { label: "ANN", group: "domain" },
  { label: "Machine Learning", group: "domain" },
];

const COPY = {
  nav: {
    tr: { about: "Hakkımda", education: "Eğitim", experience: "Deneyim", projects: "Projeler", certificates: "Sertifikalar", blog: "Blog", contact: "İletişim" },
    en: { about: "About", education: "Education", experience: "Experience", projects: "Projects", certificates: "Certificates", blog: "Blog", contact: "Contact" },
  },
  sections: {
    tr: {
      aboutKicker: "001 — Hakkımda",
      educationKicker: "002 — Eğitim",
      experienceKicker: "003 — Deneyim",
      projectsKicker: "004 — Projeler",
      certificatesKicker: "005 — Sertifikalar",
      blogKicker: "006 — Yazılar",
      contactKicker: "007 — İletişim",
      skills: "Yetkinlikler",
      languages: "Diller",
      featured: "Öne Çıkan",
      viewProject: "Projeyi Aç",
      readPost: "Devamını oku",
      close: "Kapat",
      stack: "Yığın",
      overview: "Genel Bakış",
      link: "Bağlantı",
      contactLead: "Bana ulaşmak için.",
      cta: "Mail Gönder",
      availability: "Her zaman iletişime açığım.",
      scrollHint: "kaydır",
    },
    en: {
      aboutKicker: "001 — About",
      educationKicker: "002 — Education",
      experienceKicker: "003 — Experience",
      projectsKicker: "004 — Projects",
      certificatesKicker: "005 — Certificates",
      blogKicker: "006 — Writings",
      contactKicker: "007 — Contact",
      skills: "Skills",
      languages: "Languages",
      featured: "Featured",
      viewProject: "View Project",
      readPost: "Read post",
      close: "Close",
      stack: "Stack",
      overview: "Overview",
      link: "Link",
      contactLead: "Get in touch.",
      cta: "Send Email",
      availability: "Always open to a conversation.",
      scrollHint: "scroll",
    },
  },
};

window.PORTFOLIO_DATA = { PROFILE, ABOUT, EXPERIENCE, PROJECTS, EDUCATION, CERTIFICATES, BLOG, LANGUAGES, SKILLS, COPY };
