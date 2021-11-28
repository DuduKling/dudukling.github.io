/* jshint esversion: 6 */
export default function startMenuResponsive() {
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
}