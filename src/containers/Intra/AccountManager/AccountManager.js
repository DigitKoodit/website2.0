import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isNil from 'lodash/isNil'
import { BaseContent } from '../../../components/Layout'
import { userAccountActions, userRoleActions } from '../../../actions'
import { Column, Title, Columns, Box } from 'bloomer'
import AccountList from './AccountList'
import { findUserAccountById, findUserRoleById } from '../../../selectors/userAccountSelectors'

class AccountManager extends Component {
  state = {
    activeItemId: null
  }
  componentDidMount() {
    this.props.fetchUserAccounts()
    this.props.fetchUserRoles()
  }

  handleItemClick = itemId => this.setState({ activeItemId: itemId })

  clearSelection = () => this.setState({ activeItemId: null })

  render = () => {
    const { userAccounts, roles } = this.props
    const { activeItemId } = this.state
    const activeItem = !isNil(activeItemId) && findUserAccountById(userAccounts, activeItemId)

    return (
      <BaseContent>
        <Column>
          <Title>Käyttäjänhallinta</Title>
          <Columns isMultiline>
            <Column isSize='narrow'>
              <AccountList onItemClick={this.handleItemClick} roles={roles} accounts={userAccounts} />
            </Column>
            <Column>
              <Box>
                {activeItem
                  ? <p>
                    {JSON.stringify(activeItem)}
                    {JSON.stringify(findUserRoleById(roles, activeItem.roleId))}
                  </p>
                  : null}
              </Box>
            </Column>
          </Columns>
        </Column>
      </BaseContent >
    )
  }
}

AccountManager.propTypes = {
  userAccounts: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  fetchUserAccounts: PropTypes.func.isRequired,
  fetchUserRoles: PropTypes.func.isRequired
  // updateUserAccount: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  userAccounts: state.userAccounts.records,
  roles: state.roles.records
})

const mapDispatchToProps = (dispatch) => ({
  fetchUserAccounts: () => dispatch(userAccountActions.fetchUserAccounts(true)),
  fetchUserRoles: () => dispatch(userRoleActions.fetchUserRoles()),
  updateUserAccount: item => dispatch(userAccountActions.updateUserAccount(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountManager)
