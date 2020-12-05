import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.scss';
import defaultImag from './no_icon.png';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static defaultProps = {
    largeImgUrl: defaultImag,
  };
  static propTypes = {
    largeImgUrl: PropTypes.string,
    alternative: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handelKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyDown);
  }

  handelKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handelOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImgUrl, alternative } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handelOverlayClick}>
        <div className="Modal">
          <img src={largeImgUrl} alt={alternative} className="Image" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
