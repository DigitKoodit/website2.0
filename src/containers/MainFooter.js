import React from 'react'
import { Footer, Container, Columns, Column, Content, Box } from 'bloomer'

import '../styles/footer.css'

const MainFooter = () => (
  <Footer className='footer-container'>
    <Container>
      <Content >
        <Columns>
          <Column hasTextAlign='centered'>
            <p>Digit ry © {new Date().getFullYear()}.</p>
            <p>Kaikki oikeudet pidätetään.</p>
          </Column>
        </Columns>
      </Content>
    </Container>
  </Footer >
)

export default MainFooter
