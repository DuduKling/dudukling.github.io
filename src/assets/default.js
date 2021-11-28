/* jshint esversion: 6 */
import startMenuResponsive from './scripts/menu-responsive.js';
import startLightbox from './scripts/lightbox.js';
import startEmail from './scripts/email.js';
import { modalHandler } from './scripts/modal.js';
import startLanguage from './scripts/language.js';
import startTheme from './scripts/theme.js';
import startCanvas from './scripts/canvas.js';

startMenuResponsive();
startLightbox();
startEmail();
startLanguage(modalHandler);
startTheme(modalHandler);
startCanvas();
