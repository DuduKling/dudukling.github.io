/* jshint esversion: 6 */
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

export default function startCanvas() {
    initParticles();
    animate();
}