// script.js — Ndaedzo Nkhumeleni Portfolio

// tells the css that javascript is running, so the scroll animations can start hidden
document.body.classList.add("js_on");

// true if the person turned off animations in their device settings
var reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// footer year
var yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// typing animation in the hero
var typedEl = document.getElementById("typed_text");
var phrases = [
  "systems for public clinics.",
  "web platforms for non-profits.",
  "React + TypeScript front ends.",
  "Python, C# and SQL backends.",
];
var phraseIndex = 0;
var charIndex = phrases[0].length; // the first phrase is already in the html
var deleting = true;

function typeLoop() {
  var current = phrases[phraseIndex];

  if (deleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedEl.textContent = current.substring(0, charIndex);

  var speed = deleting ? 35 : 70;

  if (!deleting && charIndex === current.length) {
    // finished typing, wait a bit then start deleting
    deleting = true;
    speed = 1800;
  } else if (deleting && charIndex === 0) {
    // finished deleting, go to the next phrase
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 300;
  }

  setTimeout(typeLoop, speed);
}

if (typedEl && !reduceMotion) {
  setTimeout(typeLoop, 2400);
}

// everything that happens when you scroll
var navbar = document.getElementById("main_nav");
var backTop = document.getElementById("back_top");
var sections = document.querySelectorAll("section[id]");
var navLinks = document.querySelectorAll("#navMenu .nav-link");
var revealEls = document.querySelectorAll(".reveal");

function onScroll() {
  var y = window.scrollY;

  // navbar gets smaller with a border once you scroll
  if (y > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // back to top button
  if (y > 600) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }

  // highlight the nav link for the section you're looking at
  var current = "";

  sections.forEach(function (section) {
    if (y >= section.offsetTop - 120) {
      current = section.getAttribute("id");
    }
  });

  // at the very bottom of the page, highlight the last section (contact)
  if (window.innerHeight + y >= document.body.scrollHeight - 2) {
    current = sections[sections.length - 1].getAttribute("id");
  }

  navLinks.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  // fade things in when they come onto the screen
  revealEls.forEach(function (el) {
    if (el.classList.contains("show")) {
      return;
    }

    var top = el.getBoundingClientRect().top;

    if (top < window.innerHeight - 60) {
      el.classList.add("show");

      // if there are distinction bars inside, fill them up
      var bars = el.querySelectorAll(".mark_fill");
      bars.forEach(function (bar) {
        bar.style.width = bar.getAttribute("data-mark") + "%";
      });
    }
  });
}

window.addEventListener("scroll", onScroll);
window.addEventListener("resize", onScroll);
onScroll(); // run once on load for anything already on screen

// close mobile menu when a nav link is clicked
var navMenu = document.getElementById("navMenu");
var menuLinks = document.querySelectorAll("#navMenu a");

menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (navMenu.classList.contains("show")) {
      var bsCollapse = bootstrap.Collapse.getInstance(navMenu);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }
  });
});

// copy email button in the contact section
var copyBtn = document.getElementById("copy_btn");
var copyIcon = document.getElementById("copy_icon");
var copyText = document.getElementById("copy_text");
var email = "nkhumelenindae777@gmail.com";

copyBtn.addEventListener("click", function () {
  // older browsers don't have the clipboard api, so just open the email app
  if (!navigator.clipboard) {
    window.location.href = "mailto:" + email;
    return;
  }

  navigator.clipboard
    .writeText(email)
    .then(function () {
      copyBtn.classList.add("copied");
      copyIcon.className = "bi bi-check2";
      copyText.textContent = "Copied";

      // put the button back to normal after 2 seconds
      setTimeout(function () {
        copyBtn.classList.remove("copied");
        copyIcon.className = "bi bi-clipboard";
        copyText.textContent = "Copy";
      }, 2000);
    })
    .catch(function () {
      window.location.href = "mailto:" + email;
    });
});
