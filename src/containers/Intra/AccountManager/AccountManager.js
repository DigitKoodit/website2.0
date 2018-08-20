import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isNil from 'lodash/isNil'
import { BaseContent } from '../../../components/Layout'
import { userAccountActions, userRoleActions } from '../../../actions'
import { Column, Title, Columns, Box } from 'bloomer'
import AccountList from './AccountList'
import ModelEditor, { EditorField, EditorInput, EditorCheckbox } from '../../../components/Intra/ModelEditor'
import { findUserAccountById, findUserRoleById } from '../../../selectors/userAccountSelectors'
import { ChooserModal } from '../../../components/Modal'

class AccountManager extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeItemId: null
    }
    this.chooserRef = React.createRef()
  }

  componentDidMount() {
    this.props.fetchUserAccounts()
    this.props.fetchUserRoles()
  }

  handleItemClick = itemId => {
    this.setState({ activeItemId: itemId })
    this.props.clearErrors()
  }

  clearSelection = () => {
    this.setState({ activeItemId: null })
    this.props.clearErrors()
  }

  renderDetailedAccount = (item, validationErrors, roles, profile) => <ModelEditor
    item={item}
    onSave={this.props.updateUserAccount}
    onCancel={this.clearSelection}
    renderFields={(item, handleInputChange, updateStateItem) => {
      return (
        <Columns>
          <Column>
            <EditorField label='Käyttäjänimi'>{item.username}</EditorField>
            <EditorField label='Sähköpostiosoite'>
              <EditorInput
                field='email'
                model={item}
                onChange={handleInputChange}
                validationErrors={validationErrors} />
            </EditorField>
            <EditorField label='Aktiivinen'>
              <EditorCheckbox
                field='active'
                disabled={profile.id === item.id}
                model={item}
                onChange={handleInputChange}
                validationErrors={validationErrors} />
            </EditorField>
            <EditorField label='Rooli'>
              <ChooserModal
                ref={this.chooserRef}
                modalTitle='Valitse rooli'
                disabled={profile.id === item.id}
                dataSet={roles}
                selectedItem={findUserRoleById(roles, item.roleId)}
                listItemFormatter={item => item.name}
                onSelect={role => {
                  updateStateItem({ roleId: role.id })
                  this.chooserRef.current && this.chooserRef.current.closeModal()
                }}
                selectedRenderer={item => <p><b>{item.name}</b> {item.accessLevel}</p>} />
            </EditorField>
          </Column>
        </Columns>
      )
    }}
  />

  render = () => {
    const { userAccounts, validationErrors, roles, profile } = this.props
    const { activeItemId } = this.state
    const activeItem = !isNil(activeItemId) && findUserAccountById(userAccounts, activeItemId)
    return (
      <BaseContent>
        <Column>
          <Title>Käyttäjänhallinta</Title>
          <Columns isMultiline>
            <Column isSize='narrow'>
              <AccountList
                onItemClick={this.handleItemClick}
                roles={roles}
                accounts={userAccounts} />
            </Column>
            <Column>
              <Box>
                {activeItem
                  ? this.renderDetailedAccount(activeItem, validationErrors, roles, profile.record)
                  : <p>Valitse muokattava kohde listalta</p>}

              </Box>
            </Column>
          </Columns>
        </Column>
      </BaseContent>
    )
  }
}

AccountManager.propTypes = {
  userAccounts: PropTypes.array.isRequired,
  validationErrors: PropTypes.shape({ msg: PropTypes.string }),
  roles: PropTypes.array.isRequired,
  fetchUserAccounts: PropTypes.func.isRequired,
  fetchUserRoles: PropTypes.func.isRequired,
  updateUserAccount: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    record: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
    validationErrors: PropTypes.shape({ msg: PropTypes.string })
  })
}

const mapStateToProps = (state) => ({
  userAccounts: state.userAccounts.records,
  validationErrors: state.userAccounts.error,
  profile: state.auth,
  roles: state.roles.records
})

const mapDispatchToProps = (dispatch) => ({
  fetchUserAccounts: () => dispatch(userAccountActions.fetchUserAccounts(true)),
  fetchUserRoles: () => dispatch(userRoleActions.fetchUserRoles()),
  updateUserAccount: item => dispatch(userAccountActions.updateUserAccount(item)),
  clearErrors: () => dispatch(userAccountActions.clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountManager)
