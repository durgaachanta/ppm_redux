import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'; //do not forget this - else route will not work
import ProductParentContainer from './container/ProductParentContainer';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ProductParentContainer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
