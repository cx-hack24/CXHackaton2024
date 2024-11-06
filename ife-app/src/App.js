import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Homepage from "./pages/Homepage.js";
import EntertainmentList from "./pages/Entertainmentlist.js";
import Entertainmentoption from "./pages/Entertainmentoption.js";

const Container = styled.div``;

function App() {
  return (
    <Router>
      <Container className="w-screen h-screen font-poppins">
        <Switch>
          <Route path="/"  exact component={Homepage} />
          <Route path="/entertainment"  component={EntertainmentList} />
          <Route path="/entertainmentoptions" component={Entertainmentoption} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
