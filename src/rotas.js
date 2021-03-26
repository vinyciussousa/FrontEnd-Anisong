import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Mandioca from "./operacionais/js/mandioca";
import Lista from "./paginas/lista";
import Downloads from "./paginas/downloads";
const ReactRouterSetup = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Mandioca />
        </Route>
        <Route path="/lista">
          <Lista />
        </Route>
        <Route path="/downloads">
          <Downloads />
        </Route>
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
