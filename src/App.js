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
    <div className="">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <div className="flex">
              <div className="hidden lg:block">
                <Sidebar />
              </div>
              <div className="w-full">
                <Dashboard />
              </div>
              <div className="hidden lg:block">
                <Chatbar width="w-4/12" />
              </div>
            </div>
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
  );
}

export default App;
