import React, {useState} from "react";
import { getProductsbyId, updateProduct } from "../../../api";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));



// Place holder to update product

export default function Update(props) {

  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const [itemStatus, showItem] = useState(false);
  const [item, setItem] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(item.price);
  const [stock, setStock] = useState("");

  const classes = useStyles();

function clearForm() {
  setId("");
  setMsg("");
  setTitle("");
    setImage("");
    setCategory("");
    setDescription("");
    setPrice("");
    setStock("");
}

const displayItem = async () => {
  
  try {
      if (id !== ""){
          const data = await getProductsbyId(id);
          console.log(data);
          setMsg("Product found.");
          setItem(data);
          showItem(true);
          // setTitle(item.name)
    // setImage(item.img);
    // setCategory(item.category);
    // setDescription(item.description);
    // setPrice(item.price);
    // setStock(item.stock);
      } else {
          await setMsg("Enter Product ID");
      }
    } catch (e) {
      console.log(e);
      setMsg("Something has went wrong. Check fields and try again.");
    }
}

const updateItem = async (details) => {
  try {
    const data = await updateProduct(id, details);
    setMsg("Product has been sucessfully updated.");
  } catch (e) {
    setMsg("Something has went wrong. Check fields and try again.");
  }
};


const submitForm = (e) => {
  e.preventDefault();
  updateItem({
    "img": image,
    "name": title,
    "price": price,
    "description": description,
    "category": category,
    "stock": stock,
  });
  clearForm();
};


  return (
    <React.Fragment>
    <p>{msg}</p>
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={submitForm}
    >
      <div className="row">
        {!itemStatus ? (
                  <TextField
                  required
                  id="id"
                  label="Product Id"
                  variant="filled"
                  value={id}
                  onChange={(e) => setId(e.currentTarget.value)}
                />
        ) : null}
        {itemStatus ? (
            <React.Fragment>



            {/* <p>Product ID: {item._id}</p>
            <p>Image: {item.img}</p>
            <p>Title: {item.name}</p>
            <p>Price: $ {item.price}</p>
            <p>Stock: {item.stock}</p>
            <p>Description: {item.description}</p>
            <p></p>
            <p></p> */}

<div className="row">
          <TextField
            required
            multiline
            rows={4}
            id="title"
            label="Title"
            variant="filled"
            value={item.name}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <TextField
            multiline
            rows={4}
            id="image"
            label="Image"
            variant="filled"
            value={item.img}
            onChange={(e) => setImage(e.currentTarget.value)}
          />
        </div>

        <div className="row">
          <TextField
            required
            id="category"
            label="Category"
            variant="filled"
            value={item.category}
            onChange={(e) => setCategory(e.currentTarget.value)}
          />
          <TextField
            id="description"
            label="Description"
            multiline
            rows={4}
            variant="filled"
            value={item.description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>

        <div className="row">
          <TextField
            required
            id="price"
            label="Price"
            variant="filled"
            placeholder = "$"
            value={item.price}
            onChange={(e) => setPrice(e.currentTarget.value)}
          />
          <TextField
            required
            id="stock"
            label="Stock"
            type="number"
            value={item.stock}
            onChange={(e) => setStock(e.currentTarget.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
        </div>



            </React.Fragment>  
      ) : null}
      </div>

      <div className="row">
        {!itemStatus ? (
          <Button onClick={displayItem}>Find</Button>
        ) : null}
      
        <Button type="submit">Update</Button>
      </div>
    </form>
  </React.Fragment>
    )
}
