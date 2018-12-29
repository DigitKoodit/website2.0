import React from 'react'
// import { Column } from './Layout'
import { Tile, Box, Title } from 'bloomer'

const WelcomeView = () => (
  <Tile isParent isSize={4} id='bulma-override-tile'>
    <Tile isChild render={
      props => (
        <Box {...props}>
          <Title className='highlight-left-yellow'>Digit ry?</Title>
          <p className='mb-1'>Di&shy;git on Tu&shy;run y&shy;li&shy;o&shy;pis&shy;ton tie&shy;to&shy;tek&shy;nii&shy;kan, tie&shy;to&shy;lii&shy;ken&shy;ne&shy;tek&shy;nii&shy;kan ja e&shy;lek&shy;tro&shy;nii&shy;kan dip&shy;lo&shy;mi-in&shy;si&shy;nöö&shy;ri&shy;o&shy;pis&shy;ke&shy;li&shy;joi&shy;den ai&shy;ne&shy;jär&shy;jes&shy;tö, pe&shy;rus&shy;tet&shy;tu syk&shy;syl&shy;lä 1999 ja se on e&shy;del&shy;leen yk&shy;si Suo&shy;men nuo&shy;rim&shy;mis&shy;ta teek&shy;ka&shy;ri&shy;kil&shy;lois&shy;ta.</p>
          <p className='mb-1'>Jä&shy;se&shy;ni&shy;ä meil&shy;lä on täl&shy;lä het&shy;kel&shy;lä jo pit&shy;käl&shy;ti kol&shy;mat&shy;ta sa&shy;taa ja kas&shy;va&shy;neen a&shy;loi&shy;tus&shy;paik&shy;ka&shy;mää&shy;rän myö&shy;tä tu&shy;lem&shy;me kas&shy;va&shy;maan no&shy;pe&shy;as&shy;ti myös jat&shy;kos&shy;sa.</p>
          <p>Nuo&shy;ruu&shy;des&shy;ta ja pie&shy;nes&shy;tä koos&shy;ta joh&shy;tu&shy;en Di&shy;git on hy&shy;vin dy&shy;naa&shy;mi&shy;nen ja ym&shy;pä&shy;ris&shy;töön&shy;sä so&shy;peu&shy;tu&shy;va yh&shy;dis&shy;tys, jol&shy;la on myös hy&shy;vät ja ak&shy;tii&shy;vi&shy;set suh&shy;teet mui&shy;hin Tu&shy;run seu&shy;dun it- alan o&shy;pis&shy;ke&shy;li&shy;ja&shy;jär&shy;jes&shy;töi&shy;hin.</p >
        </Box>
      )
    } />
  </Tile>
)

export default WelcomeView
