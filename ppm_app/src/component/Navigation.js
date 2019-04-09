import React from 'react';
import { Link } from 'react-router-dom';
//import "../styles/navigation.css";

const Navigation = (props) => {
  return (
    <div className="row align-items-center">
      <Link className="col" to="/home">Home</Link>
      <Link className="col" to="/products">Product List</Link>
      <Link className="col" to="/products/new">Product Creation</Link>
    </div>

  );

}
export default Navigation;