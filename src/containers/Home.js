import React from 'react';
import Row from '../components/Row';
import Column from '../components/Column'
import WelcomeView from '../components/WelcomeView';
import EventView from './EventsView';
import SponsorsView from './SponsorsView';
import SocialMediaView from './SocialMediaView';
import OfficersRenderer from '../components/OfficerRenderer';

const Home = () => {
  return (
    <div className="site-container">
      <div className="hero">
        <img className="hero-image" src="/images/niklas3.jpg" alt="digit-hero" />
      </div>
      <Row fullSize>
        <Column
          xs={12}
          sm={4}
          md={4}
          lg={4}
          fullSize
        >
          <EventView />
        </Column>
        <Column
          xs={12}
          sm={8}
          md={8}
          lg={8}
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
          textColor={'#f1f1f1'}>
          <OfficersRenderer />
        </Column>
      </Row>
    </div >
  )
}

export default Home
