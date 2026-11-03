
document.addEventListener("DOMContentLoaded", () => {

  // منوی موبایل
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    // بستن منو بعد از انتخاب لینک
    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";

      });

    });

  }

  // فعال کردن لینک بخش فعلی
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav a");

  function updateActiveLink() {

    let current = "home";

    sections.forEach(section => {

      const top = section.getBoundingClientRect().top;

      if (top <= 150) {
        current = section.id;
      }

    });

    navLinks.forEach(link => {

      const isActive = link.getAttribute("href") === "#" + current;

      link.classList.toggle("active", isActive);

    });

  }

  window.addEventListener("scroll", updateActiveLink, {
    passive: true
  });

  updateActiveLink();

  // فرم پیشنهادها
  const form = document.getElementById("suggestionForm");
  const textarea = document.getElementById("suggestion");
  const status = document.getElementById("formStatus");

  if (form && textarea && status) {

    form.addEventListener("submit", async (event) => {

      event.preventDefault();

      const message = textarea.value.trim();

      if (!message) {
        status.textContent = "لطفاً ابتدا پیشنهاد خود را بنویسید.";
        status.style.color = "#d44a4a";
        return;
      }

      const finalText =
        "پیشنهاد برای شورای دانش‌آموزی مدرسه شهید رضایی\n\n" +
        message +
        "\n\nارسال‌کننده: دانش‌آموز مدرسه";

      try {

        if (navigator.clipboard && window.isSecureContext) {

          await navigator.clipboard.writeText(finalText);

        } else {

          const temp = document.createElement("textarea");
          temp.value = finalText;
          temp.style.position = "fixed";
          temp.style.opacity = "0";

          document.body.appendChild(temp);
          temp.select();

          const copied = document.execCommand("copy");
          temp.remove();

          if (!copied) {
            throw new Error("Copy failed");
          }

        }

        status.textContent =
          "پیشنهاد کپی شد! حالا می‌توانی آن را برای مسئول مربوطه بفرستی.";

        status.style.color = "#16875a";

      } catch (error) {

        status.textContent =
          "کپی خودکار انجام نشد؛ لطفاً متن را دستی کپی کن.";

        status.style.color = "#d44a4a";

      }

    });

  }

});
