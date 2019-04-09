import React from 'react';
import 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navigation from '../component/Navigation';
import Home from '../component/Home';
import ProductList from '../component/ProductList';
import NewProduct from '../component/NewProduct';
import EditProduct from '../component/EditProduct';
//import "../styles/productparentcontainer.css";

class ProductParentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  };
  render() {
    return (
      <div className="continer-fluid">
        <h1>PPM - Project Product Management</h1>
        <Navigation />
        {/* Routing should go here */}
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/products/edit/:id" component={EditProduct} />
          <Route path="/products/new" component={NewProduct} />
          <Route path="/products" component={ProductList} />
        </Switch>
      </div>
    );
  }

}
export default ProductParentContainer;