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
  const dropzoneForm1 = document.getElementById('dropzone-1');
  if (!dropzoneForm1) return;
  const dropzone1 = new Dropzone(dropzoneForm1, { url: '/file/post' });
});
