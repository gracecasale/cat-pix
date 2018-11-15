import React, { Component } from 'react';
import Modal from "react-modal";
import Axios from 'axios';
import './App.css';

const appElement = document.getElementById('root');
Modal.setAppElement(appElement);

const CATPIX_API = isDev ? '/activity' : 'https://aws.random.cat/meow';

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
        const { activty } = response.data;
        const { participants } = response.data;
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
        <header className="App-header">
          Cat Pix App
       </header>
        <main className="App-main">
          <div class="wrapper">

            <div class="cat">
              <span class="eyes left"></span>
              <span class="eyes right"></span>
              <span class="mouth"></span>
            </div>

            <div class="moon">
              <div class="sphere"></div>

            </div>

            <div class="cloud-container">
              <div class="cloud"></div>
              <div class="cloud"></div>
              <div class="cloud"></div>
              <div class="cloud"></div>
            </div>

          </div>

        </main>
        <footer className="App-footer">

        </footer>
      </div >
    );
  }
}

export default App;
