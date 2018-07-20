import React from 'react'
import { Footer, Container, Columns, Content } from 'bloomer'

import '../styles/footer.css'

const MainFooter = () => (
  <Footer className='footer-container'>
    <Container>
      <Columns isCentered>
        <Content hasTextColor='white'>
          Digit ry © {new Date().getFullYear()}. Kaikki oikeudet pidätetään.
        </Content>
      </Columns>
    </Container>
  </Footer>
)

export default MainFooter
