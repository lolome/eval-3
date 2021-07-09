/*
 * -----------------------------------------
 *  REQUIRED
 * - - - - - - - - - - - - - - - - - - - - -
 */

import feather from 'feather-icons';
import featherCustoms from './modules/feather-customs.json';
window.feather = feather;

/*
 * -----------------------------------------
 *  INIT
 * - - - - - - - - - - - - - - - - - - - - -
 */

document.addEventListener('DOMContentLoaded', () => {
  const featherClass = feather.icons.circle.constructor;
  featherCustoms.forEach(customIcon => {
    const icon = new featherClass(customIcon.name, customIcon.contents);
    feather.icons[customIcon.name] = icon;
  });
  feather.replace();
});
