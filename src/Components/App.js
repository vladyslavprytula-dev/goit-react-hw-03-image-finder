import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import Container from './Container/Container';
import Seacrchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import MainLoader from './MainLoader/MainLoader';
import Modal from './Modal/Modal';
import Error from './Error/Error';
import picturesApi from '../services/pictures-api';

class App extends Component {
  state = {
    pictures: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    largeImgUrl: '',
    alternative: '',
    arePictureOver: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchPictures();
    }
  }

  formSubmit = data => {
    this.setState({
      searchQuery: data,
      currentPage: 1,
      pictures: [],
      error: null,
    });
  };
  shouldRenderLoadMoreBtn = (page, totalHits) => {
    const a = totalHits - page * 12;
    console.log(a);
    return a > 0
      ? this.setState({ arePictureOver: false })
      : this.setState({ arePictureOver: true });
  };
  scrollDocument = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  fetchPictures = () => {
    const { currentPage, searchQuery } = this.state;
    const options = {
      currentPage,
      searchQuery,
    };

    this.setState({ isLoading: true });

    picturesApi
      .fetchPictures(options)
      .then(({ hits, totalHits }) => {
        this.shouldRenderLoadMoreBtn(this.state.currentPage, totalHits);
        console.log(totalHits);
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
        this.scrollDocument();
      })
      .catch(error => this.setState({ error }))
      .finally(() =>
        this.setState({
          isLoading: false,
        }),
      );
  };

  openModal = e => {
    const { alt } = e.currentTarget;
    this.setState({
      largeImgUrl: e.currentTarget.dataset.source,
      alternative: alt,
    });
  };

  closeModal = () => {
    this.setState({
      largeImgUrl: '',
      alternative: '',
    });
  };

  render() {
    const { pictures, isLoading, largeImgUrl, error, alternative, arePictureOver } = this.state;
    const shouldRenderLoadMoreBtn = !arePictureOver && !isLoading && pictures.length > 0;
    console.log(shouldRenderLoadMoreBtn);
    return (
      <Container>
        <Seacrchbar onSubmit={this.formSubmit} />
        {largeImgUrl && (
          <Modal largeImgUrl={largeImgUrl} alternative={alternative} onClose={this.closeModal} />
        )}
        <ImageGallery images={pictures} onClick={this.openModal} />
        {error && <Error text={error} />}
        {isLoading && (
          <MainLoader>
            <Loader type="ThreeDots" color="#2a829c" height={80} width={80} timeout={0} />
          </MainLoader>
        )}
        {shouldRenderLoadMoreBtn && <Button onClick={this.fetchPictures} />}
      </Container>
    );
  }
}

export default App;
