import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImageLink from '../components/ImageLink';


const sponsorList = [
  {
    name: 'Futurice',
    link: 'http://futurice.com/',
    alt: 'sponsor',
    imageUrl: 'http://static.flockler.com/assets/futurice/images/futurice-logo--green-03a1500828cda47cf3a221faeea0937c5634986c37049f83d3d464dc6c82cec3.svg',
    weight: 2
  },
  {
    name: 'Wapice',
    link: 'https://www.wapice.com/fi/?landing=0',
    alt: 'sponsor',
    imageUrl: 'http://vaasanseutu.fi/app/uploads/2016/08/Wapice_Logo-1024x254.jpg'
  },
  {
    name: 'Reaktor',
    link: 'https://www.reaktor.com/',
    alt: 'sponsor',
    imageUrl: 'http://www.koodikoulu.fi/static/media/logo-reaktor.png'
  }
]

const SponsorsView = () => (
  <div className="site-content text-center">
    <h2>Yhteistyössä</h2>
    <div className="flex-container margin-1">
      {sponsorList && (
        sponsorList.map(sponsor => (
          <div
            key={sponsor.name}
            className="flex-item sponsor-logo"
          >
            <ImageLink
              name={sponsor.name}
              link={sponsor.link}
              imageUrl={sponsor.imageUrl}
              alt={sponsor.alt}
            />
          </div>
        ))
      )}
    </div>
    <Link className="link margin-1" to='sponsors'>Yhteistyöhon Digitin kanssa?</Link>
  </div>
)

SponsorsView.propTypes = {
  sponsorList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    weight: PropTypes.number
  }))
}



export default SponsorsView;