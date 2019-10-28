import React, { Component } from "react";

import "./App.css";
import axios from "axios";

import Output from "./components/Output";
import Select from "./components/Controls/Select";
import Text from "./components/Controls/Text";

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

  showHtml(x) {
    this.setState({ html: x }, this.getSampleText);
  }

  changeParas(number) {
    this.setState({ paras: number }, this.getSampleText);
  }

  render() {
    return (
      <div className="App">
        <h1 className="text-center">React JS Text Generator</h1>
        <hr />
        <form className="form-inline">
          <div className="form-group">
            <label>Paragraphs:</label>
            <Text
              value={this.state.paras}
              onChange={this.changeParas.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Include HTML:</label>
            <Select
              value={this.state.html}
              onChange={this.showHtml.bind(this)}
            />
          </div>
        </form>
        <br /> <br />
        <Output value={this.state.text} />
      </div>
    );
  }
}

export default App;
