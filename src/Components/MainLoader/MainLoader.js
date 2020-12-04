import React from 'react';
import PropTypes from 'prop-types';
import './MainLoader.scss';

const MainLoader = ({ children }) => <div className="Loader">{children}</div>;

MainLoader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLoader;
