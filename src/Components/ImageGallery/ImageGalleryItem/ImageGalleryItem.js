import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.scss';
import defaultImag from './no_icon.png';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, onClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        className="ImageGalleryItem-image"
        onClick={onClick}
      />
    </li>
  );
};

ImageGalleryItem.defaultProps = {
  webformatURL: defaultImag,
  largeImageURL: defaultImag,
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
