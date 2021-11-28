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

    getStoredTheme(theme.localStorageKey);
}