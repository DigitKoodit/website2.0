import { INITIAL_ID } from '../constants'
export const isNewlyCreated = item => item && item.id === INITIAL_ID

export const includesNewlyCreated = array => array && !!array.find(isNewlyCreated)
