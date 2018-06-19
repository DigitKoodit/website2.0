import React from 'react'
import { Row, Column } from '../components/Layout'
import WelcomeView from '../components/WelcomeView'
import EventView from './EventsView'
import SponsorsView from './SponsorsView'
import SocialMediaView from './SocialMediaView'
// import heroImage from '../public/images/niklas3.jpg'

const Home = () => {
  return (
    <div className='site-container'>
      <div className='hero'>
        {/* <img className='hero-image' src={heroImage} alt='digit-hero' /> */}
      </div>
      <Row fullSize>
        <Column
          xs={12}
          sm={6}
          md={6}
          lg={6}
          fullSize
        >
          <EventView />
        </Column>
        <Column
          xs={12}
          sm={6}
          md={6}
          lg={6}
          fullSize
          backgroundColor={'#222'}
          textColor={'#f1f1f1'}>
          <WelcomeView />
        </Column>
      </Row>
      <Row fullSize>
        <Column
          xs={12}
          sm={12}
          md={12}
          lg={12}
          fullSize
        >
          <SponsorsView />
        </Column>
      </Row>
      <Row fullSize>
        <Column
          xs={12}
          sm={12}
          md={12}
          lg={12}
          fullSize
          backgroundColor={'#222'}
          textColor={'#f1f1f1'}>
          <SocialMediaView />
        </Column>
      </Row>
      <Row fullSize>
        <Column
          xs={12}
          sm={12}
          md={12}
          lg={12}
          fullSize
          backgroundColor={'#222'}
          textColor={'#f1f1f1'} />
      </Row>
    </div >
  )
}

export default Home
