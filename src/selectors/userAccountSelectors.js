import createCachedSelector from 're-reselect'

const getUserAccounstFromArguments = arg => arg.userAccounts ? arg.userAccounts.records : arg
const getUserRolesFromAruments = arg => arg.userRoles ? arg.userRoles.records : arg

/**
 *--------------------------------------------------
 * Read re-reselect documentation for better understanding
 * Use either state or passed array as data source, filter and cache selections
 *--------------------------------------------------
*/
export const findUserAccountById = createCachedSelector(
  getUserAccounstFromArguments,
  (state, userAccountId) => Number(userAccountId),
  (userAccounts, userAccountId) => {
    return userAccounts.find(account => account.id === userAccountId)
  }
)((state, userAccountId) => userAccountId)

export const findUserRoleById = createCachedSelector(
  getUserRolesFromAruments,
  (state, roleId) => Number(roleId),
  (roles, roleId) => {
    return roles.find(role => role.id === roleId)
  }
)((state, roleId) => roleId)

export const findUserAccountsByRole = createCachedSelector(
  getUserAccounstFromArguments,
  (state, roleId) => Number(roleId),
  (userAccounts, roleId) => {
    return userAccounts.filter(account => account.roleId === roleId)
  }
)((state, roleId) => roleId)
