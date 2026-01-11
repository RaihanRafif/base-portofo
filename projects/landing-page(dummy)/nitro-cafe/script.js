// Nitro landing page (mature) — EN default + language toggle (EN/ID)
(function(){
  const LANG_KEY = "nitro_lang";
  const supported = ["en","id"];

  const i18n = {
    en: {
      nav_ritual: "Ritual",
      nav_space: "Space",
      nav_menu: "Menu",
      nav_reviews: "Reviews",
      nav_location: "Location",
      nav_cta: "Get directions",
      lang_label: "Language",

      hero_kicker: "work-friendly specialty coffee pit stop",
      hero_title: "Serious coffee, calm space, and brunch that actually delivers.",
      hero_sub: "Nitro Coffee @Ciranjang is an industrial-warm spot for meetings, focused work, or a slow morning. Not a loud content playground. A café that helps you get things done.",
      hero_cta_primary: "See menu",
      hero_cta_secondary: "View the space",
      chip_wifi: "Wi‑Fi",
      chip_outdoor: "Outdoor seating",
      chip_takeaway: "Takeaway",
      chip_smoking: "Smoking area",
      chip_open_label: "Status:",
      chip_open_now: "Open now",
      chip_closed_now: "Closed now",
      hours_note: "*Hours shown here are a practical default. Please confirm the latest hours on Google Maps before publishing.",
      meta_address_k: "Address",
      meta_phone_k: "Phone",

      panel_caption: "Signature: the blue brick façade + outdoor seating, perfect for a quick reset between meetings.",
      panel_badge: "Niche: WFC & meeting-friendly",
      panel_body: "Clean layout, warm lighting, and a calm productivity vibe.",

      ritual_title: "Three Nitro rituals (for people with calendars)",
      ritual_sub: "Niche concept: coffee as a work ritual, not a prop.",
      ritual_1_badge: "07:00–10:30",
      ritual_1_title: "Morning Focus",
      ritual_1_desc: "Espresso or a magic latte with pastry. Start slow, stay sharp.",
      ritual_2_badge: "11:00–15:00",
      ritual_2_title: "Midday Reset",
      ritual_2_desc: "Brunch with intent. French toast, pancakes, or a solid main.",
      ritual_3_badge: "16:00–21:00",
      ritual_3_title: "Late Recharge",
      ritual_3_desc: "Iced coffee or chai plus a snack. Ideal for wrap-ups and catch-ups.",

      why_title: "Why this place works for work",
      why_sub: "A few practical reasons people keep coming back.",
      why_1_title: "Layout that stays functional",
      why_1_desc: "Communal tables and a center counter. Easy to settle in without chaos.",
      why_2_title: "Warm lighting, less fatigue",
      why_2_desc: "Tungsten warmth feels calmer than harsh white lighting.",
      why_3_title: "Quick in, quick out",
      why_3_desc: "Takeaway-friendly when you only need caffeine and momentum.",

      space_title: "A space built for getting things done",
      space_sub: "Industrial-warm: wood, exposed brick, and tiled counter texture.",
      space_caption: "Communal tables + a central bar. Warm tones and clean lines.",
      amenities_badge: "Amenities",
      amenity_1_title: "Wi‑Fi & quick meetings",
      amenity_1_desc: "A tidy space that doesn’t fight your agenda.",
      amenity_2_title: "Outdoor seating",
      amenity_2_desc: "A short reset without changing location.",
      amenity_3_title: "Warm lighting",
      amenity_3_desc: "Doesn’t feel like an office, still stays focused.",
      amenity_4_title: "Takeaway",
      amenity_4_desc: "For the days you’re in motion.",
      vibe_badge: "Atmosphere notes",
      vibe_quote: "“Calm productivity.”",
      vibe_desc: "It fits the Senopati/SCBD crowd: a warm, quiet café that stays practical, not performative.",
      vibe_li_1: "Materials: wood-forward, exposed brick, tiled counter texture",
      vibe_li_2: "Palette: warm beige, charcoal, coffee brown, blue accents",
      vibe_li_3: "Layout: clean horizontal lines, perfect for grid-based design",
      vibe_media_caption: "Close-ups of coffee + pastry work great for your menu section.",

      menu_title: "Menu preview",
      menu_sub: "Items here are common highlights (names may vary). Add your official prices.",
      menu_bucket_1: "Espresso & coffee",
      menu_bucket_2: "Iced & non-coffee",
      menu_bucket_3: "Brunch & mains",
      menu_bucket_4: "Pastry & sweets",
      price_hint: "Rp ••",
      cta_order: "Call / order",
      cta_back: "Back to top",
      menu_note: "For a public site, use your official menu (with permission) or rewrite the list from the source-of-truth.",

      reviews_title: "Review snapshot",
      reviews_sub: "Safe paraphrases (not 1:1 quotes).",
      rev_1: "“Great for working. Cozy, not chaotic.”",
      rev_2: "“Consistent coffee, and the food holds up.”",
      rev_3: "“Warm lighting and a layout that fits quick meetings.”",
      rev_who: "Guest (paraphrase)",

      loc_title: "Location & hours",
      loc_sub: "Address + map embed (query-based).",
      loc_name: "NITRO COFFEE @Ciranjang",
      hours_k: "Hours (temporary)",
      hours_v: "07:00–21:00 daily (confirm on Maps)",
      phone_k: "Phone",
      phone_desc: "For ordering or availability",
      maps_open: "Open in Google Maps",
      maps_note: "For production, use the official Google Maps embed (Place ID / API) and confirmed hours.",

      faq_title: "FAQ (because humans always ask)",
      faq_1_q: "Is it good for working?",
      faq_1_a: "The vibe is generally work-friendly. If you need absolute silence, come earlier in the morning.",
      faq_2_q: "Do you have outdoor seating?",
      faq_2_a: "Outdoor seating is commonly listed. Availability can change, so check on-site.",
      faq_3_q: "What should I order first?",
      faq_3_a: "Try a magic latte (or your espresso preference) and pair it with a pastry. For brunch, go with French toast or pancakes.",

      footer_desc: "Industrial-warm café for meetings, focused work, and brunch.",
      footer_notes_title: "Implementation notes",
      footer_note_1: "Add reference photos to assets/images/ (see README).",
      footer_note_2: "Confirm the latest opening hours on Google Maps.",
      footer_note_3: "Publish only photos you own or have permission to use.",
      copyright: "Demo landing page for design work."
    },
    id: {
      nav_ritual: "Ritual",
      nav_space: "Suasana",
      nav_menu: "Menu",
      nav_reviews: "Ulasan",
      nav_location: "Lokasi",
      nav_cta: "Dapatkan arah",
      lang_label: "Bahasa",

      hero_kicker: "specialty coffee yang ramah kerja & meeting",
      hero_title: "Kopi serius, ruang tenang, dan brunch yang benar-benar niat.",
      hero_sub: "Nitro Coffee @Ciranjang adalah tempat industrial-warm untuk meeting, fokus kerja, atau slow morning. Bukan cafe berisik untuk konten. Ini cafe yang bantu kamu selesai kerja.",
      hero_cta_primary: "Lihat menu",
      hero_cta_secondary: "Lihat suasana",
      chip_wifi: "Wi‑Fi",
      chip_outdoor: "Outdoor seating",
      chip_takeaway: "Takeaway",
      chip_smoking: "Smoking area",
      chip_open_label: "Status:",
      chip_open_now: "Buka sekarang",
      chip_closed_now: "Tutup sekarang",
      hours_note: "*Jam di sini adalah default praktis. Tolong cek jam terbaru di Google Maps sebelum publish.",
      meta_address_k: "Alamat",
      meta_phone_k: "Telepon",

      panel_caption: "Signature: fasad bata biru + outdoor seating, cocok buat quick reset di sela meeting.",
      panel_badge: "Niche: WFC & meeting-friendly",
      panel_body: "Layout rapi, lighting hangat, dan vibe “calm productivity”.",

      ritual_title: "3 ritual Nitro (buat manusia yang punya kalender)",
      ritual_sub: "Konsep niche: kopi sebagai ritual kerja, bukan properti.",
      ritual_1_badge: "07:00–10:30",
      ritual_1_title: "Morning Focus",
      ritual_1_desc: "Espresso atau magic latte + pastry. Pelan tapi tetap tajam.",
      ritual_2_badge: "11:00–15:00",
      ritual_2_title: "Midday Reset",
      ritual_2_desc: "Brunch yang niat. French toast, pancakes, atau main course.",
      ritual_3_badge: "16:00–21:00",
      ritual_3_title: "Late Recharge",
      ritual_3_desc: "Iced coffee atau chai + snack. Buat wrap-up dan catch-up.",

      why_title: "Kenapa tempat ini enak buat kerja",
      why_sub: "Alasan praktis kenapa orang balik lagi.",
      why_1_title: "Layout tetap fungsional",
      why_1_desc: "Meja komunal dan counter tengah. Mudah settle tanpa chaos.",
      why_2_title: "Lighting hangat, lebih nyaman",
      why_2_desc: "Tone hangat biasanya lebih calm dibanding putih tajam.",
      why_3_title: "Cepat takeaway",
      why_3_desc: "Kalau kamu cuma butuh kafein dan momentum.",

      space_title: "Space yang dibuat untuk ‘selesaiin urusan’",
      space_sub: "Industrial-warm: kayu, bata ekspos, dan tekstur tile di counter.",
      space_caption: "Meja komunal + bar tengah. Tone hangat, garis bersih.",
      amenities_badge: "Fasilitas",
      amenity_1_title: "Wi‑Fi & quick meetings",
      amenity_1_desc: "Ruang rapi yang tidak melawan agenda kamu.",
      amenity_2_title: "Outdoor seating",
      amenity_2_desc: "Reset sebentar tanpa pindah lokasi.",
      amenity_3_title: "Warm lighting",
      amenity_3_desc: "Tidak terasa kantor, tapi tetap fokus.",
      amenity_4_title: "Takeaway",
      amenity_4_desc: "Untuk hari-hari yang serba cepat.",
      vibe_badge: "Catatan suasana",
      vibe_quote: "“Calm productivity.”",
      vibe_desc: "Cocok untuk crowd Senopati/SCBD: hangat, relatif tenang, tetap praktis.",
      vibe_li_1: "Material: kayu dominan, bata ekspos, tekstur tile di counter",
      vibe_li_2: "Palet: beige hangat, charcoal, coffee brown, aksen biru",
      vibe_li_3: "Layout: banyak garis horizontal, cocok untuk desain grid",
      vibe_media_caption: "Close-up kopi + pastry enak untuk section menu highlight.",

      menu_title: "Menu preview",
      menu_sub: "Item di sini sering disebut (nama bisa bervariasi). Harga isi sesuai menu resmi.",
      menu_bucket_1: "Espresso & coffee",
      menu_bucket_2: "Iced & non-coffee",
      menu_bucket_3: "Brunch & mains",
      menu_bucket_4: "Pastry & sweets",
      price_hint: "Rp ••",
      cta_order: "Hubungi / order",
      cta_back: "Kembali ke atas",
      menu_note: "Untuk site publik, pakai menu resmi (dengan izin) atau ketik ulang dari sumber resmi.",

      reviews_title: "Snapshot ulasan",
      reviews_sub: "Parafrase aman (bukan kutipan 1:1).",
      rev_1: "“Enak buat kerja. Cozy dan tidak chaos.”",
      rev_2: "“Kopinya konsisten, makanannya juga niat.”",
      rev_3: "“Lighting hangat dan layoutnya cocok buat meeting singkat.”",
      rev_who: "Tamu (parafrase)",

      loc_title: "Lokasi & jam",
      loc_sub: "Alamat + map embed (berbasis query).",
      loc_name: "NITRO COFFEE @Ciranjang",
      hours_k: "Jam (sementara)",
      hours_v: "07:00–21:00 setiap hari (cek di Maps)",
      phone_k: "Telepon",
      phone_desc: "Untuk order / tanya ketersediaan",
      maps_open: "Buka di Google Maps",
      maps_note: "Untuk produksi, pakai embed resmi Google Maps (Place ID/API) dan jam yang sudah dikonfirmasi.",

      faq_title: "FAQ (karena manusia selalu nanya)",
      faq_1_q: "Cocok buat kerja?",
      faq_1_a: "Umumnya work-friendly. Kalau butuh super hening, datang lebih pagi.",
      faq_2_q: "Ada outdoor seating?",
      faq_2_a: "Outdoor seating sering tertera di listing. Ketersediaan bisa berubah, cek on-site.",
      faq_3_q: "Rekomendasi order pertama?",
      faq_3_a: "Coba magic latte (atau espresso favoritmu) + pastry. Untuk brunch: French toast atau pancakes.",

      footer_desc: "Cafe industrial-warm untuk meeting, fokus kerja, dan brunch.",
      footer_notes_title: "Catatan implementasi",
      footer_note_1: "Isi foto ke assets/images/ (lihat README).",
      footer_note_2: "Konfirmasi jam operasional terbaru di Google Maps.",
      footer_note_3: "Publish hanya foto milik sendiri atau sudah ada izin.",
      copyright: "Demo landing page untuk tugas/desain."
    }
  };

  function getLang(){
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && supported.includes(saved)) return saved;
    return "en";
  }

  function setPressed(lang){
    document.querySelectorAll('[data-lang-btn]').forEach(btn=>{
      const v = btn.getAttribute('data-lang-btn');
      btn.setAttribute('aria-pressed', v === lang ? 'true' : 'false');
    });
  }

  function applyLang(lang){
    const dict = i18n[lang] || i18n.en;
    document.documentElement.setAttribute("lang", lang === "id" ? "id" : "en");
    setPressed(lang);

    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const val = dict[key];
      if (val === undefined) return;
      el.textContent = val;
    });

    updateOpenStatus(lang);
  }

  // Hours vary across sources; keep pragmatic default:
  // 07:00–21:00 daily. Confirm on Google Maps for production.
  const HOURS = { open: 7, close: 21 };

  function isOpenNow(){
    const now = new Date();
    const h = now.getHours();
    return (h >= HOURS.open && h < HOURS.close);
  }

  function updateOpenStatus(lang){
    const dict = i18n[lang] || i18n.en;
    const open = isOpenNow();
    document.querySelectorAll('[data-open-status]').forEach(el=>{
      el.textContent = open ? dict.chip_open_now : dict.chip_closed_now;
      el.style.background = open ? "rgba(112,64,48,.12)" : "rgba(69,81,97,.10)";
    });
  }

  function imageFallback(){
    document.querySelectorAll("img[data-fallback]").forEach(img=>{
      img.addEventListener("error", function(){
        img.src = "assets/images/placeholder.svg";
      }, { once:true });
    });
  }

  function initLang(){
    const current = getLang();
    applyLang(current);

    document.querySelectorAll('[data-lang-btn]').forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const lang = btn.getAttribute("data-lang-btn");
        if (!supported.includes(lang)) return;
        localStorage.setItem(LANG_KEY, lang);
        applyLang(lang);
      });
    });
  }

  function initYear(){
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  initLang();
  initYear();
  imageFallback();
})();



// Mobile menu toggle (v2)
(function(){
  const btn = document.querySelector(".nav-toggle");
  const menu = document.querySelector("[data-nav-menu]");
  if (!btn || !menu) return;

  function setOpen(open){
    menu.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  btn.addEventListener("click", ()=>{
    const open = !menu.classList.contains("is-open");
    setOpen(open);
  });

  // Close when clicking a link
  menu.querySelectorAll("a[href^='#']").forEach(a=>{
    a.addEventListener("click", ()=> setOpen(false));
  });

  // Close on outside click
  document.addEventListener("click", (e)=>{
    if (!menu.classList.contains("is-open")) return;
    const t = e.target;
    if (menu.contains(t) || btn.contains(t)) return;
    setOpen(false);
  });

  // Close on Escape
  document.addEventListener("keydown", (e)=>{
    if (e.key === "Escape") setOpen(false);
  });
})();
