export const modalHandler = ([btn, aModal, closeBtn, cssClass]) => {
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
