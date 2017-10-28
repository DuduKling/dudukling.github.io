/*jshint esversion: 6 */

document.addEventListener("scroll", function(){
    SkillsAnimationOnScroll();

    if(screen.width > 800){
        MenuChangeOnScroll();
    }
});

/* Function to calculate position of a element referent to the page. */
function offset(el) {
    let rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop};
}

/* Animate Skills bars to expand only when the user screen is showing them. */
let level = document.querySelectorAll(".level");
let tela = window.innerHeight;
// let liTopPositions = new Array();
let liTopPositions = [];
let liBotPositions = [];

level.forEach(function(e, i) {
    let liTop = offset(level[i]);
    liTopPositions.push(liTop.top);
    liBotPositions.push(liTop.top + 26);
}, this);

function SkillsAnimationOnScroll() {
    let topoTela = document.documentElement.scrollTop;
    let baixoTela = Number(topoTela+tela);
    
    level.forEach(function(e, i) {
        if (baixoTela >= liBotPositions[i] && Number(topoTela-80) <= liTopPositions[i]) {
            level[i].classList.remove("-out");
            level[i].classList.add("-in");
        }else{
            level[i].classList.remove("-in");
            level[i].classList.add("-out");
        }
    }, this);
}

/* Change style of Menu when user scroll down after the ATF (Above The Fold). */
let about = document.getElementById("sobre");
let menu = document.getElementById("menu");
let aboutTop = offset(about);

function MenuChangeOnScroll(){
    let topoTela2 = document.documentElement.scrollTop;

    if (aboutTop.top-60 <= topoTela2) {
        menu.classList.remove("-top");
        menu.classList.add("-scroll");
    }else{
        menu.classList.remove("-scroll");
        menu.classList.add("-top");
    }
}


/* A shitty kind of Lightbox */
let body = document.getElementById("body");
let skill = document.querySelectorAll(".frame");
let modal = document.getElementById("modal");
let closeModal = document.getElementById("closeModal");

skill.forEach(function(e, i) {
    skill[i].addEventListener("click", function(){
        let newSrc = this.children[1].getAttribute("src");
        modal.children[1].children[0].setAttribute("src", newSrc);
        modal.classList.remove("-hide");
        modal.classList.add("-show");
        body.setAttribute("style", "overflow: hidden;");
    });
}, this);

closeModal.addEventListener("click", function(){
    body.setAttribute("style", "overflow: auto;");
    modal.scrollTop = 0;
    modal.classList.remove("-show");
    modal.classList.add("-hide");
}, this);

modal.addEventListener("click", function(){
    if (e.target !== this)
    return;

    body.setAttribute("style", "overflow: auto;");
    this.scrollTop = 0;
    this.classList.remove("-show");
    this.classList.add("-hide");
}, this);


/* Send email with mailto (Cause PHP doesn't work on Github). */
let emailSubmit = document.getElementById("emailSubmit");

emailSubmit.addEventListener("click", function(){
    let name = document.getElementById("inputName");
    let subject = document.getElementById("inputSubject");
    let message = document.getElementById("inputMessage");

    let nameV = name.value;
    let subjectV = subject.value;
    let messageV = message.value;

    let subjectWithName = subjectV + " - " + nameV;
    let res1 = subjectWithName.replace(/ /g, "%20");
    let res2 = messageV.replace(/ /g, "%20").replace(/\n/g, "%0D%0A");
    
    let hyperReference = "mailto:eduardokmesiano@gmail.com?subject=" + res1 + "&body=" + res2;

    emailSubmit.setAttribute("href", hyperReference);

    name.value = "";
    subject.value = "";
    message.value = "";
}, this);
