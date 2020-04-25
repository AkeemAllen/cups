import React from 'react';
import PropTypes from 'prop-types';

const FormErrors = ({ formErrors }) => {
  return (
    <div style={style.formErrors}>
      {Object.keys(formErrors).map((fieldName, i) => {
        if (formErrors[fieldName].length > 0) {
          return <p key={i}>{formErrors[fieldName]}</p>;
        } else {
          return '';
        }
      })}
    </div>
  );
};

FormErrors.propTypes = {
  formErrors: PropTypes.any
};

export { FormErrors };

const style = {
  formErrors: {
    color: 'red'
  }
};
