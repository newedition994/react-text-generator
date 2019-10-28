import React, { Component } from "react";

import "./App.css";
import axios from "axios";

import Output from "./components/Output";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paras: 4,
      html: true,
      text: ""
    };
  }

  componentDidMount() {
    this.getSampleText();
  }

  getSampleText() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://hipsterjesus.com/api?paras=" +
          this.state.paras +
          "&html=" +
          this.state.html
      )
      .then(response => {
        this.setState({ text: response.data.text }, function() {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Output value={this.state.text} />
      </div>
    );
  }
}

export default App;
