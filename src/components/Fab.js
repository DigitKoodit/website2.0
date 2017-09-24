import React from 'react';

const Fab = ({ icon, radius, color, fabStyles, className, fabClassName, onClick }) => {
  const styles = {
    width: radius,
    height: radius,
    ...fabStyles
  }
  const buttonStyles = {
    width: radius,
    height: radius,
    backgroundColor: color
  }

  return (
    <div
      style={styles}
      className={'fab ' + className}
    >
      <span
        style={buttonStyles}
        className={'fab-action-button ' + fabClassName}
        onClick={event => onClick(event)}
      >
        <i
          className="fab-action-button__icon"
          style={{ backgroundImage: 'url(' + icon + ')' }}
        />
      </span>
    </div >
  )
}
export default Fab;
