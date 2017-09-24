import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageLink from '../components/ImageLink';


const socialMediaMediums = [
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
  <div className="site-content text-center">
    <h2>Löydät meidät myös somesta</h2>
    <div className="flex-container margin-1">
      {socialMediaMediums && (
        socialMediaMediums.map(some => (
          <div
            key={some.name}
            className="flex-item"
          >
            <a href={some.link}>
              <i className={`fa ${some.faIcon} link`} />
            </a>
          </div>
        ))
      )}
    </div>
  </div>
)

SocialMediaView.propTypes = {
  socialMediaMediums: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    weight: PropTypes.number
  }))
}



export default SocialMediaView;