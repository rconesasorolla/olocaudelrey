/*
 * Comportamiento de la web de Olocau del Rey.
 * Sustituye al script.js de la plantilla: solo hace lo que la web usa, sin jQuery.
 */
(function () {
    'use strict';

    // Fondos indicados con data-background="ruta/imagen.jpg"
    function backgrounds() {
        document.querySelectorAll('[data-background]').forEach(function (el) {
            el.style.backgroundImage = 'url(' + el.getAttribute('data-background') + ')';
        });
    }

    // Cabecera fija y botón de volver arriba a partir de 245 px de scroll
    function scrollState() {
        var header = document.getElementById('sticky-header');
        var toTop = document.querySelector('.scroll-to-target');
        var update = function () {
            var scrolled = window.scrollY >= 245;
            if (header) header.classList.toggle('sticky-menu', scrolled);
            if (toTop) toTop.classList.toggle('open', scrolled);
        };
        window.addEventListener('scroll', update, { passive: true });
        update();

        if (toTop) {
            toTop.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // Menú móvil: copia el menú principal y despliega los submenús con el botón "+"
    function mobileMenu() {
        var outer = document.querySelector('.tgmobile__menu .tgmobile__menu-outer');
        var main = document.querySelector('.tgmenu__wrap .tgmenu__main-menu');
        if (!outer || !main) return;

        outer.innerHTML = main.innerHTML;

        outer.querySelectorAll('li.menu-item-has-children .dropdown-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var submenu = btn.previousElementSibling;
                var open = btn.classList.toggle('open');
                if (submenu) submenu.style.display = open ? 'block' : 'none';
            });
        });

        var body = document.body;
        document.querySelectorAll('.mobile-nav-toggler').forEach(function (el) {
            el.addEventListener('click', function () { body.classList.add('mobile-menu-visible'); });
        });
        document.querySelectorAll('.tgmobile__menu-backdrop, .tgmobile__menu .close-btn').forEach(function (el) {
            el.addEventListener('click', function () { body.classList.remove('mobile-menu-visible'); });
        });
    }

    // Carruseles (Swiper)
    function sliders() {
        if (typeof Swiper === 'undefined') return;

        // Portada: secciones de la web
        if (document.querySelector('.blessed-sermon-slider-one')) {
            new Swiper('.blessed-sermon-slider-one', {
                spaceBetween: 30,
                slidesPerView: 1,
                loop: true,
                speed: 1000,
                autoplay: { delay: 10000 },
                pagination: { el: '.blessed-sermon-slider-one-pagination', type: 'bullets', clickable: true },
                navigation: { nextEl: '.swiper-button-next-animate', prevEl: '.swiper-button-prev-animate' },
                breakpoints: {
                    575: { slidesPerView: 2 },
                    1024: { slidesPerView: 2.4 },
                    1199: { slidesPerView: 3 },
                },
            });
        }

        // Olcaf: fotos del castillo
        if (document.querySelector('.blessed-pastor-slider')) {
            new Swiper('.blessed-pastor-slider', {
                spaceBetween: 30,
                slidesPerView: 1,
                loop: true,
                speed: 1000,
                autoplay: { delay: 10000 },
                pagination: { el: '.blessed-pastor-slider-pagination', type: 'bullets', clickable: true },
                navigation: { nextEl: '.swiper-button-next-3', prevEl: '.swiper-button-prev-3' },
                breakpoints: {
                    600: { slidesPerView: 2 },
                    1199: { slidesPerView: 3 },
                },
            });
        }

        // Cómo llegar: mapas
        if (document.querySelector('.swiper-1-items')) {
            new Swiper('.swiper-1-items', {
                spaceBetween: 0,
                slidesPerView: 1,
                loop: true,
                speed: 1000,
                autoplay: { delay: 10000 },
                navigation: { nextEl: '.swiper-button-next-1', prevEl: '.swiper-button-prev-1' },
            });
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        backgrounds();
        scrollState();
        mobileMenu();
        sliders();
        if (typeof feather !== 'undefined') feather.replace();
    });
})();
