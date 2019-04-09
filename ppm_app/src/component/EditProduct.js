import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { deleteTileItem, updateProductData } from '../redux';
import "../styles/productbody.css";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      url: '',
      index: '',
    };
  };

  componentDidMount = () => {
    var editableProduct = this.props.product.find(item => item.id === this.props.match.params.id);
    var index = this.props.product.findIndex(item => item.id === this.props.match.params.id);
    console.log(index);
    this.setState({
      name: editableProduct.name,
      price: editableProduct.price,
      url: editableProduct.url,
      index: index,
    });


  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  deleteItem = (id) => {
    axios.delete(`/deleteproduct/${id}`)
      .then((response) => {
        console.log(response);
        //if successfully deleted from MockApi - remove this id from redux store
        this.props.deleteProduct(this.state.index);
        //reroute page to product list
        this.props.history.push('/products');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateItem = () => {
    //capture the input into a json object
    var updatedObject = {
      name: this.state.name,
      price: this.state.price,
      url: this.state.url,
    };

    //axios call to update data
    axios.put(`/editProduct/${this.props.match.params.id}`, updatedObject)
      .then((response) => {
        console.log(response);
        //if successful update redux store 
        this.props.updateProductRedux(this.state.index, updatedObject);

        //reroute to product list
        this.props.history.push('/products');
      })
      .catch((error) => {
        console.log(error);
      })

  }

  formSubmit = (event) => {
    event.preventDefault();
  }

  render() {

    return (
      <div className="bodycontainer">
        <h1>Edit Product</h1>
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
          <button id="newproddelbtn" onClick={() => { this.deleteItem(this.props.match.params.id) }}>Delete</button>
          <button id="newprodupdbtn" onClick={this.updateItem}>Update</button>
        </form>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  product: state.productList,

});

const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (id) => { dispatch(deleteTileItem(id)) },
  updateProductRedux: (idx, item) => { dispatch(updateProductData(idx, item)) },


});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);