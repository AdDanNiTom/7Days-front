import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import EventsListPage from "./pages/events/EventsListPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import EditEventPage from "./pages/EditEventPage";
import ProfilePage from "./pages/profile/ProfilePage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MapboxPage from "./pages/MapboxPage";
import PrivateRoute from "./components/PrivateRoute";    // <== IMPORT
import AnonRoute from "./components/AnonRoute";        // <== IMPORT
import Welcome from "./pages/Welcome";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import Error from "./components/status/Error";

function App() {
  const { error } = useContext(AuthContext);

  return (
    <div className="App">
      {error && <Error/>}
      <Switch>      
        <Route exact path="/" component={Welcome} />

        {/* 👇 UPDATE THE EXISTING ROUTES 👇  */}
        <PrivateRoute exact path="/events" component={EventsListPage} />
        <PrivateRoute exact path="/events/:id" component={EventDetailsPage} />
        <PrivateRoute exact path="/events/edit/:id" component={EditEventPage} />
        <PrivateRoute exact path="/maps" component={MapboxPage} />
        <PrivateRoute exact path="/profile/:id" component={ProfilePage} />
        {/* <PrivateRoute exact path="/profile" component={ProfilePage} /> */}
        <PrivateRoute exact path="/profile/edit" component={EditProfilePage} />
        
        <AnonRoute exact path="/signup" component={SignupPage} />
        <AnonRoute exact path="/login" component={LoginPage} />

      </Switch>
      <Navbar />
    </div>
  );
}

export default App;
