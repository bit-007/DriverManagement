// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddDriver from './pages/AddDriver';
import GetDriver from './pages/GetDriver';
import Payment from './pages/Payment';
import Subscribe from './pages/Subscribe';
import TransactionHistory from './pages/TransactionHistory';
import Locations from './pages/Locations';
import DeleteDriver from './pages/DeleteDriver'; // Add this import


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/add-driver" component={AddDriver} />
          <Route path="/get-driver" component={GetDriver} />
          <Route path="/payment" component={Payment} />
          <Route path="/subscribe" component={Subscribe} />
          <Route path="/transaction-history" component={TransactionHistory} />
          <Route path="/locations" component={Locations} />
          <Route path="/delete-driver" component={DeleteDriver} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;