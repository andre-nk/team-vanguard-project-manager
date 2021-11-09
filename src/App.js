import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Project from "./pages/project/Project";
import Register from "./pages/register/Register";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Chatbar from "./components/Chatbar";

function App() {
  return (
    <div className="flex w-full">
      <div className="w-72">
        <Sidebar />
      </div>
      <div className="w-full">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/projects/:id">
              <Project />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
      <div className="w-4/12">
        <Chatbar />
      </div>
    </div>
  );
}

export default App;
