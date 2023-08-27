import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Authentication/LoginForm";
import { Register } from "./components/Authentication/SignUpForm";

import Navbar from "./components/Main/Navbar";
import Blog from "./components/Main/Blog";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./components/Main/CreatePost";
import InsidePost from "./components/Main/InsidePost";
import EditPost from "./components/Main/EditPost";
import Profile from "./components/Main/Profile";

export default function App() {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route index element={<Blog />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/Register"} element={<Register />} />
          <Route path={"/CreatePost"} element={<CreatePost />} />
          <Route path={"/post/:id"} element={<InsidePost />} />
          <Route path={"/edit/:id"} element={<EditPost />} />
          <Route path={"/Account/:subPage?"} element={<Profile />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}
