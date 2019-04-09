import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ProductTile from './ProductTile';
import { updateState } from '../redux';
import "../styles/productbody.css";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // productList: [],
    };
  };
  componentDidMount = () => {
    console.log("on component did mount");
    //axios call to fetch data from MockApi
    axios.get('http://localhost:1337/fetchproducts')
      .then((response) => {
        console.log(response);
        //push it to redux
        //this.setState({ productList: response.data });
        this.props.updatereduxStore(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

  }
  render() {
    console.log(this.props.prodList);
    return (
      <div className="bodycontainer">
        <h1>Products List</h1>
        {this.props.prodList.map((item, index) => {
          return (<ProductTile tileItem={item} pos={index} />)
        })}
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  prodList: state.productList,
});

const mapDispatchToProps = (dispatch) => ({
  updatereduxStore: (data) => {
    dispatch(updateState(data));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);