import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Base } from '../../components/Layout'
import { userAccountActions } from '../../actions'

class AccountManager extends Component {
  state = {
    activeItemId: null
  }
  componentDidMount() {
    this.props.fetchSponsors()
  }

  handleItemClick = itemId => this.setState({ activeItemId: itemId })

  clearSelection = () => this.setState({ activeItemId: null })

  render = () => {
    const { userAccounts, updateUserAccount } = this.props
    const { activeItemId } = this.state
    return (
      <Base>
        <div className='row'>
          <div className='col-xs-12'>
            <h2>Intra</h2>
            <div className='row margin-top-1'>
              <div className='col-xs-2'>
                {userAccounts.map(account => <p key={account.id}>{account.username}</p>)}
              </div>
              <div className='col-xs-10'>
                <div className='box'>
                  {}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Base >
    )
  }
}

AccountManager.propTypes = {
  userAccounts: PropTypes.array.isRequired,
  fetchSponsors: PropTypes.func.isRequired,
  updateUserAccount: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  userAccounts: state.userAccounts.records
})

const mapDispatchToProps = (dispatch) => ({
  fetchSponsors: () => dispatch(userAccountActions.fetchUserAccounts(true)),
  fetchSponsor: userAccountId => dispatch(userAccountActions.fetchUserAccount(userAccountId)),
  updateSponsor: item => dispatch(userAccountActions.updateSponsor(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountManager)
