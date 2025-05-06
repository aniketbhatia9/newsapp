import "./App.css";

import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  pageSize = 10;
  render() {
    return (
      <div>
        <Router>
          <NavBar />          
          {/* Instead of Switch we ine Routes and pass element in route after react-router-dom v6 */}
          <Routes> 
          <Route exact path="/" element={<News key="general" pageSize={this.pageSize} country="us" category="general"/>}>  </Route>
          <Route exact path="/business" element={<News key="business" pageSize={this.pageSize} country="us" category="business"/>}> </Route>
          <Route exact path="/entertainment" element = {<News key="entertainment" pageSize={this.pageSize} country="us" category="entertainment"/>}> </Route>
          <Route exact path="/general" element = {<News key="general" pageSize={this.pageSize} country="us" category="general"/>}> </Route>
          <Route exact path="/health" element = {<News key="health" pageSize={this.pageSize} country="us" category="health"/>}> </Route>
          <Route exact path="/science"  element = {<News key="science" pageSize={this.pageSize} country="us" category="science"/>}> </Route>
          <Route exact path="/sports" element = {<News key="sports" pageSize={this.pageSize} country="us" category="sports"/>}> </Route>
          <Route exact path="/technology" element = {<News key="technology" pageSize={this.pageSize} country="us" category="technology"/>}> </Route>
        </Routes>
        </Router>
      </div>
    );
  }
}
