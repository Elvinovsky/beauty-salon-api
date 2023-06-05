import React from 'react'
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as PropTypes from "prop-types";
=======
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
>>>>>>> origin/main
const Home = () => <h1>Домашняя страница</h1>;
const About = () => <h1>О нас</h1>;
const Contact = () => <h1>Контакты</h1>;

<<<<<<< HEAD
function Switch(props) {
    return null;
}

Switch.propTypes = {children: PropTypes.node};
=======
>>>>>>> origin/main
const App = () => (
    <Router>
        <nav>
            <ul>
                <li>
                    <Link to="/">Главная</Link>
                </li>
                <li>
                    <Link to="/about">О нас</Link>
                </li>
                <li>
                    <Link to="/contact">Контакты</Link>
                </li>
            </ul>
        </nav>

        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/contact">
                <Contact />
            </Route>
        </Switch>
    </Router>
);

export default App;
