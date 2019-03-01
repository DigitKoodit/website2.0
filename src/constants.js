const INITIAL_ID = -(Math.pow(2, 53) - 1)
const NEW_ITEM_URL_KEYWORD = 'new'
const HAZARDOUS_INPUT_CHAR_REGEX = /([\\/\-(),#|!@~"&^$=<* ])/g

export {
  INITIAL_ID,
  NEW_ITEM_URL_KEYWORD,
  HAZARDOUS_INPUT_CHAR_REGEX
}
