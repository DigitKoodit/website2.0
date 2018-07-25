import React from 'react'
// import { Column } from './Layout'
import { Tile, Box, Title, Content, Container } from 'bloomer'

const WelcomeView = () => (
  <Container isFluid style={{ marginTop: 10 }}>
    <Content isSize='medium'>
      <h2>Mikä Digit ry?</h2>
      <p>Digit ry on Turun yliopiston tietotekniikan, tietoliikennetekniikan ja elektroniikan diplomi-insinööriopiskelijoiden ainejärjestö, perustettu syksyllä 1999 ja se on edelleen yksi Suomen nuorimmista teekkarikilloista.</p>
      <p>Jäseniä meillä on tällä hetkellä jo pitkälti kolmatta sataa ja kasvaneen aloituspaikkamäärän myötä tulemme kasvamaan nopeasti myös jatkossa.</p>
      <p > Nuoruudesta ja pienestä koosta johtuen Digit on hyvin dynaaminen ja ympäristöönsä sopeutuva yhdistys, jolla on myös hyvät ja aktiiviset suhteet muihin Turun seudun it- alan opiskelijajärjestöihin.</p >
    </Content>
  </Container>

  // <Tile isParent>
  //   <Tile isChild render={
  //     props => (
  //       <Box {...props}>
  //         <Title>Digit ry?</Title>
  //         <p>Digit ry on Turun yliopiston tietotekniikan, tietoliikennetekniikan ja elektroniikan diplomi-insinööriopiskelijoiden ainejärjestö, perustettu syksyllä 1999 ja se on edelleen yksi Suomen nuorimmista teekkarikilloista.</p>
  //         <p>Jäseniä meillä on tällä hetkellä jo pitkälti kolmatta sataa ja kasvaneen aloituspaikkamäärän myötä tulemme kasvamaan nopeasti myös jatkossa.</p>
  //         <p > Nuoruudesta ja pienestä koosta johtuen Digit on hyvin dynaaminen ja ympäristöönsä sopeutuva yhdistys, jolla on myös hyvät ja aktiiviset suhteet muihin Turun seudun it- alan opiskelijajärjestöihin.</p >
  //       </Box>
  //     )
  //   } />
  // </Tile>
)

export default WelcomeView
