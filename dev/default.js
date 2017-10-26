document.addEventListener("scroll", function(){
    SkillsAnimationOnScroll();
    MenuChangeOnScroll();
});

// Get skills li
let level = document.querySelectorAll(".level");

// Get window size.
let tela = window.innerHeight;

let lis = document.getElementsByClassName("level");
let liTopPositions = new Array();
let liBotPositions = new Array();

level.forEach(function(e, i) {
    let liTop = offset(level[i]);
    liTopPositions.push(liTop.top);
    liBotPositions.push(liTop.top + 26);
}, this);

function offset(el) {
    let rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop}
}

function SkillsAnimationOnScroll() {
    // Get user's window position relative to page.
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