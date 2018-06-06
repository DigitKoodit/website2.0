
export const removeDuplicates = array =>
  array.filter((e, index, arr) => arr.indexOf(e) === index)
