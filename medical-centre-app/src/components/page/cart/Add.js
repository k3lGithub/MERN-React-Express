import React, {useState} from "react";
import { addProduct } from "../../../api";

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

// Refactor later to use by components to share, rather than per page for add, delete, update
// Refactor later to use React Router to reset states, rather than manual clean up

export default function Add(props) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [msg, setMsg] = useState("");

  const classes = useStyles();

  function clearForm() {
    setTitle("");
    setImage("");
    setCategory("");
    setDescription("");
    setPrice("");
    setStock("");
    setMsg("");
  }

  const createProduct = async (details) => {
    try {
      const data = await addProduct(details);
    //   console.log(data);
      setMsg("Product has been sucessfully added.");
    } catch (e) {
    //   console.log(e);
      setMsg("Something has went wrong. Check fields and try again.");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    createProduct({
      "img": image,
      "name": title,
      "price": price,
      "description": description,
      "category": category,
      "stock": stock,
    });

    // clear form
    clearForm();
  }

  return (
    <React.Fragment>
      <p>{msg}</p>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={submitForm}>
        <div className="row">
          <TextField
            required
            multiline
            rows={4}
            id="title"
            label="Title"
            variant="filled"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <TextField
            multiline
            rows={4}
            id="image"
            label="Image"
            variant="filled"
            value={image}
            onChange={(e) => setImage(e.currentTarget.value)}
          />
        </div>

        <div className="row">
          <TextField
            required
            id="category"
            label="Category"
            variant="filled"
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
          />
          <TextField
            id="description"
            label="Description"
            multiline
            rows={4}
            variant="filled"
            value={description}
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
            value={price}
            onChange={(e) => setPrice(e.currentTarget.value)}
          />
          <TextField
            required
            id="stock"
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.currentTarget.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
        </div>

        <div className="row">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </React.Fragment>
  );
}
