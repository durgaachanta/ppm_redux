import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/navigation.css";

const Navigation = (props) => {
  return (
    <div id="navigation">
      <Link className="navtab" to="/home">Home</Link>
      <Link className="navtab" to="/products">Product List</Link>
      <Link className="navtab" to="/products/new">Product Creation</Link>
    </div>

  );

}
export default Navigation;