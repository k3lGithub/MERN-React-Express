import React, { useState } from "react";
import { deleteProduct, getProductsbyId } from "../../../api";

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

export default function Delete(props) {
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const [itemStatus, showItem] = useState(false);
  const [item, setItem] = useState([]);

  const classes = useStyles();

  function clearForm() {
    setId("");
    setMsg("");
  }

  const displayItem = async () => {
  
    try {
        if (id !== ""){
            const data = await getProductsbyId(id);
            console.log(data);
            setMsg("Product found.");
            await setItem(data);
            await showItem(true);
        } else {
            await setMsg("Enter Product ID");
        }
      } catch (e) {
        console.log(e);
        setMsg("Something has went wrong. Check fields and try again.");
      }
  }

  const createProduct = async () => {
    try {
        if (id !== ""){
            const data = await deleteProduct(id);
            setMsg("Product has been sucessfully removed.");
        } else {
            setMsg("Enter Product ID");
        }
    } catch (e) {
      setMsg("Something has went wrong. Check fields and try again.");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    createProduct();
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
          <TextField
            required
            id="id"
            label="Product Id"
            variant="filled"
            value={id}
            onChange={(e) => setId(e.currentTarget.value)}
          />
          {itemStatus ? (
              <React.Fragment>
              <p>Product ID: {item._id}</p>
              <p>Image: {item.img}</p>
              <p>Title: {item.name}</p>
              <p>Price: $ {item.price}</p>
              <p>Stock: {item.stock}</p>
              <p>Description: {item.description}</p>
              <p></p>
              <p></p>
              </React.Fragment>  
        ) : null}
        </div>

        <div className="row">
        <Button onClick={displayItem}>Find</Button>
          <Button type="submit">Delete</Button>
        </div>
      </form>
    </React.Fragment>
  );
}
