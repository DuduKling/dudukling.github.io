// Get skills li
var level = document.querySelectorAll(".level");

// Get window size.
var tela = window.innerHeight;

var lis = document.getElementsByClassName("level");
var liTopPositions = new Array();
var liBotPositions = new Array();

level.forEach(function(e, i) {
    var liTop = offset(level[i]);
    liTopPositions.push(liTop.top);
    liBotPositions.push(liTop.top + 26);
}, this);

document.addEventListener("scroll", function(){
    // Get user's window position relative to page.
    var topoTela = document.documentElement.scrollTop;
    var baixoTela = Number(topoTela+tela);
    
    level.forEach(function(e, i) {
        if (baixoTela >= liBotPositions[i] && Number(topoTela-80) <= liTopPositions[i]) {
            level[i].classList.remove("-out");
            level[i].classList.add("-in");
        }else{
            level[i].classList.remove("-in");
            level[i].classList.add("-out");
        }
    }, this);
});

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop}
}

