import React from 'react'
import PropTypes from 'prop-types' //
import fetch from 'fetch-hoc'
import PageEditor from '../Content/PageEditor'
import Base from '../../components/Layout/Base'

const ContentManager = ({ data: siteContent }) => {
  return (

    <Base>
      <div className='row'>
        <div className='col-xs-12'>
          <h2>Intra</h2>
          {siteContent &&
            <PageEditor
              initialData={siteContent} />
          }
        </div>
      </div>
    </Base>
  )
}

ContentManager.propTypes = {
  data: PropTypes.object
}

const apiUrl = '/api/content/1'
const fetchContent = url => fetch(url)(ContentManager)

export default fetchContent(apiUrl)
