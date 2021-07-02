/*
 * -----------------------------------------
 *  REQUIRED
 * https://dropzone.gitbook.io/dropzone/getting-started/installation/webpack-recommended
 * - - - - - - - - - - - - - - - - - - - - -
 */

import Dropzone from 'dropzone';

// Make sure Dropzone doesn't try to attach itself to the
// element automatically.
// This behaviour will change in future versions.
Dropzone.autoDiscover = false;

/*
 * -----------------------------------------
 *  INIT
 * - - - - - - - - - - - - - - - - - - - - -
 */

document.addEventListener('DOMContentLoaded', () => {
  const dropzones = [ ... document.querySelectorAll('.dropzone')];
  dropzones.forEach(dropzone => {
    new Dropzone(dropzone);
  });
});
