const texts = [
  "Full-Stack Engineer ",
  "MERN-Stack Developer ",
  "Front-End Developer "
];

let index = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = texts[index];
  const display = currentText.substring(0, charIndex);
  document.getElementById("typing").innerHTML = display;

  if (!isDeleting && charIndex < currentText.length) {
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
  }

  if (charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500); // pause at full text
    return;
  } else if (charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % texts.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

function openMenu() {
  document.getElementById("sidebar").classList.add("active");
   document.getElementById("overlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  document.getElementById("sidebar").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
  document.body.style.overflow = "";
}

// Close sidebar when clicking outside
document.addEventListener("click", function (e) {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  if (
    sidebar.classList.contains("active") &&
    !sidebar.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    closeMenu();
  }
});


// Initialize EmailJS with your public key
(function () {
  emailjs.init("w3IopA_R4yiAJ2y5z");
})();

const contactForm = document.getElementById("contactForm");
const sendBtn = contactForm.querySelector(".btn-send");
const sendBtnDefaultHTML = sendBtn.innerHTML;

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // basic guard: required fields empty check (native "required" already
  // blocks submit, but this covers programmatic submits too)
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const subject = contactForm.subject.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !subject || !message) {
    showToast("Please fill in all fields.", "error");
    return;
  }

  // loading state
  sendBtn.disabled = true;
  sendBtn.innerHTML = "Sending...";

  emailjs
    .sendForm("service_enwm0zm", "template_osklk74", contactForm)
    .then(() => {
      showToast("Message sent successfully!", "success");
      contactForm.reset();
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      showToast("Something went wrong. Please try again.", "error");
    })
    .finally(() => {
      sendBtn.disabled = false;
      sendBtn.innerHTML = sendBtnDefaultHTML;
    });
});

// Simple toast notification
function showToast(text, type) {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = text;
  document.body.appendChild(toast);

  // trigger animation
  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}