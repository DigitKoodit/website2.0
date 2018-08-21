import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Column, Title, Content, Button } from 'bloomer'
import { loginActions } from '../../actions'
import { BaseContent } from '../../components/Layout'
import ModelEditor, { EditorField } from '../../components/Intra/ModelEditor'

const ProfilePage = ({ logout, profile }) => {
  return (
    <BaseContent>
      <Column>
        <Title>Profiili</Title>
        <Content>
          <ModelEditor
            item={profile}
            renderFields={(item, handleInputChange, updateStateItem) =>
              <Fragment>
                <EditorField label='Käyttäjänimi'>{item.username}</EditorField>
                <EditorField label='Sähköposti'>{item.email}</EditorField>
              </Fragment>
            }
          />
          <Button isColor='danger' onClick={logout} className='btn btn-link mt-5'>Kirjaudu ulos</Button>
        </Content>
      </Column>
    </BaseContent>
  )
}

ProfilePage.propTypes = {
  logout: PropTypes.func.isRequired,
  profile: PropTypes.object
}

const mapStateToProps = state => ({
  profile: state.auth.record,
  loading: state.registration.loading
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(loginActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
