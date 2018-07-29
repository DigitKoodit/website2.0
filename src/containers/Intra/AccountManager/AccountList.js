import React, { Fragment } from 'react'

import { Menu, MenuLabel, MenuList, MenuLink } from 'bloomer'
import PropTypes from 'prop-types'
import { findUserAccounstByRole } from '../../../selectors/userAccountSelectors'

const AccountList = ({ roles, accounts, onItemClick }) => (
  <Menu>
    {roles.map(role =>
      <Fragment key={`group-${role.id}`}>
        <MenuLabel>{role.name}</MenuLabel>
        {findUserAccounstByRole(accounts, role.id).map(account =>
          <li key={account.id} onClick={() => onItemClick(account.id)}><MenuLink>{account.username}</MenuLink></li>
        )}
        <MenuList />
      </Fragment>
    )}
  </Menu>
)

AccountList.propTypes = {
  roles: PropTypes.array,
  accounts: PropTypes.array,
  onItemClick: PropTypes.func
}

export default AccountList
