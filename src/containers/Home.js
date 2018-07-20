import React from 'react'
// import { Row, Column } from '../components/Layout'
import WelcomeView from '../components/WelcomeView'
import EventView from './EventsView'
import SponsorsView from './SponsorsView'
import SocialMediaView from './SocialMediaView'
import heroImage from '../public/images/niklas3.jpg'
import { Hero, HeroBody, Container, HeroHeader, Nav, NavItem, NavLeft, Tile, Columns, Column } from 'bloomer'

const Home = () => {
  return (
    <Container isFluid>
      <Hero isSize='large'>
        <HeroHeader>
          <Nav>
            <NavLeft>
              <NavItem>
                Digit
              </NavItem>
            </NavLeft>
          </Nav>
        </HeroHeader>
        <HeroBody>
          <Container isFluid>
            <img className='hero-image' src={heroImage} alt='digit-hero' />
          </Container>
        </HeroBody>
      </Hero>

      <Tile>
        <Column isSize='1/2'>
          <EventView />
        </Column>
        <Column isSize='1/2'>
          <WelcomeView />
        </Column>
      </Tile>
      <Columns>
        <Column>
          <SponsorsView />
        </Column>
      </Columns>
      <Columns>
        <Column>
          <SocialMediaView />
        </Column>
      </Columns>
    </Container >
  )
}

export default Home
