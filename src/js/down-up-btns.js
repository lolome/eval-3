/*
 * -----------------------------------------
 *  INIT
 * - - - - - - - - - - - - - - - - - - - - -
 */

document.addEventListener('DOMContentLoaded', () => {

  const downUpBtns = document.querySelector('.down-up-btns');
  if (!downUpBtns) return;
  // console.log('downUpBtns:', downUpBtns);

  const downBtn = downUpBtns.querySelector('.down-btn');
  // console.log('downBtn:', downBtn);

  const upBtn = downUpBtns.querySelector('.up-btn');
  // console.log('upBtn:', upBtn);

  const body = document.body;
  const bodyHeight = body.clientHeight;
  // console.log('bodyHeight:', bodyHeight);
  const bodyScrollHeight = body.scrollHeight;
  // console.log('bodyScrollHeight:', bodyScrollHeight);
  const threshold = 1.5;

  if (bodyScrollHeight < bodyHeight * threshold) return;

  downUpBtns.classList.add('show');

  let maxScrollTop = bodyScrollHeight - bodyHeight;
  // console.log('maxScrollTop:', maxScrollTop);

  const updateBtns = () => {

    const currentScrollTop = body.scrollTop;
    // console.log('currentScrollTop:', currentScrollTop);

    if (currentScrollTop < maxScrollTop / 2) {
      downBtn.classList.add('show');
      upBtn.classList.remove('show');
    } else {
      downBtn.classList.remove('show');
      upBtn.classList.add('show');
    }

  };

  body.addEventListener('scroll', () => {
    updateBtns();
  }, false);

  updateBtns();

  downBtn.addEventListener('click', () => {
    body.scrollTo(0, maxScrollTop * threshold);
  }, false);

  upBtn.addEventListener('click', () => {
    body.scrollTo(0, 0);
  }, false);

});
