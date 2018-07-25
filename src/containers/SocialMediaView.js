import React from 'react'
import PropTypes from 'prop-types'
import { Columns, Column, Content } from 'bloomer'

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
    <Columns isCentered>
      <Column>
        <Content>
          <h2>Löydät meidät myös somesta</h2>
        </Content>
        <Columns>
          {socialMediums && (
            socialMediums.map(some => (
              <Column key={some.name}>
                <a href={some.link} target='_blank'>
                  <i className={`${some.faStyle} ${some.faIcon} link`} />
                </a>
              </Column>
            ))
          )}
        </Columns>
      </Column>
    </Columns>
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
