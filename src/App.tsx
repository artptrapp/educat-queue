import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import React from 'react'
import AuthState from "./states/AuthState";
import LoginPage from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute";
import QueuePage from "./pages/Queue/Queue";
import FirebaseState from "./states/FirebaseState";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import Modal from 'react-modal';

function App() {

  Modal.setAppElement('#root')

  return (
    <FirebaseState>
      <ToastContainer />
      <Router>
        <AuthState>
          <Header />
          <Switch>
            <Route path="/" exact={true}>
              <LoginPage />
            </Route>
            <PrivateRoute path="/queue" component={QueuePage}>
            </PrivateRoute>
          </Switch>
        </AuthState>
      </Router >
    </FirebaseState>
  );
}

export default App;
