/*
 * -----------------------------------------
 *  REQUIRED
 * - - - - - - - - - - - - - - - - - - - - -
 */

import * as bootstrap from 'bootstrap';

/*
 * -----------------------------------------
 *  GLOBAL
 * - - - - - - - - - - - - - - - - - - - - -
 *  Note: If you want to make bootstrap globally available, e.g. for using `bootstrap.modal`
 * - - - - - - - - - - - - - - - - - - - - -
 */

window.bootstrap = bootstrap;

/*
 * -----------------------------------------
 *  POPOVERS
 * - - - - - - - - - - - - - - - - - - - - -
 *  Note: Disable this if you're not using Bootstrap's Popovers
 * - - - - - - - - - - - - - - - - - - - - -
 */

const popoverTriggerList = []
  .slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
popoverTriggerList.map((popoverTriggerEl) => {
  return new bootstrap.Popover(popoverTriggerEl);
});

/*
 * -----------------------------------------
 *  TOOLTIPS
 * - - - - - - - - - - - - - - - - - - - - -
 *  Note: Disable this if you're not using Bootstrap's Tooltips
 * - - - - - - - - - - - - - - - - - - - - -
 */

const tooltipTriggerList = [].slice
  .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map((tooltipTriggerEl) => {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

/*
 * -----------------------------------------
 *  TOASTS
 * - - - - - - - - - - - - - - - - - - - - -
 *  Note: Disable this if you're not using Bootstrap's Toats
 * - - - - - - - - - - - - - - - - - - - - -
 */

const toastEltList = [ ... document.querySelectorAll('.toast')];
toastEltList.forEach(toastElt => {
  const toast = new bootstrap.Toast(toastElt);
  toast.show();
});
