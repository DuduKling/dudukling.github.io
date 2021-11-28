/* jshint esversion: 6 */
export default function startLightbox() {
    /* A shitty kind of Lightbox */
    let body = document.getElementById("js-body");
    let portfolioFrame = document.querySelectorAll(".frame");
    let modal = document.getElementById("js-modal");
    let closeModal = document.getElementById("js-closeModal");

    for (const frame of portfolioFrame) {
        frame.addEventListener("click", function () {
            const src = this.children[1].getAttribute("src");

            const numParts = Number(this.children[1].getAttribute("numParts"));

            const divImg = modal.children[1];
            const alt = divImg.getAttribute("alt");

            for (let j = 1; j <= numParts; j++) {
                const imgElement = document.createElement("img");
                imgElement.src = src.replace('-1', `-${j}`);
                imgElement.alt = `${alt} - Image part ${j}`;
                divImg.appendChild(imgElement);
            }

            body.setAttribute("style", "overflow: hidden;");
            modal.classList.remove("-hide");
            modal.classList.add("-show");
        });
    };

    closeModal.addEventListener("click", function () {
        modal.children[1].innerHTML = '';

        body.setAttribute("style", "overflow: auto;");
        modal.scrollTop = 0;
        modal.classList.remove("-show");
        modal.classList.add("-hide");
    });

    modal.addEventListener("click", function (e) {
        if (e.target !== this) {
            return;
        }

        modal.children[1].innerHTML = '';

        body.setAttribute("style", "overflow: auto;");
        this.scrollTop = 0;
        this.classList.remove("-show");
        this.classList.add("-hide");
    });
}