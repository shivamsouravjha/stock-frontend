/**
 * extracts numbers from string
 * @param {String} str
 */
export function toNumber(str) {
  let num = str.toString().match(/[\d.]+/g)
  return num ? parseFloat(num.join('')) : 0
}
