import React from "react";

import PropTypes from "prop-types";

const Select = ({ id, options = [], onChange, selected }) => {
  return (
    <select data-testid={id} value={selected} onChange={onChange}>
      <option value="">Select Langauge</option>
      {options.map((option, idx) => (
        <option selected={option.selected} key={idx} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
}

export default Select;

Select.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
  };
