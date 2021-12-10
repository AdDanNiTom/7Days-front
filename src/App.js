import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventsListPage from "./pages/EventsListPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import EditEventPage from "./pages/EditEventPage";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MapboxPage from "./pages/MapboxPage";
import PrivateRoute from "./components/PrivateRoute";    // <== IMPORT
import AnonRoute from "./components/AnonRoute";        // <== IMPORT
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Switch>      
        <Route exact path="/" component={HomePage} />

        {/* 👇 UPDATE THE EXISTING ROUTES 👇  */}
        <PrivateRoute exact path="/events" component={EventsListPage} />
        <PrivateRoute exact path="/events/:id" component={EventDetailsPage} />
        <PrivateRoute exact path="/events/edit/:id" component={EditEventPage} />
        <PrivateRoute exact path="/maps" component={MapboxPage} />

        <PrivateRoute exact path="/profile/edit" component={EditProfilePage} />
        
        <AnonRoute exact path="/signup" component={SignupPage} />
        <AnonRoute exact path="/login" component={LoginPage} />

      </Switch>
    </div>
  );
}

export default App;
