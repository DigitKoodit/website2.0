import React from 'react'
import { Footer, Container, Columns, Column, Content } from 'bloomer'

import '../styles/footer.css'

const SiteFooter = () => (
  <Footer className='footer-container'>
    <Container>
      <Content >
        <Columns>
          <Column hasTextAlign='centered'>
            <p>Digit ry © {new Date().getFullYear()}<br />
              Agora, 20014 Turun yliopisto</p>
          </Column>
        </Columns>
      </Content>
    </Container>
  </Footer >
)

export default SiteFooter
