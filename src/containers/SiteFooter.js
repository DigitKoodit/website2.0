import React from 'react'
import { Footer, Container, Columns, Column, Content } from 'bloomer'

import '../styles/footer.scss'

const SiteFooter = () => (
  <Footer className='footer-container'>
    <Container>
      <Content >
        <Columns>
          <Column hasTextAlign='centered'>
            <address>
              <p>Digit ry © {new Date().getFullYear()}<br />
                Vesilinnantie 5<br />
                Agora, 20014 Turun yliopisto<br />
                Finland<br />
                E-mail: digit [ät] utu.fi</p>
            </address>
          </Column>
        </Columns>
      </Content>
    </Container>
  </Footer >
)

export default SiteFooter
