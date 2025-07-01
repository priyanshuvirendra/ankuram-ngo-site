// GLOBAL VARIABLES for Lightbox Navigation
let currentIndex = 0;
let galleryImages = [];

// DOM READY
document.addEventListener("DOMContentLoaded", function () {
  // 🌐 Tab switching functionality
  const tabButtons = document.querySelectorAll(".tabs button");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Show/hide tab content
      const targetId = btn.dataset.target;
      const allContents = document.querySelectorAll(".tab-content");
      allContents.forEach(c => c.style.display = "none");
      document.getElementById(targetId).style.display = "block";
    });
  });

  // 📱 Mobile nav toggle close when clicking outside
  document.addEventListener("click", function (e) {
    const nav = document.getElementById("navLinks");
    const hamburger = document.querySelector(".hamburger");

    if (
      nav.classList.contains("show") &&
      !nav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      nav.classList.remove("show");
    }
  });

  // 📱 Close menu when nav link is clicked
  const navLinks = document.querySelectorAll("#navLinks li a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("navLinks");
      if (nav.classList.contains("show")) {
        nav.classList.remove("show");
      }
    });
  });

  // 🖼️ Load More Images
  const loadBtn = document.getElementById("loadMoreBtn");
  const galleryImgs = document.querySelectorAll(".gallery-img");
  galleryImages = Array.from(galleryImgs); // Assign to global variable
  let shownCount = 12;

  if (loadBtn) {
    loadBtn.addEventListener("click", () => {
      let count = 0;
      galleryImages.forEach((img) => {
        if (img.style.display === "none" && count < 12) {
          img.style.display = "block";
          count++;
        }
      });

      shownCount += count;
      if (shownCount >= galleryImages.length) {
        loadBtn.style.display = "none";
      }
    });
  }

  // 💡 Lightbox Open on Click
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      openLightbox(galleryImages[currentIndex].src);
    });
  });
});

// 🍔 Toggle mobile navbar
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("show");
}

// 🧯 Close Lightbox
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// 🔍 Open Lightbox
function openLightbox(src) {
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox-img").src = src;
}

// ◀ Show Previous Image
function prevImage() {
  if (currentIndex > 0) {
    currentIndex--;
    document.getElementById("lightbox-img").src = galleryImages[currentIndex].src;
  }
}

// ▶ Show Next Image
function nextImage() {
  if (currentIndex < galleryImages.length - 1) {
    currentIndex++;
    document.getElementById("lightbox-img").src = galleryImages[currentIndex].src;
  }
}
