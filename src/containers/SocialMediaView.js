import React from 'react'
import PropTypes from 'prop-types'
import { Content, Icon, Container, Title } from 'bloomer'

const socialMediumsDefault = [
  {
    name: 'Facebook',
    link: 'https://www.facebook.com/digitry',
    faIcon: 'fa-facebook',
    faStyle: 'fab'
  },
  {
    name: 'GitHub',
    link: 'https://github.com/DigitKoodit',
    faIcon: 'fa-github',
    faStyle: 'fab'
  },
  {
    name: 'Sähköposti',
    link: 'https://lists.utu.fi/mailman/listinfo/digipiiri',
    faIcon: 'fa-envelope',
    faStyle: 'fas'
  }, {
    name: 'Instagram',
    link: 'https://www.instagram.com/digitteekkari/',
    faIcon: 'fa-instagram',
    faStyle: 'fab'
  }
]

const SocialMediaView = ({ socialMediums }) => {
  return (
    <Container hasTextAlign='centered' className='p-6' >
      <Content>
        <Title>Löydät meidät myös somesta</Title>
        {socialMediums && (
          socialMediums.map(some => (
            <a
              key={some.name}
              className='ml-2 mr-2'
              href={some.link}
              target='_blank'
              rel='noopener noreferrer'>
              <Icon isSize='large' className={`${some.faStyle} ${some.faIcon} fa-3x link`} />
            </a>
          ))
        )}
      </Content>
    </Container>
  )
}

SocialMediaView.propTypes = {
  socialMediums: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    faIcon: PropTypes.string.isRequired,
    weight: PropTypes.number
  }))
}

SocialMediaView.defaultProps = {
  socialMediums: socialMediumsDefault
}

export default SocialMediaView
