import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

export default class App extends Component {
   state = {
    PUBLIC_URL : '/',
  }
  render() {
    return (
      <Router>
      <div>
      <Header />
        <Container>
          <Switch>
            <Route path={`${this.state.PUBLIC_URL}about`}>
              <About />
            </Route>
            <Route path={`${this.state.PUBLIC_URL}contact`}>
              <Contact />
            </Route>
            <Route path={`${this.state.PUBLIC_URL}`}>
              <Home />
            </Route>
          </Switch>
          <Footer />
        </Container>
      </div>
    </Router>
    )
  }
}


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
