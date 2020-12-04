import React from 'react';
import './Error.scss';

const Error = ({ text }) => (
  <div className="Error">Something went wrong:{text}</div>
);

export default Error;
