import React from 'react';
import PropTypes from 'prop-types';
import { Column } from './Layout';

const WelcomeView = () => (
  <Column
    sm={12}
    md={8}
    lg={6}
    textColor="#f1f1f1">
    <div className="site-content">
      <h2>Digit ry?</h2>
      <p>Digit ry on Turun yliopiston tietotekniikan, tietoliikennetekniikan ja elektroniikan diplomi-insinööriopiskelijoiden ainejärjestö, perustettu syksyllä 1999 ja se on edelleen yksi Suomen nuorimmista teekkarikilloista.</p>
      <p>Jäseniä meillä on tällä hetkellä jo pitkälti kolmatta sataa ja kasvaneen aloituspaikkamäärän myötä tulemme kasvamaan nopeasti myös jatkossa.</p>
      <p > Nuoruudesta ja pienestä koosta johtuen Digit on hyvin dynaaminen ja ympäristöönsä sopeutuva yhdistys, jolla on myös hyvät ja aktiiviset suhteet muihin Turun seudun it- alan opiskelijajärjestöihin.</p >
    </div>
  </Column>
)

WelcomeView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default WelcomeView;
