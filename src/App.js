import React, { Component } from 'react';
import Modal from "react-modal";
import axios from 'axios';

import './App.css';

const appElement = document.getElementById('root');
Modal.setAppElement(appElement);

const CATPIX_API = 'https://aws.random.cat/meow';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      error: null,
      file: ''
    }
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }
  handleModalOpen() {
    axios.get(CATPIX_API)
      .then(response => {
        const file = response.data.file;
        this.setState({
          modalOpen: true,
          error: null,
          file: file
        });
      })
      .catch(err => {
        this.setState({
          error: err
        });
      })
  }
  handleModalClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <div className="container">
        {this.state.error && <div className="">
          Error: {this.state.error.message}</div>}
        <Modal classcloseTimeoutMS={150} isOpen={this.state.modalOpen} className="modal">
          <header className="App-header">
            <button className="x-button" onClick={this.handleModalClose}>X</button>
          </header>
          <div>
            <h1>Here is a cat...</h1>
            <img src={this.state.file} alt="Random cat." className="cat-image"></img>
          </div>

        </Modal>
        <div className="">
          <main className="App-main">
            <div className="drawing-holder" onClick={this.handleModalOpen}>
              <div className="cat-face">

                <div className="cat-nose"></div>
                <div className="cat-mouth"></div>
                <div className="cat-eyes"></div>
              </div>
            </div>

          </main>
        </div>

        <footer className="App-footer">
        </footer>
      </div>
    );
  }
}

export default App;
