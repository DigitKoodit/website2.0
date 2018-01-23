import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({ label, value, handleChange, options, ...inputAttributes }) => (
  <div className={options.containerClass}>
    {label && <label className={options.labelClass}>{label}</label>}
    {(options.lines == null || options.lines <= 1) ? (
      <input
        type="text"
        placeholder={options.placeholder}
        value={value}
        maxLength={options.maxLength}
        onChange={handleChange}
        name={label}
        {...inputAttributes}
      />
    ) : (
        <textarea
          type="text"
          placeholder={options.placeholder}
          value={value}
          maxLength={options.maxLength}
          onChange={handleChange}
          name={label}
          {...inputAttributes}
        />
      )}
  </div>
)

export default InputText;
