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
import ProjectList from './pages/projects/ProjectList';
import { publicUrl } from '../Constant';
import CreateProject from './pages/projects/CreateProject';
import ViewProject from './pages/projects/viewProject';


export default class App extends Component {

  render() {
    return (
      <Router>
      <div>
      <Header />
        <Container>
          <Switch>
            <Route path={`${publicUrl}about`} exact={true}>
              <About />
            </Route>
            <Route path={`${publicUrl}project`} exact={true}>
              <ProjectList />
            </Route>
            <Route path={`${publicUrl}create/project`} exact={true}>
              <CreateProject />
            </Route>
            <Route path={`${publicUrl}view/project/:id`} exact={true}>
              <ViewProject />
            </Route>
            <Route path={`${publicUrl}contact`} exact={true}>
              <Contact />
            </Route>
            <Route path={`${publicUrl}`} exact={true}>
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
