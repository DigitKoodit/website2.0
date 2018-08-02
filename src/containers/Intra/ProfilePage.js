import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Column, Title, Content, Button } from 'bloomer'
import { loginActions } from '../../actions'
import { BaseContent } from '../../components/Layout'

const ProfilePage = ({ logout }) => {
  return (
    <BaseContent>
      <Column>
        <Title>Oma profiili</Title>
        <Content>
          <p>Nimi:</p>
          <p>Sähköposti:</p>
          <Button isColor='danger' onClick={logout} className='btn btn-link'>Kirjaudu ulos</Button>
        </Content>
      </Column>
    </BaseContent>
  )
}

ProfilePage.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: {},
  loading: state.registration.loading
})

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(loginActions.logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
