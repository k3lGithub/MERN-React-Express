import React, { useState, useEffect } from "react";

// Grid
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

// Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// dropdowns
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// radio buttons
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

// checkbox
import Checkbox from "@material-ui/core/Checkbox";

export default function Products(props) {
  let filteredProducts = props.products;
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [checked, setChecked] = useState(false);

  let priceMin = price.split(" ")[0];
  let priceMax = price.split(" ")[1];

  // Filters - To be refactored
  if (category !== "" && price == "" && checked == false) {
    filteredProducts = props.products.filter(
      (product) => product.category == category
    );
  } else if (category == "" && price !== "" && checked == false) {
    filteredProducts = props.products.filter(
      (product) => priceMin < product.price && product.price < priceMax
    );
  } else if (category !== "" && price !== "" && checked == true) {
    filteredProducts = props.products.filter(
      (product) =>
        product.category == category &&
        priceMin < product.price &&
        product.price < priceMax && product.stock > 0
    );
  } else if (category == "" && price == "" && checked == true){
    filteredProducts = props.products.filter(
      (product) => product.stock > 0
    );
  } else if (category !== "" && price !== "" && checked == false){
    filteredProducts = props.products.filter(
      (product) =>
        product.category == category &&
        priceMin < product.price &&
        product.price < priceMax
    );
  } else if (category !== "" && price == "" && checked == true){
    filteredProducts = props.products.filter(
      (product) =>
        product.category == category && product.stock > 0
    );
  } else if (category == "" && price != "" && checked == true) {
    filteredProducts = props.products.filter(
      (product) => priceMin < product.price && product.price < priceMax && product.stock > 0
    );
  }

  console.log("filteredProducts", filteredProducts);

  const handleChange = (e) => {
    setPrice(e.currentTarget.value);
  };

  const handleCheck = (e) => {
    setChecked(e.currentTarget.checked);
  };

  const handleClear = (e) => {
    setCategory("");
    setPrice("");
    setChecked(false);
  }

  // Grid
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridGap: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      whiteSpace: "nowrap",
      marginBottom: theme.spacing(1),
    },
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  }));

  const classes = useStyles();

  function ResultText() {
    if (filteredProducts !== "") {
      return (
        <div className="itemCount">
          {filteredProducts.length + " items found."}
        </div>
      );
    }
  }

  return (
    <div>
      <div className={classes.container}>
        <div style={{ gridColumnEnd: "span 3" }}>
          <Paper className={classes.paper}>
            {/* Filters */}

            {/* Category */}
            <Button size="small" onClick={handleClear}>Clear Filters</Button>
            <div>
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="grouped-native-select">
                  Category
                </InputLabel>
                <Select
                  native
                  id="grouped-native-select"
                  onChange={(e) => setCategory(e.currentTarget.value)}
                >
                  <option aria-label="None" value="" />
                  <optgroup>
                    {props.products.map((product) => (
                      <option>{product.category}</option>
                    ))}
                  </optgroup>
                </Select>
              </FormControl>
            </div>

            {/* Price */}
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <RadioGroup
                  aria-label="price"
                  name="price"
                  value={price}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="0 30"
                    control={<Radio />}
                    label="$0.00 - $30.00"
                  />
                  <FormControlLabel
                    value="30 60"
                    control={<Radio />}
                    label="$30.00 - $60.00"
                  />
                  <FormControlLabel
                    value="60 100"
                    control={<Radio />}
                    label="$60.00 - $100.00"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            {/* Checkbox */}
            <div>
              <Checkbox
                checked={checked}
                onChange={handleCheck}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <label>In Stock</label>
            </div>
          </Paper>
        </div>
        <div style={{ gridColumnEnd: "span 9" }}>

          <ResultText />

          {/* Cards */}
          {filteredProducts.map((product, i) => (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={product.img}
                  title={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small">Share</Button>

                {/* Buttons */}
                <div class="quantity">
                  <button id={"plus" + i} type="button">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-file-plus"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
                      />
                    </svg>
                  </button>
                  <input
                    class="quantityInput"
                    id={"quantityInput" + i}
                    type="text"
                    maxlength="1"
                    value="1"
                  />
                  <button id={"minus" + i} type="button">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-file-minus"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
                      />
                    </svg>
                  </button>
                </div>
                <Button size="small" class="addToCart" id={"addToCart" + i}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // return (
  //   <React.Fragment>
  //       <p>This is Products</p>
  //   </React.Fragment>
  // );
}
