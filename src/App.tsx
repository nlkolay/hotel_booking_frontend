import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import theme from "./theme";
//import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Account from "./pages/Account";
import NavBar from "./components/NavBar";
import Logout from "./pages/Logout";
import SearchResults from "./pages/SearchResults";
import AvailableRooms from "./pages/AvailableRooms";
//import SearchForm from "./components/SearchForm";


function App() {
return (
<ChakraProvider theme={theme}>
<Router>
<NavBar />
<Routes>
<Route path="/" element={<Navigate to="/hotels" />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/hotels" element={<Hotels />} />
<Route path="/hotels/:hotelId" element={<Rooms />} />
<Route path="/bookings" element={<Bookings />} />
<Route path="/account" element={<Account />} />
<Route path="/logout" element={<Logout />} />
<Route path="/results" element={<SearchResults />} />
<Route path="/rooms/:hotelId" element={<AvailableRooms />} />
</Routes>
</Router>
</ChakraProvider>
);
}

export default App;