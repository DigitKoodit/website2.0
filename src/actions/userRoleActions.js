import { actionKeys } from './actionTypes'
import { crudTypes, createCrudTypes, createAction } from '../store/helpers'
import createCrudService from '../services/createCrudService'
import { loginActions } from '.'
import { displayErrorMessage, isUnauthorized, parseResponseError } from './helpers'

const userRoleCrud = createCrudService('/api/intra/account/roles', true)

const USER_ROLE = createCrudTypes(actionKeys.userRole)

const userRoleActions = {
  pending: (crudType) => createAction(USER_ROLE[crudType].PENDING),
  success: (response, crudType) => createAction(USER_ROLE[crudType].SUCCESS, { response }),
  error: (error, crudType) => createAction(USER_ROLE[crudType].ERROR, { error }),
  fetchUserRoles() {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      const api = userRoleCrud
      api.fetchAll()
        .then(response => {
          dispatch(this.success(response, crudTypes.FETCH))
        }).catch(err => {
          const message = 'Käyttäjäroolien noutaminen epäonnistui'
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.FETCH))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
          })
        })
    }
  }
}

export default userRoleActions
export { USER_ROLE }
