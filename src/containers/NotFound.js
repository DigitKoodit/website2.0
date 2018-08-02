import React from 'react'
import { Column, Title } from 'bloomer'
import { Base } from '../components/Layout'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <Base htmlTitle='Digit - 404'>
    <Column>
      <Title hasTextAlign='centered'>
        <Link to='/'>Tyhjää <br />404</Link>
      </Title>
    </Column>
  </Base>
)

export default NotFound
