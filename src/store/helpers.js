import { INITIAL_ID, NEW_ITEM_URL_KEYWORD } from '../constants'
export const isNewlyCreated = item => item && isNewlyCreatedId(item.id)
export const isNewlyCreatedId = id => id === INITIAL_ID

export const includesNewlyCreated = array => array && !!array.find(isNewlyCreated)
export const urlDisplayId = id => isNewlyCreatedId(id) ? NEW_ITEM_URL_KEYWORD : id
