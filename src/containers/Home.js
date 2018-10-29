import React from 'react'
import Helmet from 'react-helmet'
import WelcomeView from '../components/WelcomeView'
import EventView from './EventsView'
import SponsorsView from './SponsorsView'
import SocialMediaView from './SocialMediaView'
import SocialMediaFeed from './SocialMediaFeed'
import heroImage from '../public/images/hero-16x9.jpg'
import { Hero, HeroBody, Tile, Section, Columns, Column } from 'bloomer'

const heroBgStyle = {
  backgroundImage: `url(${heroImage})`,
  backgroundSize: '220vh',
  backgroundPositionX: '47%',
  backgroundPositionY: '-32vh'
}
const isDev = process.env.NODE_ENV === 'development'
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Digit ry</title>
      </Helmet>
      <Hero isSize='small' className='is-halfheight'>
        <HeroBody isPaddingless className='has-bg-img' style={heroBgStyle} />
      </Hero>
      <Columns isCentered>
        <Column isSize={{ mobile: 'full', desktop: '3/4', widescreen: '2/3' }} >
          <Section className='p-4' id='bulma-override-section'>
            <Tile isAncestor id='bulma-override-tile'>
              <WelcomeView />
              <EventView />
            </Tile>
          </Section>
          {isDev
            ? <Section className='p-4 pt-0' id='bulma-override-section'>
              <Tile isAncestor id='bulma-override-tile'>
                <SocialMediaFeed />
                <SponsorsView />
              </Tile>
            </Section>
            : <Section className='p-4 pt-0' id='bulma-override-section'>
              <Tile isAncestor id='bulma-override-tile'>
                <SponsorsView />
              </Tile>
            </Section>
          }
          <Section className='p-4' id='bulma-override-section'>
            <SocialMediaView />
          </Section>
        </Column>
      </Columns>
    </>
  )
}

export default Home
