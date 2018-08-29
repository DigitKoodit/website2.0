import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import WelcomeView from '../components/WelcomeView'
import EventView from './EventsView'
import SponsorsView from './SponsorsView'
import SocialMediaView from './SocialMediaView'
import SocialMediaFeed from './SocialMediaFeed'
import heroImage from '../public/images/hero-16x9.jpg'
import { Hero, HeroBody, Tile, Section } from 'bloomer'

const heroBgStyle = { backgroundImage: `url(${heroImage})` }
const Home = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Digit ry</title>
      </Helmet>
      <Hero isSize='small' className='is-halfheight'>
        <HeroBody isPaddingless className='has-bg-img' style={heroBgStyle} />
      </Hero>
      <Section className='pt-4'>
        <Tile isAncestor>
          <WelcomeView />
          <EventView />
        </Tile>
      </Section>
      <Section className='pt-4'>
        <Tile isAncestor>
          <SocialMediaFeed />
        </Tile>
      </Section>
      <SponsorsView />
      <SocialMediaView />
    </Fragment>
  )
}

export default Home
