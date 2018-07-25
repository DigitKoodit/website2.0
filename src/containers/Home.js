import React from 'react'
// import { Row, Column } from '../components/Layout'
import WelcomeView from '../components/WelcomeView'
import EventView from './EventsView'
import SponsorsView from './SponsorsView'
import SocialMediaView from './SocialMediaView'
import heroImage from '../public/images/niklas3.jpg'
import { Hero, HeroBody, HeroFooter, Tabs, Tab, TabLink, TabList, Container, HeroHeader, Nav, NavItem, NavLeft, Tile, Columns, Column, Title, NavCenter, Icon, NavRight } from 'bloomer'

const Home = () => {
  return (
    <div>
      <Hero isSize='large' isHalfHeight>
        <img className='hero-image' src={heroImage} alt='digit-hero' />
      </Hero>
      <Tile>
        <Column isSize='1/2'>
          <WelcomeView />
        </Column>
        <Column isSize='1/2'>
          <EventView />
        </Column>
      </Tile>
      <Columns isCentered>
        <SponsorsView />
      </Columns>

      <SocialMediaView />

    </div >
  )
}

export default Home
