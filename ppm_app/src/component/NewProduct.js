import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addNewProduct } from '../redux';
import "../styles/productbody.css";

class NewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      url: '',
    }

  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  formSubmit = (event) => {
    event.preventDefault();
    //mockapi automatically updates is but redux is not capable of automatically updating id
    var newProduct = {
      name: this.state.name,
      price: this.state.price,
      url: this.state.url,
    }
    // axios call to post this data to MockAPI
    console.log(newProduct);
    axios.post('/addnewproduct', newProduct)
      .then((response) => {
        //console.log(response);
        //update Redux store
        if (response.status === 200) {
          var id = this.props.prodList.length + 1;
          var newProductRedux = {
            id: id.toString(),
            url: this.state.url,
            name: this.state.name,
            price: this.state.price,
          };
          this.props.addNewProduct(newProductRedux);
          //clear the state
          this.setState({ name: '', price: '', url: '' });
          //reroute to Product List page
          this.props.history.push('/products');

        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {
    return (
      <div className="bodycontainer">
        <h1>Create a New Product</h1>
        <form onSubmit={this.formSubmit}>
          <div className="newprodinput">
            <label className="newprodlabel" htmlFor="name">Title</label>
            <input className="newprodbox" name="name" onChange={this.handleChange} value={this.state.name} />
          </div>
          <div className="newprodinput">
            <label className="newprodlabel" htmlFor="price">Price</label>
            <input className="newprodbox" name="price" onChange={this.handleChange} value={this.state.price} />
          </div>
          <div className="newprodinput">
            <label className="newprodlabel" htmlFor="url">Image Url</label>
            <input className="newprodbox" name="url" onChange={this.handleChange} value={this.state.url} />
          </div>
          <button className="btn btn-success btn-lg">CREATE</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  prodList: state.productList,

});

const mapDispatchToProps = (dispatch) => ({
  addNewProduct: (product) => {
    dispatch(addNewProduct(product));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);