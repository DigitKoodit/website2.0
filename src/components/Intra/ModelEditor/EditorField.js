import React from 'react'
import PropTypes from 'prop-types'

const EditorField = ({ label, children }) => (
  <p className='mt-1'><span className='has-text-grey-light has-text-weight-semibold'>{label} </span>{children}</p>
)

EditorField.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default EditorField
