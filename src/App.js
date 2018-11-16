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
    }
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }
  handleModalOpen() {
    axios.get(CATPIX_API)
      .then(response => {
        const { source } = response.data.file;
        this.setState({
          modalOpen: true,
          error: null
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
      <div>
        {this.state.error && <div className="red bg-black f4 mb4 h3 w5">
          Error: {this.state.error.message}</div>}
        <Modal classcloseTimeoutMS={150} isOpen={this.state.modalOpen}>

          <header className="App-header">
            <button className="f1 ph3 pv2 mb2 dib white bg-black b--none" onClick={this.handleModalClose}>X</button>
          </header>
          </Modal>


          <div className="flex flex-column h-100" onClick={this.handleModalOpen}>

            <main className="App-main">
              <div class="drawing-holder">
                <div class="cat-face">
                  <div class="cat-eyes"></div>
                  <div class="cat-nose"></div>
                  <div class="cat-mouth"></div>
                </div>
              </div>

              <h1>Here is a cat...</h1>
              <p>{this.state.source}</p>
            </main>
            <footer className="App-footer">
            </footer>
          </div >

      </div>
    );
  }
}

export default App;
