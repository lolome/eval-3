/*
 * -----------------------------------------
 *  REQUIREDS
 * - - - - - - - - - - - - - - - - - - - - -
 */

import simpleUID from './modules/simple-uid';

/*
 * -----------------------------------------
 *  DEFINE
 * - - - - - - - - - - - - - - - - - - - - -
 */

const templater = {

  setIDs (element) {

    // TODO: replace('simpleUID')

    // console.log('templater.setIDs:', element);
    // // const elementsToSet = [ ... element.querySelectorAll('*[="simpleUID"]')];
    // const elementsToSet = [ ... element.querySelectorAll('.dropdown')];
    // console.log('templater.setIDs elementsToSet:', elementsToSet);
  },

  appendClone (element, clone) {
    // console.log('templater.appendClone:', element, clone);
    const parent = element.parentElement;
    // console.log('templater.appendClone parent:', parent);
    const insertedElement = parent.appendChild(clone);
    this.setIDs(insertedElement);
    parent.removeChild(element);
  },

  replaceElement (element) {
    // console.log('templater.replaceElement:', element);
    const templateID = element.dataset.template;
    // console.log('templater.replaceElement templateID:', templateID);
    const template = document.querySelector(`#${templateID}`);
    if (!template) return;
    // console.log('templater.replaceElement template:', template);
    const clone = document.importNode(template.content, true);
    // console.log('templater.replaceElement clone:', clone);
    this.appendClone(element, clone);
  },

  replace () {
    const elementsToReplace = [ ... document.querySelectorAll('[data-template]')];
    if (!elementsToReplace.length) return;
    // console.log('templater.replace() …');
    // console.log('templater elementsToReplace:', elementsToReplace);
    elementsToReplace.forEach(element => {
      this.replaceElement(element);
    });
  }

};

/*
 * -----------------------------------------
 *  READY
 * - - - - - - - - - - - - - - - - - - - - -
 */

document.addEventListener('DOMContentLoaded', () => {

  templater.replace();

});
