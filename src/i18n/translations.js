// src/i18n/translations.js

/**
 * Translation dictionary.
 *
 * Behavior:
 * - The app will fall back to English if a key is missing in the selected language.
 */

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    buttons: {
      getInTouch: "Get In Touch",
      downloadResume: "Download Resume",
      viewAllProjects: "View All Projects",
      viewMyWork: "View My Work",
      clearFilters: "Clear Filters",
      backToHome: "Back to Home",
      viewProject: "View Project",
      liveDemo: "Live Demo",
      sourceCode: "Source Code",
    },
    aria: {
      goHome: "{{name}} home",
      viewProject: "View project: {{title}}",
      openProject: "Open project",
      previousProject: "Previous project",
      nextProject: "Next project",
      goToProject: "Go to project {{n}}",
      clearSearch: "Clear search",
      close: "Close",
      prevImage: "Previous image",
      nextImage: "Next image",
    },
    home: {
      profileAlt: "Portrait of {{name}}",
      heroLine1: "A web developer who turns passion into purpose.",
      heroLine2a: "I love coding not just as a hobby,",
      heroLine2b: "but as a way to solve real problems—for myself and for others.",
      status: "Available For Freelance",
      stats: {
        yearsProgrammingA: "Years",
        yearsProgrammingB: "Programming",
        yearsFullstackA: "Years",
        yearsFullstackB: "Full-Stack Focus",
        projectsBuiltA: "Projects",
        projectsBuiltB: "Built",
      },
      projects: {
        label: "My work",
        title: "Selected Projects",
        description:
          "A showcase of projects I've built to demonstrate my skills and problem-solving abilities",
      },
      cta: {
        title: "Let's Build Something Great Together",
        description1: "I'm currently available for freelance opportunities.",
        description2:
          "Whether you have a project in mind or just want to connect, I'd love to hear from you.",
      },
    },
    about: {
      hero: {
        title: "About Me",
        subtitle:
          "Passionate web developer transforming ideas into polished digital solutions through clean code and thoughtful design.",
      },
      journey: {
        title: "My Journey",
        p1:
          "I've been passionate about programming since 2018, with focused expertise in full-stack web development since 2022. As a self-taught developer, I've built a strong foundation across the entire web development stack—from crafting intuitive user interfaces to architecting robust backend systems.",
        p2:
          "With a passion for web design and a strong interest in programming, I approach every project with meticulous attention to detail. I strive to exceed expectations and deliver solutions that align with both the client's objectives and the latest industry trends.",
        p3:
          "As I evolve in my career, I remain committed to refining my skills and embracing new challenges. Driven by a relentless pursuit of excellence, I aim to create meaningful impacts through my work.",
      },
      skills: {
        title: "Technical Skills",
        frontend: "Frontend Development",
        backend: "Backend Development",
        dbTools: "Database & Tools",
      },
      experience: {
        title: "Work Experience",
        typeFreelance: "Freelance",
        typeFulltime: "Full-time",
      },
      cta: {
        title: "Let's Work Together",
        description1: "I'm currently available for freelance opportunities.",
        description2: "Let's collaborate to bring your vision to life.",
      },
      experiences: {
        exp1: {
          title: "Freelance Website Developer",
          company: "Self-Employed",
          duration: "2023 - Present",
          description:
            "Building custom web solutions for clients across various industries, focusing on modern technologies and best practices.",
        },
        exp2: {
          title: "Website and Robot Developer",
          company: "Nakayama Iron Works, Ltd.",
          duration: "March 2022 - Present",
          description:
            "Developing web applications and automation solutions for industrial robotics systems.",
        },
        exp3: {
          title: "Freelance Developer",
          company: "Cakra Motor Company",
          duration: "2021",
          description:
            "Created custom web solutions for automotive business management and customer relations.",
        },
      },
      stats: {
        yearsProgramming: "Years Programming",
        yearsFullstack: "Years Full-Stack",
        projectsCompleted: "Projects Completed",
        happyClients: "Happy Clients",
      },
    },
    contact: {
      hero: {
        title: "Get In Touch",
        subtitle1:
          "Have a project in mind or just want to connect? I'd love to hear from you.",
        subtitle2: "Let's collaborate and bring your ideas to life.",
      },
      info: {
        title: "Contact Information",
        description: "Feel free to reach out through any of these channels",
        emailLabel: "Email",
        locationLabel: "Location",
        followMe: "Follow me",
      },
      form: {
        title: "Send a Message",
        description: "Fill out the form below and I'll respond as soon as possible",
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "Message",
        required: "required",
        namePlaceholder: "John Doe",
        emailPlaceholder: "john@example.com",
        messagePlaceholder: "Tell me about your project...",
        sending: "Sending...",
        sendMessage: "Send Message",
      },
      validation: {
        nameRequired: "Name is required",
        emailRequired: "Email is required",
        emailInvalid: "Please enter a valid email",
        messageRequired: "Message is required",
        spamDetected: "Spam detected",
      },
      status: {
        success:
          "Thank you! Your message has been sent successfully. I'll get back to you soon.",
        spam: "Spam detected. Please try again.",
        fail:
          "Failed to send message. Please try again or contact me directly via email.",
      },
    },
    portfolio: {
      hero: {
        title: "My Portfolio",
        subtitle:
          "Discover my diverse portfolio showcasing polished digital solutions crafted across various industries and technologies.",
      },
      searchPlaceholder: "Search projects by name, tech, or role...",
      stats: {
        totalProjects: "Total Projects",
        categories: "Categories",
        showing: "Showing",
      },
      filterAll: "All Projects",
      noResults: {
        title: "No projects found",
        description:
          "Try adjusting your search or filter to find what you're looking for.",
      },
      cta: {
        title: "Interested in working together?",
        description: "Let's discuss how I can help bring your project to life.",
      },
    },
    project: {
      notFound: {
        title: "Project Not Found",
        description: "The project you're looking for doesn't exist.",
      },
      backToHome: "Back to Home",
      clickToExpand: "Click to expand",
      meta: {
        role: "Role",
        client: "Client",
        date: "Date",
      },
      sidebar: {
        details: "Project Details",
        techStack: "Technology Stack",
        links: "Links",
      },
      sections: {
        overview: "Overview",
        keyFeatures: "Key Features",
        mission: "Mission",
        impact: "Impact",
        gallery: "Project Gallery",
        similar: "Similar Projects",
      },
    },
  },

  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      portfolio: "Portofolio",
      contact: "Kontak",
    },
    buttons: {
      getInTouch: "Hubungi Saya",
      downloadResume: "Unduh CV",
      viewAllProjects: "Lihat Semua Proyek",
      viewMyWork: "Lihat Karya Saya",
      clearFilters: "Bersihkan Filter",
      backToHome: "Kembali ke Beranda",
      viewProject: "Lihat Proyek",
      liveDemo: "Demo Langsung",
      sourceCode: "Kode Sumber",
    },
    aria: {
      goHome: "Beranda {{name}}",
      viewProject: "Lihat proyek: {{title}}",
      openProject: "Buka proyek",
      previousProject: "Proyek sebelumnya",
      nextProject: "Proyek berikutnya",
      goToProject: "Ke proyek {{n}}",
      clearSearch: "Hapus pencarian",
      close: "Tutup",
      prevImage: "Gambar sebelumnya",
      nextImage: "Gambar berikutnya",
    },
    home: {
      profileAlt: "Potret {{name}}",
      heroLine1: "Web developer yang mengubah passion menjadi tujuan.",
      heroLine2a: "Saya suka ngoding bukan hanya sebagai hobi,",
      heroLine2b:
        "tapi sebagai cara untuk memecahkan masalah nyata—untuk diri saya dan orang lain.",
      status: "Tersedia untuk Freelance",
      stats: {
        yearsProgrammingA: "Tahun",
        yearsProgrammingB: "Ngoding",
        yearsFullstackA: "Tahun",
        yearsFullstackB: "Fokus Full-Stack",
        projectsBuiltA: "Proyek",
        projectsBuiltB: "Dibuat",
      },
      projects: {
        label: "Karya saya",
        title: "Proyek Pilihan",
        description:
          "Kumpulan proyek yang saya bangun untuk menunjukkan skill dan kemampuan problem-solving",
      },
      cta: {
        title: "Ayo Bangun Sesuatu yang Keren Bersama",
        description1: "Saat ini saya tersedia untuk pekerjaan freelance.",
        description2:
          "Kalau Anda punya ide proyek atau sekadar ingin terhubung, saya senang mendengarnya.",
      },
    },
    about: {
      hero: {
        title: "Tentang Saya",
        subtitle:
          "Web developer yang antusias mengubah ide menjadi solusi digital yang rapi melalui kode yang bersih dan desain yang matang.",
      },
      journey: {
        title: "Perjalanan Saya",
        p1:
          "Saya mulai menyukai pemrograman sejak 2018, dengan fokus full-stack web development sejak 2022. Sebagai developer otodidak, saya membangun fondasi kuat di seluruh stack—dari membuat UI yang intuitif sampai merancang backend yang andal.",
        p2:
          "Dengan ketertarikan pada web design dan pemrograman, saya mengerjakan setiap proyek dengan perhatian detail yang tinggi. Saya berusaha melampaui ekspektasi dan menghadirkan solusi yang selaras dengan tujuan klien serta tren industri terbaru.",
        p3:
          "Seiring berkembangnya karier, saya berkomitmen untuk terus mengasah kemampuan dan menerima tantangan baru. Didorong oleh keinginan untuk selalu lebih baik, saya ingin menciptakan dampak yang bermakna melalui pekerjaan saya.",
      },
      skills: {
        title: "Keahlian Teknis",
        frontend: "Frontend Development",
        backend: "Backend Development",
        dbTools: "Database & Tools",
      },
      experience: {
        title: "Pengalaman Kerja",
        typeFreelance: "Freelance",
        typeFulltime: "Penuh waktu",
      },
      cta: {
        title: "Mari Bekerja Sama",
        description1: "Saat ini saya tersedia untuk pekerjaan freelance.",
        description2: "Ayo kolaborasi untuk mewujudkan visi Anda.",
      },
      experiences: {
        exp1: {
          title: "Freelance Website Developer",
          company: "Self-Employed",
          duration: "2023 - Sekarang",
          description:
            "Membangun solusi web kustom untuk klien dari berbagai industri, dengan fokus pada teknologi modern dan best practice.",
        },
        exp2: {
          title: "Website and Robot Developer",
          company: "Nakayama Iron Works, Ltd.",
          duration: "Maret 2022 - Sekarang",
          description:
            "Mengembangkan aplikasi web dan solusi otomasi untuk sistem robotik industri.",
        },
        exp3: {
          title: "Freelance Developer",
          company: "Cakra Motor Company",
          duration: "2021",
          description:
            "Membuat solusi web kustom untuk manajemen bisnis otomotif dan relasi pelanggan.",
        },
      },
      stats: {
        yearsProgramming: "Tahun Ngoding",
        yearsFullstack: "Tahun Full-Stack",
        projectsCompleted: "Proyek Selesai",
        happyClients: "Klien Puas",
      },
    },
    contact: {
      hero: {
        title: "Hubungi Saya",
        subtitle1:
          "Punya ide proyek atau sekadar ingin berkenalan? Saya senang mendengarnya.",
        subtitle2: "Mari kolaborasi dan wujudkan ide Anda.",
      },
      info: {
        title: "Informasi Kontak",
        description: "Silakan hubungi saya melalui salah satu kanal berikut",
        emailLabel: "Email",
        locationLabel: "Lokasi",
        followMe: "Ikuti saya",
      },
      form: {
        title: "Kirim Pesan",
        description: "Isi formulir di bawah ini dan saya akan membalas secepatnya",
        nameLabel: "Nama",
        emailLabel: "Email",
        messageLabel: "Pesan",
        required: "wajib",
        namePlaceholder: "Nama Anda",
        emailPlaceholder: "emailanda@example.com",
        messagePlaceholder: "Ceritakan tentang proyek Anda...",
        sending: "Mengirim...",
        sendMessage: "Kirim Pesan",
      },
      validation: {
        nameRequired: "Nama wajib diisi",
        emailRequired: "Email wajib diisi",
        emailInvalid: "Masukkan email yang valid",
        messageRequired: "Pesan wajib diisi",
        spamDetected: "Spam terdeteksi",
      },
      status: {
        success:
          "Terima kasih! Pesan Anda berhasil terkirim. Saya akan segera membalas.",
        spam: "Spam terdeteksi. Silakan coba lagi.",
        fail:
          "Gagal mengirim pesan. Silakan coba lagi atau hubungi saya langsung via email.",
      },
    },
    portfolio: {
      hero: {
        title: "Portofolio Saya",
        subtitle:
          "Jelajahi portofolio saya yang menampilkan berbagai solusi digital yang rapi di beragam industri dan teknologi.",
      },
      searchPlaceholder: "Cari proyek berdasarkan nama, teknologi, atau peran...",
      stats: {
        totalProjects: "Total Proyek",
        categories: "Kategori",
        showing: "Ditampilkan",
      },
      filterAll: "Semua Proyek",
      noResults: {
        title: "Tidak ada proyek ditemukan",
        description:
          "Coba ubah kata kunci pencarian atau filter untuk menemukan yang Anda cari.",
      },
      cta: {
        title: "Tertarik bekerja sama?",
        description: "Mari diskusikan bagaimana saya bisa membantu proyek Anda.",
      },
    },
    project: {
      notFound: {
        title: "Proyek Tidak Ditemukan",
        description: "Proyek yang Anda cari tidak tersedia.",
      },
      backToHome: "Kembali ke Beranda",
      clickToExpand: "Klik untuk memperbesar",
      meta: {
        role: "Peran",
        client: "Klien",
        date: "Tanggal",
      },
      sidebar: {
        details: "Detail Proyek",
        techStack: "Stack Teknologi",
        links: "Tautan",
      },
      sections: {
        overview: "Ringkasan",
        keyFeatures: "Fitur Utama",
        mission: "Misi",
        impact: "Dampak",
        gallery: "Galeri Proyek",
        similar: "Proyek Serupa",
      },
    },
  },

  ja: {
    nav: {
      home: "ホーム",
      about: "紹介",
      portfolio: "ポートフォリオ",
      contact: "連絡",
    },
    buttons: {
      getInTouch: "お問い合わせ",
      downloadResume: "履歴書をダウンロード",
      viewAllProjects: "すべてのプロジェクト",
      viewMyWork: "制作物を見る",
      clearFilters: "絞り込みをクリア",
      backToHome: "ホームに戻る",
      viewProject: "プロジェクトを見る",
      liveDemo: "デモ",
      sourceCode: "ソースコード",
    },
    aria: {
      goHome: "{{name}} のホーム",
      viewProject: "プロジェクトを見る: {{title}}",
      openProject: "プロジェクトを開く",
      previousProject: "前のプロジェクト",
      nextProject: "次のプロジェクト",
      goToProject: "プロジェクト {{n}} へ",
      clearSearch: "検索をクリア",
      close: "閉じる",
      prevImage: "前の画像",
      nextImage: "次の画像",
    },
    home: {
      profileAlt: "{{name}} のポートレート",
      heroLine1: "情熱を目的に変えるWeb開発者。",
      heroLine2a: "コーディングは趣味としてだけではなく、",
      heroLine2b: "自分や他者の現実の課題を解決する手段だと思っています。",
      status: "フリーランス案件対応可能",
      stats: {
        yearsProgrammingA: "年",
        yearsProgrammingB: "プログラミング",
        yearsFullstackA: "年",
        yearsFullstackB: "フルスタック集中",
        projectsBuiltA: "件",
        projectsBuiltB: "制作",
      },
      projects: {
        label: "制作実績",
        title: "注目プロジェクト",
        description:
          "スキルと問題解決力を示すために制作したプロジェクトの一部をご紹介します",
      },
      cta: {
        title: "一緒に素晴らしいものを作りましょう",
        description1: "現在、フリーランス案件に対応しています。",
        description2: "プロジェクトの相談でも、気軽な連絡でも大歓迎です。",
      },
    },
    about: {
      hero: {
        title: "私について",
        subtitle:
          "クリーンなコードと丁寧なデザインで、アイデアを洗練されたデジタルソリューションへと形にします。",
      },
      journey: {
        title: "これまでの歩み",
        p1:
          "2018年からプログラミングに情熱を持ち、2022年以降はフルスタックのWeb開発に注力しています。独学で、直感的なUIから堅牢なバックエンド設計まで、Web開発全体の基礎を築いてきました。",
        p2:
          "Webデザインとプログラミングへの関心を活かし、すべてのプロジェクトを細部まで丁寧に仕上げます。期待を超え、クライアントの目的と最新の業界トレンドに沿った成果を届けることを大切にしています。",
        p3:
          "今後もスキルを磨き、新しい挑戦を受け入れながら成長していきます。常に高い品質を追求し、仕事を通じて意味のある価値を生み出すことを目指しています。",
      },
      skills: {
        title: "技術スキル",
        frontend: "フロントエンド",
        backend: "バックエンド",
        dbTools: "データベース・ツール",
      },
      experience: {
        title: "職務経験",
        typeFreelance: "フリーランス",
        typeFulltime: "正社員",
      },
      cta: {
        title: "一緒に働きませんか",
        description1: "現在、フリーランス案件に対応しています。",
        description2: "あなたのビジョンを形にするために協力しましょう。",
      },
      experiences: {
        exp1: {
          title: "フリーランス Webサイト開発",
          company: "個人事業",
          duration: "2023年 - 現在",
          description:
            "さまざまな業界のクライアント向けに、最新技術とベストプラクティスを重視したWebソリューションを開発。",
        },
        exp2: {
          title: "Web・ロボット開発",
          company: "Nakayama Iron Works, Ltd.",
          duration: "2022年3月 - 現在",
          description:
            "産業用ロボットシステム向けに、Webアプリケーションと自動化ソリューションを開発。",
        },
        exp3: {
          title: "フリーランス開発",
          company: "Cakra Motor Company",
          duration: "2021年",
          description:
            "自動車ビジネスの管理と顧客対応を支援するカスタムWebソリューションを制作。",
        },
      },
      stats: {
        yearsProgramming: "プログラミング年数",
        yearsFullstack: "フルスタック年数",
        projectsCompleted: "完了プロジェクト",
        happyClients: "クライアント",
      },
    },
    contact: {
      hero: {
        title: "お問い合わせ",
        subtitle1:
          "プロジェクトの相談や、ちょっとしたご連絡でも大歓迎です。",
        subtitle2: "一緒にアイデアを形にしましょう。",
      },
      info: {
        title: "連絡先",
        description: "以下の方法でお気軽にご連絡ください",
        emailLabel: "メール",
        locationLabel: "所在地",
        followMe: "フォロー",
      },
      form: {
        title: "メッセージを送る",
        description: "下のフォームに入力してください。できるだけ早く返信します。",
        nameLabel: "お名前",
        emailLabel: "メール",
        messageLabel: "内容",
        required: "必須",
        namePlaceholder: "お名前",
        emailPlaceholder: "example@example.com",
        messagePlaceholder: "ご相談内容を教えてください...",
        sending: "送信中...",
        sendMessage: "送信",
      },
      validation: {
        nameRequired: "お名前は必須です",
        emailRequired: "メールは必須です",
        emailInvalid: "有効なメールアドレスを入力してください",
        messageRequired: "内容は必須です",
        spamDetected: "スパム検知",
      },
      status: {
        success:
          "ありがとうございます。メッセージを送信しました。できるだけ早くご返信します。",
        spam: "スパムが検知されました。もう一度お試しください。",
        fail:
          "送信に失敗しました。もう一度お試しいただくか、メールで直接ご連絡ください。",
      },
    },
    portfolio: {
      hero: {
        title: "ポートフォリオ",
        subtitle:
          "さまざまな業界・技術で制作した、洗練されたデジタルソリューションをご覧ください。",
      },
      searchPlaceholder: "名前・技術・役割で検索...",
      stats: {
        totalProjects: "総プロジェクト",
        categories: "カテゴリ",
        showing: "表示中",
      },
      filterAll: "すべて",
      noResults: {
        title: "プロジェクトが見つかりません",
        description: "検索キーワードやフィルターを調整してみてください。",
      },
      cta: {
        title: "一緒に取り組みませんか",
        description: "あなたのプロジェクトを形にするお手伝いができます。",
      },
    },
    project: {
      notFound: {
        title: "プロジェクトが見つかりません",
        description: "お探しのプロジェクトは存在しません。",
      },
      backToHome: "ホームに戻る",
      clickToExpand: "クリックで拡大",
      meta: {
        role: "役割",
        client: "クライアント",
        date: "日付",
      },
      sidebar: {
        details: "詳細",
        techStack: "技術スタック",
        links: "リンク",
      },
      sections: {
        overview: "概要",
        keyFeatures: "主な機能",
        mission: "目的",
        impact: "効果",
        gallery: "ギャラリー",
        similar: "関連プロジェクト",
      },
    },
  },
};
