/*
 * -----------------------------------------
 *  EXPORT
 * - - - - - - - - - - - - - - - - - - - - -
 * https://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 * - - - - - - - - - - - - - - - - - - - - -
 */

export default () => {
  const part = () => {
    let x = (Math.random() * 46656) | 0;
    return ('000' + x.toString(36)).slice(-3);
  };
  return part() + part();
};
