/* jshint esversion: 6 */

// Polyfill to ForEach.
(function () {
    if ( typeof NodeList.prototype.forEach === "function" ) return false;
    NodeList.prototype.forEach = Array.prototype.forEach;
})();

document.addEventListener("scroll", function () {
    if (screen.width > 800) {
        MenuChangeOnScroll();
    }
});

/* Function to calculate position of a element referent to the page. */
function offset(el) {
    let rect = el.getBoundingClientRect();
    let scrollTop = window.pageYOffset || window.scrollY;
    return {top: rect.top + scrollTop};
}

/* Change style of Menu when user scroll down after the ATF (Above The Fold). */
let about = document.getElementById("sobre");
let menu = document.getElementById("js-menu");
let aboutTop = offset(about);

function MenuChangeOnScroll() {
    let topoTela2 = window.scrollY;

    if (aboutTop.top - 60 <= topoTela2) {
        menu.classList.remove("-top");
        menu.classList.add("-scroll");
    } else {
        menu.classList.remove("-scroll");
        menu.classList.add("-top");
    }
}


/* A shitty kind of Lightbox */
let body = document.getElementById("js-body");
let portfolioFrame = document.querySelectorAll(".frame");
let modal = document.getElementById("js-modal");
let closeModal = document.getElementById("js-closeModal");

portfolioFrame.forEach(function (e, i) {
    portfolioFrame[i].addEventListener("click", function () {
        let newSrc = this.children[1].getAttribute("src");
        modal.children[1].children[0].setAttribute("src", newSrc.replace('-thumb', ''));

        body.setAttribute("style", "overflow: hidden;");
        modal.classList.remove("-hide");
        modal.classList.add("-show");
    });
});

closeModal.addEventListener("click", function () {
    body.setAttribute("style", "overflow: auto;");
    modal.scrollTop = 0;
    modal.classList.remove("-show");
    modal.classList.add("-hide");
});

modal.addEventListener("click", function (e){
    if (e.target !== this){
        return;
    }

    body.setAttribute("style", "overflow: auto;");
    this.scrollTop = 0;
    this.classList.remove("-show");
    this.classList.add("-hide");
});


/* Send email with mailto (Cause PHP doesn't work on Github). */
let emailSubmit = document.getElementById("js-emailSubmit");

emailSubmit.addEventListener("click", function () {
    let name = document.getElementById("js-inputName");
    let subject = document.getElementById("js-inputSubject");
    let message = document.getElementById("js-inputMessage");

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
});







// ########## MODAL ##########
const modalHandler = ([btn, aModal, closeBtn, cssClass]) => {
    const elementBtn = document.getElementById(btn);
    const elementModal = document.getElementById(aModal);
    const elementCloseBtn = document.getElementById(closeBtn);

    const classes = elementModal.classList;

    const open = () => { classes.add(cssClass); }
    const close = () => { classes.remove(cssClass); }

    elementBtn.addEventListener('click', open);
    elementCloseBtn.addEventListener('click', close);

    window.addEventListener('click', (event) => {
        if (event.target === elementModal) { close(); }
    });
}

modalHandler(['langBtn', 'langModal', 'langModalClose', 'langModalShow']);


// ########## THEME ##########
const theme = {
    btn: 'themeBtn',
    modal: 'themeModal',
    closeBtn: 'themeModalClose',
    cssClass: 'themeModalShow',
    localStorageKey: 'theme',
    documentAttr: 'data-theme',
}

modalHandler([theme.btn, theme.modal, theme.closeBtn, theme.cssClass]);

const getStoredTheme = (localStorageKey) => {
    const storedTheme = localStorage.getItem(localStorageKey) || document.documentElement.getAttribute(theme.documentAttr) || null;
    if (storedTheme) { themeHandler(storedTheme) }
}

getStoredTheme(theme.localStorageKey);

function themeHandler(key) {
    // Set Theme
    document.documentElement.setAttribute(theme.documentAttr, key);
    localStorage.setItem(theme.localStorageKey, key);

    // UpdateButtons
    const themeModalList = document.querySelectorAll('.themeItem');

    for (const themeItem of themeModalList) {
        const themeItemButton = themeItem.querySelector('button');
        const themeItemKey = themeItem.querySelector('.hiddenKey').innerHTML;

        if (themeItemKey === key) {
            themeItemButton.setAttribute('disabled', true);
        } else {
            themeItemButton.removeAttribute('disabled')
        }
    }
}
