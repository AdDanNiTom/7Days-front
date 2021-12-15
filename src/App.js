import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import EventDetailsPage from "./pages/EventDetailsPage";
import EditEventPage from "./pages/EditEventPage";
import ProfilePage from "./pages/profile/ProfilePage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import PrivateRoute from "./components/PrivateRoute";    // <== IMPORT
import AnonRoute from "./components/AnonRoute";        // <== IMPORT
import Welcome from "./pages/Welcome";
import EventsPage from "./pages/events/EventsPage";

import ErrorToast from "./components/status/ErrorToast";
import { AuthContext } from "./context/auth.context";
import { useContext, useEffect } from "react";
import SuccessToast from "./components/status/SuccessToast";

function App(props) {
  const {error, setError, success, setSuccess} = useContext(AuthContext)
  const location = useLocation();

  useEffect(() => {
    setError(false)
    // setSuccess(false)
  }, [location])

  return (
    <div className="App">
      <Switch>      
        <AnonRoute exact path="/" component={Welcome} />

        {/* 👇 UPDATE THE EXISTING ROUTES 👇  */}
        <PrivateRoute exact path="/events" component={EventsPage} />
        <PrivateRoute exact path="/events/:id" component={EventDetailsPage} />
        <PrivateRoute exact path="/events/edit/:id" component={EditEventPage} />
        <PrivateRoute exact path="/profile/edit" component={EditProfilePage} />
        <PrivateRoute exact path="/profile/:id" component={ProfilePage} />
        

      </Switch>
      {location.pathname !== '/' && <Navbar />}
      {/****** Toast popups ******/ }
      {error && <ErrorToast/>}
      {success && <SuccessToast/>}
    </div>
  );
}

export default App;
