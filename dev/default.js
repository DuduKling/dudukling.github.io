document.addEventListener("scroll", function(){
    SkillsAnimationOnScroll();
    MenuChangeOnScroll();
});

/* Function to calculate position of a element referent to the page. */
function offset(el) {
    let rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop}
}

/* Animate Skills bars to expand only when the user screen is showing them. */
let level = document.querySelectorAll(".level");
let tela = window.innerHeight;
let lis = document.getElementsByClassName("level");
let liTopPositions = new Array();
let liBotPositions = new Array();

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
let about = document.querySelectorAll(".about");
let menu = document.querySelectorAll(".menu");
let aboutTop = offset(about[0]);

function MenuChangeOnScroll(){
    let topoTela2 = document.documentElement.scrollTop;

    if (aboutTop.top-60 <= topoTela2) {
        menu[0].classList.remove("-top");
        menu[0].classList.add("-scroll");
    }else{
        menu[0].classList.remove("-scroll");
        menu[0].classList.add("-top");
    }
}


/* A shitty kind of Lightbox */
let body = document.querySelectorAll("body");
let skill = document.querySelectorAll(".frame");
let view = document.getElementsByClassName("largeView");
let closeView = document.getElementsByClassName("closeView");

skill.forEach(function(e, i) {
    skill[i].addEventListener("click", function(){
        let j = this.children[1].getAttribute("src");
        view[0].children[1].children[0].setAttribute("src", j);
        view[0].classList.remove("-hide");
        view[0].classList.add("-show");
        body[0].setAttribute("style", "overflow: hidden;");
    });
}, this);

closeView[0].addEventListener("click", function(){
    body[0].setAttribute("style", "overflow: auto;");
    view[0].scrollTop = 0;
    view[0].classList.remove("-show");
    view[0].classList.add("-hide");
}, this);

view[0].addEventListener("click", function(e){
    if (e.target !== this)
    return;

    body[0].setAttribute("style", "overflow: auto;");
    this.scrollTop = 0;
    this.classList.remove("-show");
    this.classList.add("-hide");
}, this);

