import React from 'react';
import PropTypes from 'prop-types';

const socialMediums = [
  {
    name: 'Facebook',
    link: 'https://www.facebook.com/digitry',
    faIcon: 'fa-facebook'
  },
  {
    name: 'GitHub',
    link: 'https://github.com/DigitKoodit',
    faIcon: 'fa-github'
  },
  {
    name: 'Sähköposti',
    link: 'https://lists.utu.fi/mailman/listinfo/digipiiri',
    faIcon: 'fa-envelope-o'
  }, {
    name: 'Instagram',
    link: 'https://www.instagram.com/digitteekkari/',
    faIcon: 'fa-instagram'
  }
]

const SocialMediaView = () => (
  <div className="text-center padding-top-2 padding-sides-1">
    <h2>Löydät meidät myös somesta</h2>
    <div className="flex-container padding-1">
      {socialMediums && (
        socialMediums.map(some => (
          <div
            key={some.name}
            className="flex-item"
          >
            <a href={some.link} target='_blank'>
              <i className={`fa ${some.faIcon} link`} />
            </a>
          </div>
        ))
      )}
    </div>
  </div>
)

SocialMediaView.propTypes = {
  socialMediums: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    weight: PropTypes.number
  }))
}



export default SocialMediaView;