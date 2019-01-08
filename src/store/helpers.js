import { INITIAL_ID } from '../constants'
export const isNewlyCreated = item => item && isNewlyCreatedId(item.id)
export const isNewlyCreatedId = id => id === INITIAL_ID

export const includesNewlyCreated = array => array && !!array.find(isNewlyCreated)
