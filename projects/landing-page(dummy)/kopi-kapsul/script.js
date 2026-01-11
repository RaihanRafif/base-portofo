// Small JS, big dreams.
(() => {
  const $ = (sel, parent = document) => parent.querySelector(sel);
  const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

  // Year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky header style on scroll
  const header = $(".header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 6);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  const navToggle = $("#navToggle");
  const nav = $("#nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
    });

    // Close nav on link click (mobile)
    $$("#nav a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Buka menu");
      });
    });

    // Close nav on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Buka menu");
      }
    });
  }

  // Reveal on scroll
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.14 }
    );
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("is-visible"));
  }

  // FAQ icon toggle
  $$(".faq__item").forEach(item => {
    item.addEventListener("toggle", () => {
      const icon = item.querySelector(".faq__icon");
      const expanded = item.open;
      if (icon) icon.textContent = expanded ? "–" : "+";
    });
  });

  // Contact form (langsung buka WhatsApp, tanpa backend)
  const form = $("#contactForm");
  const status = $("#formStatus");

  const setError = (name, msg) => {
    const field = form?.elements?.[name];
    const el = document.querySelector(`[data-error-for="${name}"]`);
    if (el) el.textContent = msg || "";
    if (field) {
      if (msg) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    }
  };

  const isPhoneLike = (val) => {
    const cleaned = String(val || "").replace(/[^\d+]/g, "");
    return cleaned.length >= 9;
  };

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.elements["name"].value.trim();
      const phone = form.elements["phone"].value.trim();
      const message = form.elements["message"].value.trim();

      let ok = true;

      setError("name", "");
      setError("phone", "");
      setError("message", "");

      if (!name) {
        setError("name", "Nama wajib diisi.");
        ok = false;
      }
      if (!phone || !isPhoneLike(phone)) {
        setError("phone", "Masukkan nomor WhatsApp yang valid.");
        ok = false;
      }
      if (!message) {
        setError("message", "Pesan wajib diisi.");
        ok = false;
      }

      if (!ok) {
        if (status) status.textContent = "Cek lagi inputnya ya.";
        return;
      }

      const waNumber = "628112541112"; // ganti sesuai nomor bisnis
      const text = encodeURIComponent(`Halo Sapulu Coffee, saya ${name} (${phone}). ${message}`);

      if (status) status.textContent = "Membuka WhatsApp…";

      // Buka WhatsApp (WA Web di desktop, WA app di mobile)
      window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank", "noopener,noreferrer");

      form.reset();
      setTimeout(() => { if (status) status.textContent = ""; }, 4000);
    });
  }
})();
