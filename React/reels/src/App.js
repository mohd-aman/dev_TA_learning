import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import AuthProvider from "./AuthProvider";

function App() {
  return (
    <>
  <AuthProvider>
    <Router>
      <Switch>
        <Route exact path = "/login">
          <Login/>
        </Route>
        <Route exact path = "/">
          <Home/>
        </Route>
      </Switch>
    </Router>
    </AuthProvider>    
    </>
  );
}

export default App;
