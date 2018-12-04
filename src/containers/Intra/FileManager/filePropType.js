import PropTypes from 'prop-types'

export default {
  filename: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  size: PropTypes.number,
  description: PropTypes.string,
  createdAt: PropTypes.string
}
