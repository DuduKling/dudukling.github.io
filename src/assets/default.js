/* jshint esversion: 6 */

// Polyfill to ForEach.
(function () {
    if (typeof NodeList.prototype.forEach === "function") return false;
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
    return {
        top: rect.top + scrollTop
    };
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

    const open = () => {
        classes.add(cssClass);
    }
    const close = () => {
        classes.remove(cssClass);
    }

    elementBtn.addEventListener('click', open);
    elementCloseBtn.addEventListener('click', close);

    window.addEventListener('click', (event) => {
        if (event.target === elementModal) {
            close();
        }
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
    if (storedTheme) {
        themeHandler(storedTheme)
    }
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






// ########## CANVAS ##########
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const themeColor = `#3c3c3c80`;

const avatarHover = document.getElementById('avatarHover');
let hasMouse = false;
avatarHover.addEventListener('dblclick', () => {
    hasMouse = !hasMouse
    hasMouse ? mouse.start() : mouse.end();
});

let particlesArray;

class Mouse {
    constructor(theCanvas) {
        this.x = null;
        this.y = null;
        this.radius = (theCanvas.height / 80) * (theCanvas.width / 80);

        this.moveListener = (event) => {
            this.x = event.x;
            this.y = event.y;
        };
        this.outListener = () => {
            this.x = undefined;
            this.y = undefined;
        }
    }

    start() {
        window.addEventListener('mousemove', this.moveListener, false);
        window.addEventListener('mouseout', this.outListener, false);
    }

    end() {
        window.removeEventListener('mousemove', this.moveListener, false);
        window.removeEventListener('mouseout', this.outListener, false);
    }
}

class Particle {

    constructor({
        x,
        y,
        dirX,
        dirY,
        size,
        color
    }) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = themeColor;
        ctx.fill();
    }

    update() {
        // Canvas border
        if (this.x > canvas.width || this.x < 0) {
            this.dirX = -this.dirX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.dirY = -this.dirY;
        }

        // Collision detection
        if (hasMouse) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 10;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 10;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 10;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 10;
                }
            }
        }

        this.x += this.dirX;
        this.y += this.dirY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 2;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let dirX = (Math.random() * 5) - 2.5;
        let dirY = (Math.random() * 5) - 2.5;
        let color = themeColor;

        particlesArray.push(new Particle({
            x,
            y,
            dirX,
            dirY,
            size,
            color
        }));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (const particle of particlesArray) {
        particle.update();
    }

    connect();
}

function connect() {
    let opacityValue = 1;
    for (const particleA of particlesArray) {
        for (const particleB of particlesArray) {
            const dx = (particleA.x - particleB.x);
            const dy = (particleA.y - particleB.y);
            const distance = (dx * dx) + (dy * dy);

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                opacityValue = opacityValue < 0 ? 0 : Math.round(opacityValue * 100);

                const opacityHex = opacityValue.toString(16).padStart(2, '0');
                const strokeColor = `${themeColor.slice(0, -2)}${opacityHex}`;

                ctx.strokeStyle = strokeColor;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleA.x, particleA.y);
                ctx.lineTo(particleB.x, particleB.y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = (canvas.height / 80) * (canvas.width / 80);
});

const mouse = new Mouse(canvas);
initParticles();
animate();
