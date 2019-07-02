
export const removeDuplicates = array =>
  array.filter((e, index, arr) => arr.indexOf(e) === index)

export const partition = (arr, fn) =>
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val)
      return acc
    },
    [[], []]
  )
export const getBrowserInfo = () => {
  const ua = navigator.userAgent
  let tem
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  if(/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return { name: 'IE', version: (tem[1] || '') }
  }
  if(M[1] === 'Chrome') {
    tem = ua.match(/\bOPR|Edge\/(\d+)/)
    if(tem != null) { return { name: 'Opera', version: tem[1] } }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  if((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]) }
  return {
    name: M[0],
    version: M[1]
  }
}
