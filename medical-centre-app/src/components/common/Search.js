import React, { Component, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

export default class Search extends Component {
  state = {
    query: "",
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value,
    });
  };

  render() {
    return (
      <form>
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          ref={(input) => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
      </form>
    );
  }
}