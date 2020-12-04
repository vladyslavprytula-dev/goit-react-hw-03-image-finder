import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ onClick }) => (
  <button type="button" className="Button" onClick={onClick}>
    Load more
  </button>
);

Button.protoTypes = {
  onclick: PropTypes.func.isRequired,
};

export default Button;
