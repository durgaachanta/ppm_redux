import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTileItem } from '../redux';
import "../styles/producttile.css";


const ProductTile = (props) => {

  const deleteItem = (item) => {
    console.log(item);
    axios.delete(`/deleteproduct/${item.id}`)
      .then((response) => {
        console.log(response);
        //if successfully deleted from MockApi - remove this id from redux store
        props.deleteReduxItem(props.pos);
      })
      .catch((error) => {
        console.log(error);
      });


  }
  return (
    <div className="tile">
      <img className="tileimg" src={props.tileItem.url} alt="shoes" />
      <h2>{props.tileItem.name}</h2>
      <h2>${props.tileItem.price}</h2>
      <button className="tileedit"><Link to={`/products/edit/${props.tileItem.id}`}>EDIT</Link></button>
      <button className="tiledelete" onClick={() => { deleteItem(props.tileItem) }}>Delete</button>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  deleteReduxItem: (id) => { dispatch(deleteTileItem(id)); }
});

export default connect(null, mapDispatchToProps)(ProductTile);