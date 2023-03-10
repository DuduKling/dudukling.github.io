/* jshint esversion: 6 */
const theme = {
    localStorageKey: 'theme',
    documentAttr: 'data-theme',
}

const getStoredTheme = (localStorageKey) => {
    const storedTheme = localStorage.getItem(localStorageKey) || document.documentElement.getAttribute(theme.documentAttr) || null;
    if (storedTheme) {
        themeHandler(storedTheme)
    }
}

function startButtonsLogic() {
    const elementsBtn = document.querySelectorAll("#themeButton");

    for (const el of elementsBtn) {
        el.addEventListener('click', (event) => {
            const key = event.target.getAttribute("themeKey");

            themeHandler(key);
        });
    }
}

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

export default function startTheme(modalHandler) {
    modalHandler(['themeBtn', 'themeModal', 'themeModalClose', 'themeModalShow']);
    startButtonsLogic();
    getStoredTheme(theme.localStorageKey);
}