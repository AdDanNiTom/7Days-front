import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import EventDetailsPage from "./pages/EventDetailsPage";
import EditEventPage from "./pages/EditEventPage";
import ProfilePage from "./pages/profile/ProfilePage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import SignupPage from "./pages/SignupPage";
// import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";    // <== IMPORT
import AnonRoute from "./components/AnonRoute";        // <== IMPORT
import Welcome from "./pages/Welcome";
import EventsPage from "./pages/events/EventsPage";

import ErrorToast from "./components/status/ErrorToast";
import { AuthContext } from "./context/auth.context";
import { useContext } from "react";
import SuccessToast from "./components/status/SuccessToast";

function App(props) {
  const {error, success} = useContext(AuthContext)
  const location = useLocation();
  return (
    <div className="App">
        <Route exact path="/" component={Welcome} />
      <Switch>      

        {/* 👇 UPDATE THE EXISTING ROUTES 👇  */}
        <PrivateRoute exact path="/events" component={EventsPage} />
        <PrivateRoute exact path="/events/:id" component={EventDetailsPage} />
        <PrivateRoute exact path="/events/edit/:id" component={EditEventPage} />
        <PrivateRoute exact path="/profile/edit" component={EditProfilePage} />
        <PrivateRoute exact path="/profile/:id" component={ProfilePage} />
        {/* <PrivateRoute exact path="/profile" component={ProfilePage} /> */}
        
        <AnonRoute exact path="/signup" component={SignupPage} />
        {/* <AnonRoute exact path="/login" component={LoginPage} /> */}
        {/* <AnonRoute exact path="/test" component={EventsPage} /> */}

      </Switch>
      {location.pathname !== '/' && <Navbar />}
      {/****** Toast popups ******/ }
      {error && <ErrorToast/>}
      {success && <SuccessToast/>}
    </div>
  );
}

export default App;
