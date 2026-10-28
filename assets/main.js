(function () {
  "use strict";
  var BREAKPOINT = 768;
  var root = document.documentElement;
  root.classList.add("js");

  /* Mobile drawer */
  var drawer = document.querySelector(".mob-drawer");
  var overlay = document.querySelector(".mob-overlay");
  var menuBtn = document.querySelector(".menu-btn");
  var closeBtn = document.querySelector(".mob-close");

  function openDrawer() {
    if (!drawer) { return; }
    drawer.classList.add("open");
    overlay.classList.add("open");
    menuBtn.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    root.style.overflow = "hidden";
    if (closeBtn) { closeBtn.focus(); }
  }
  function closeDrawer() {
    if (!drawer) { return; }
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    root.style.overflow = "";
  }
  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", openDrawer);
    if (closeBtn) { closeBtn.addEventListener("click", closeDrawer); }
    if (overlay) { overlay.addEventListener("click", closeDrawer); }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeDrawer(); }
    });
    var links = drawer.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", closeDrawer);
    }
    if (window.matchMedia) {
      var mq = window.matchMedia("(min-width:" + (BREAKPOINT + 1) + "px)");
      var onChange = function (ev) { if (ev.matches) { closeDrawer(); } };
      if (mq.addEventListener) { mq.addEventListener("change", onChange); }
      else if (mq.addListener) { mq.addListener(onChange); }
    }
  }

  /* Desktop dropdowns: keyboard and touch support */
  var dropButtons = document.querySelectorAll(".nav-links button.navlink");
  for (var d = 0; d < dropButtons.length; d++) {
    dropButtons[d].addEventListener("click", function (e) {
      var li = e.currentTarget.parentNode;
      var isOpen = li.classList.contains("open");
      var all = document.querySelectorAll(".nav-links li.open");
      for (var k = 0; k < all.length; k++) { all[k].classList.remove("open"); }
      if (!isOpen) { li.classList.add("open"); }
      e.currentTarget.setAttribute("aria-expanded", String(!isOpen));
    });
  }
  document.addEventListener("click", function (e) {
    if (!e.target.closest || e.target.closest(".nav-links")) { return; }
    var all = document.querySelectorAll(".nav-links li.open");
    for (var k = 0; k < all.length; k++) { all[k].classList.remove("open"); }
  });

  /* FAQ accordion (max-height toggle) */
  var faqButtons = document.querySelectorAll(".faq-q");
  for (var f = 0; f < faqButtons.length; f++) {
    faqButtons[f].addEventListener("click", function (e) {
      var btn = e.currentTarget;
      var item = btn.parentNode;
      var panel = item.querySelector(".faq-a");
      var open = item.classList.contains("open");
      if (open) {
        item.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = "0px";
      } else {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + 40 + "px";
      }
    });
  }

  /* Floating call button hides when the footer is in view */
  var floatBtn = document.querySelector(".floatcall");
  var footer = document.querySelector(".site-footer");
  if (floatBtn && footer && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { floatBtn.classList.add("hide"); }
        else { floatBtn.classList.remove("hide"); }
      });
    });
    io.observe(footer);
  }
})();
