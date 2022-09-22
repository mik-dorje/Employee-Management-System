import Login from "./components/Login";
import UserList from "./components/Users/UserList";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard/Dashboard";

import ErrorPage from "./components/ErrorPage";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";

import Notice from "./components/Notice";
import "./App.css";
import Register from "./components/Register";

// const ROLES = ["Admin", "User"];

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Register />} />

      <Route path="login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        {/* Protected Routes */}
        <Route
          // element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
          element={<RequireAuth allowedRoles={["User", "Admin"]} />}
        >
          <Route path="home" element={<Home />} />
          <Route path="notice" element={<Notice />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="userlist" element={<UserList />} />
        </Route>

        {/* catch error routes */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
