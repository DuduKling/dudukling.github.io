"use strict";

/* jshint esversion: 6 */
// Polyfill to ForEach.
(function () {
  if (typeof NodeList.prototype.forEach === "function") return false;
  NodeList.prototype.forEach = Array.prototype.forEach;
})();

document.addEventListener("scroll", function () {
  SkillsAnimationOnScroll();

  if (screen.width > 800) {
    MenuChangeOnScroll();
  }
});
/* Function to calculate position of a element referent to the page. */

function offset(el) {
  var rect = el.getBoundingClientRect();
  var scrollTop = window.pageYOffset || window.scrollY;
  return {
    top: rect.top + scrollTop
  };
}
/* Animate Skills bars to expand only when the user screen is showing them. */


var level = document.querySelectorAll(".level");
var tela = window.innerHeight; // let liTopPositions = new Array();

var liTopPositions = [];
var liBotPositions = [];
level.forEach(function (e, i) {
  var liTop = offset(level[i]);
  liTopPositions.push(liTop.top);
  liBotPositions.push(liTop.top + 26);
});

function SkillsAnimationOnScroll() {
  var topoTela = window.scrollY;
  var baixoTela = Number(topoTela + tela);
  level.forEach(function (e, i) {
    if (baixoTela >= liBotPositions[i] && Number(topoTela - 80) <= liTopPositions[i]) {
      level[i].classList.remove("-out");
      level[i].classList.add("-in");
    } else {
      level[i].classList.remove("-in");
      level[i].classList.add("-out");
    }
  });
}
/* Change style of Menu when user scroll down after the ATF (Above The Fold). */


var about = document.getElementById("sobre");
var menu = document.getElementById("js-menu");
var aboutTop = offset(about);

function MenuChangeOnScroll() {
  var topoTela2 = window.scrollY;

  if (aboutTop.top - 60 <= topoTela2) {
    menu.classList.remove("-top");
    menu.classList.add("-scroll");
  } else {
    menu.classList.remove("-scroll");
    menu.classList.add("-top");
  }
}
/* A shitty kind of Lightbox */


var body = document.getElementById("js-body");
var skill = document.querySelectorAll(".frame");
var modal = document.getElementById("js-modal");
var closeModal = document.getElementById("js-closeModal");
skill.forEach(function (e, i) {
  skill[i].addEventListener("click", function () {
    var newSrc = this.children[1].getAttribute("src");
    modal.children[1].children[0].setAttribute("src", newSrc);
    modal.classList.remove("-hide");
    modal.classList.add("-show");
    body.setAttribute("style", "overflow: hidden;");
  });
});
closeModal.addEventListener("click", function () {
  body.setAttribute("style", "overflow: auto;");
  modal.scrollTop = 0;
  modal.classList.remove("-show");
  modal.classList.add("-hide");
});
modal.addEventListener("click", function (e) {
  if (e.target !== this) {
    return;
  }

  body.setAttribute("style", "overflow: auto;");
  this.scrollTop = 0;
  this.classList.remove("-show");
  this.classList.add("-hide");
});
/* Send email with mailto (Cause PHP doesn't work on Github). */

var emailSubmit = document.getElementById("js-emailSubmit");
emailSubmit.addEventListener("click", function () {
  var name = document.getElementById("js-inputName");
  var subject = document.getElementById("js-inputSubject");
  var message = document.getElementById("js-inputMessage");
  var nameV = name.value;
  var subjectV = subject.value;
  var messageV = message.value;
  var subjectWithName = subjectV + " - " + nameV;
  var res1 = subjectWithName.replace(/ /g, "%20");
  var res2 = messageV.replace(/ /g, "%20").replace(/\n/g, "%0D%0A");
  var hyperReference = "mailto:eduardokmesiano@gmail.com?subject=" + res1 + "&body=" + res2;
  emailSubmit.setAttribute("href", hyperReference);
  name.value = "";
  subject.value = "";
  message.value = "";
}); // ##################

var langBtn = document.getElementById('langBtn');
var langModal = document.getElementById('langModal');
var langModalClose = document.getElementById('langModalClose');
langBtn.addEventListener('click', function () {
  langModal.classList.add('langModalShow');
});
langModalClose.addEventListener('click', function () {
  langModal.classList.remove('langModalShow');
});
window.addEventListener('click', function (event) {
  if (event.target === langModal) {
    langModal.classList.remove('langModalShow');
  }
});
//# sourceMappingURL=default.js.map
