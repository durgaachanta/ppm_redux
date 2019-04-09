//create a server
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
//app.use(cors());


//point it to the build directory
app.use(express.static(__dirname + '../../ppm_app/build/'));

//fetch data into Redux from MockApi
app.get('/fetchproducts', (req, res) => {
  //axios call to fetch data from MockAPI
  axios.get('http://5c983a812e1ca60014d60d43.mockapi.io/product')
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

//post data
app.post('/addnewproduct', (req, res) => {
  console.log(req.body);
  //axios call to post data to MockAPI
  axios.post('http://5c983a812e1ca60014d60d43.mockapi.io/product', req.body)
    .then((response) => {
      if (response.status === 201) {
        res.json({
          status: "success",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
//delete data
app.delete('/deleteproduct/:id', (req, res) => {


  axios.delete(`http://5c983a812e1ca60014d60d43.mockapi.io/product/${req.params.id}`)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        res.json("successfully deleted");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

//edit data
//axios put needs both body and id
app.put('/editProduct/:id', (req, res) => {
  console.log(req.body);
  axios.put(`http://5c983a812e1ca60014d60d43.mockapi.io/product/${req.params.id}`, req.body)
    .then((response) => {
      if (response.status === 200) {
        res.json("Successfully updated");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

//listen to a port
app.listen(1337);