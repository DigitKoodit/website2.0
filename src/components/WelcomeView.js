import React from 'react'
// import { Column } from './Layout'
import { Tile, Box, Title } from 'bloomer'

const WelcomeView = () => (
  <Tile isParent isSize={4} id='bulma-override-tile'>
    <Tile isChild render={
      props => (
        <Box {...props} >
          <Title className='highlight-left-yellow'>Digit ry?</Title>
          <p>Digit ry on Turun yliopiston tietotekniikan, tietoliikennetekniikan ja elektroniikan diplomi-insinööriopiskelijoiden ainejärjestö, perustettu syksyllä 1999 ja se on edelleen yksi Suomen nuorimmista teekkarikilloista.</p>
          <p>Jäseniä meillä on tällä hetkellä jo pitkälti kolmatta sataa ja kasvaneen aloituspaikkamäärän myötä tulemme kasvamaan nopeasti myös jatkossa.</p>
          <p > Nuoruudesta ja pienestä koosta johtuen Digit on hyvin dynaaminen ja ympäristöönsä sopeutuva yhdistys, jolla on myös hyvät ja aktiiviset suhteet muihin Turun seudun it- alan opiskelijajärjestöihin.</p >
        </Box>
      )
    } />
  </Tile>
)

export default WelcomeView
