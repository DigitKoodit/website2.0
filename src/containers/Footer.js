import React from 'react'

const Footer = () => (
  <div className='footer'>
    <div className='footer-container'>
      <div className='row center-xs'>
        <div className='col-xs-12'>
          <span className='copyright-text'>
            {`Digit ry © ${new Date().getFullYear()}. Kaikki oikeudet pidätetään.`}
          </span>
        </div>
      </div>
    </div>
  </div>
)

export default Footer
