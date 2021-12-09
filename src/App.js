import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventsListPage from "./pages/EventsListPage";
import EventsDetailsPage from "./pages/EventsDetailsPage";
import EditEventPage from "./pages/EditEventPage";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";    // <== IMPORT
import AnonRoute from "./components/AnonRoute";        // <== IMPORT

function App() {
  return (
    <div className="App">
      <Navbar />

      <Switch>      
        <Route exact path="/" component={HomePage} />

        {/* 👇 UPDATE THE EXISTING ROUTES 👇  */}
        <PrivateRoute exact path="/events" component={EventsListPage} />
        <PrivateRoute exact path="/events/:id" component={EventsDetailsPage} />
        <PrivateRoute exact path="/events/edit/:id" component={EditEventPage} />
        
        <AnonRoute exact path="/signup" component={SignupPage} />
        <AnonRoute exact path="/login" component={LoginPage} />

      </Switch>
    </div>
  );
}

export default App;
