import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className='notFound'>
    <h1 className='title'>
      <Link to='/'>404</Link>
    </h1>
  </div>
)

export default NotFound
