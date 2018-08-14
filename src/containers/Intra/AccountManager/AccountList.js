import React, { Fragment } from 'react'
import { MenuLabel, MenuList, MenuLink } from 'bloomer'
import PropTypes from 'prop-types'
import { findUserAccountsByRole } from '../../../selectors/userAccountSelectors'
import { VerticalList } from '../../../components/Layout'

const AccountList = ({ roles, accounts, onItemClick }) => (
  <VerticalList
    items={roles}
    listItemRenderer={role => (
      <Fragment key={`group-${role.id}`}>
        <MenuLabel>{role.name}</MenuLabel>
        {findUserAccountsByRole(accounts, role.id).map(account =>
          <AccountItem key={account.id} account={account} onItemClick={onItemClick} />
        )}
        <MenuList />
      </Fragment>
    )}
  />
)

const AccountItem = ({ account, onItemClick }) =>
  <li key={account.id} onClick={() => onItemClick(account.id)}>
    <MenuLink>{account.username}</MenuLink>
  </li>

AccountItem.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  onItemClick: PropTypes.func
}
AccountList.propTypes = {
  roles: PropTypes.array,
  accounts: PropTypes.array,
  onItemClick: PropTypes.func
}

export default AccountList
