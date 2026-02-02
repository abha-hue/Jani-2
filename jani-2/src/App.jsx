import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./pages/Navigation";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Map from "./pages/Map";


const MainLayout = () => (
  <>
    <Navigation />
    <Outlet /> {/* nested routes will render here */}
  </>
);

const AuthLayout = () => <Outlet />; // no navbar

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/report/new" element={<Report />} />
          <Route path="/map" element={<Map />} />
        </Route>


        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
