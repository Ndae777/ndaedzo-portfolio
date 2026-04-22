// script.js — Ndaedzo Nkhumeleni Portfolio

// footer year
var yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// navbar shadow on scroll
var navbar = document.getElementById('main_nav');

window.addEventListener('scroll', function() {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// highlight active nav link based on which section is in view
var sections = document.querySelectorAll('div[id], section[id]');
var navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    var current = '';

    sections.forEach(function(section) {
        var top = section.offsetTop - 100;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// close mobile menu when a nav link is clicked
var navMenu = document.getElementById('navMenu');
var allLinks = document.querySelectorAll('#navMenu .nav-link');

allLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        if (navMenu.classList.contains('show')) {
            var bsCollapse = bootstrap.Collapse.getInstance(navMenu);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });
});
