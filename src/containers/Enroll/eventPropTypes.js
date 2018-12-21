import PropTypes from 'prop-types'

const eventOptionPropTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  public: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  reserveCount: PropTypes.string.isRequired,
  reserveEndAt: PropTypes.string.isRequired,
  maxParticipants: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  lines: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      isDefault: PropTypes.bool.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
      ]).isRequired,
      maxParticipants: PropTypes.number,
      reserveCount: PropTypes.number

    })
  ]).isRequired
}

const eventPropTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  activeAt: PropTypes.string.isRequired,
  activeUntil: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  maxParticipants: PropTypes.number.isRequired,
  reserveCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape(eventOptionPropTypes))
}

export default eventPropTypes
export {
  eventOptionPropTypes
}
