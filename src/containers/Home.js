import React, { Fragment } from 'react'
// import { Row, Column } from '../components/Layout'
import WelcomeView from '../components/WelcomeView'
import EventView from './EventsView'
import SponsorsView from './SponsorsView'
import SocialMediaView from './SocialMediaView'
import heroImage from '../public/images/hero-16x9.jpg'
import { Hero, HeroBody, Tile } from 'bloomer'

const heroBgStyle = { backgroundImage: `url(${heroImage})` }
const Home = () => {
  return (
    <Fragment>
      <Hero isSize='small' className='is-halfheight'>
        <HeroBody isPaddingless className='has-bg-img' style={heroBgStyle} />
      </Hero>
      <Tile isAncestor>
        <WelcomeView />
        <EventView />
      </Tile>

      <SponsorsView />
      <SocialMediaView />
    </Fragment >
  )
}

export default Home
