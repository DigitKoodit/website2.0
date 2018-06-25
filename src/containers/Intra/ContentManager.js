import React from 'react'
import PropTypes from 'prop-types' //
import fetch from 'fetch-hoc'
import PageEditor from '../Content/PageEditor'

const IntraPage = ({ data: siteContent }) => {
  return (
    // React Components in JSX look like HTML tags
    <div className='site-container'>
      <div className='site-content'>
        <div className='row'>
          <div className='col-xs-12 margin-1'>
            <h1>Intra</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12' />
          {siteContent &&
            <PageEditor
              initialData={siteContent} />
          }
        </div>
      </div>
    </div >
  )
}

IntraPage.propTypes = {
  data: PropTypes.object
}

const apiUrl = '/api/content/1'
const fetchContent = url => fetch(url)(IntraPage)

export default fetchContent(apiUrl)
