import React from 'react'
// import { Row, Column } from '../components/Layout'
import WelcomeView from '../components/WelcomeView'
import EventView from './EventsView'
import SponsorsView from './SponsorsView'
import SocialMediaView from './SocialMediaView'
import heroImage from '../public/images/niklas3.jpg'
import { Hero, HeroBody, Container, HeroHeader, Nav, NavItem, NavLeft, Tile, Columns, Column, Title } from 'bloomer'

const Home = () => {
  return (
    <div>
      <Hero isSize='large' isHalfHeight>
        <img className='hero-image' src={heroImage} alt='digit-hero' />
      </Hero>
      <Tile>
        <Column isSize='1/2'>
          <EventView />
        </Column>
        <Column isSize='1/2'>
          <WelcomeView />
        </Column>
      </Tile>
      <Columns isCentered>
        <SponsorsView />
      </Columns>
      <Columns isCentered>
        <SocialMediaView />
      </Columns>
    </div >
  )
}

export default Home
