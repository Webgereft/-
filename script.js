
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// باز و بسته کردن منوی موبایل
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const isOpen = navLinks.classList.contains("active");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// بستن منو پس از انتخاب بخش
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// بستن منو با کلیک بیرون از آن
document.addEventListener("click", event => {
  if (
    !navLinks.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

// اسکرول نرم
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(
      link.getAttribute("href")
    );

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});
