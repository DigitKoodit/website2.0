import React from 'react'
import Helmet from 'react-helmet'
import WelcomeView from '../components/WelcomeView'
import EventView from './EventView'
import SponsorsView from './SponsorsView'
import SocialMediaView from './SocialMediaView'
import SocialMediaFeed from './SocialMediaFeed'
import heroImage from '../public/images/hero-16x9.jpg'
import { Hero, HeroBody, Tile, Section, Columns, Column } from 'bloomer'

const heroBgStyle = {
  backgroundImage: `url(${heroImage})`,
  backgroundSize: '220vh',
  backgroundPositionX: '47%',
  backgroundPositionY: '-32vh',
  backgroundRepeat: 'no-repeat'
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
      <Columns isCentered className='is-marginless'>
        <Column isSize={{ mobile: 'full', desktop: 'full', widescreen: '3/4' }} className='is-paddingless'>
          <Section className='frontpage-responsive-section'>
            <Tile isAncestor className='frontpage-responsive-tile'>
              <WelcomeView />
              <EventView />
            </Tile>
          </Section>
          {isDev
            ? <Section className='frontpage-responsive-section'>
              <Tile isAncestor className='frontpage-responsive-tile'>
                <SocialMediaFeed />
                <SponsorsView />
              </Tile>
            </Section>
            : <Section className='frontpage-responsive-section'>
              <Tile isAncestor className='frontpage-responsive-tile'>
                <SponsorsView />
              </Tile>
            </Section>
          }
          <Section>
            <SocialMediaView />
          </Section>
        </Column>
      </Columns>
    </>
  )
}

export default Home
