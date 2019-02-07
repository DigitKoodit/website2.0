import PropTypes from 'prop-types'

const eventOptionPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  public: PropTypes.bool.isRequired,
  // order: PropTypes.number,
  reserveCount: PropTypes.string,
  reserveEndAt: PropTypes.string,
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
      reserveCount: PropTypes.number
    })
  ])
})

const eventPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  activeAt: PropTypes.string.isRequired,
  activeUntil: PropTypes.string.isRequired,
  reservedUntil: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  maxParticipants: PropTypes.number.isRequired,
  reserveCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape(eventOptionPropTypes))
})

export default eventPropTypes
export {
  eventOptionPropTypes
}
