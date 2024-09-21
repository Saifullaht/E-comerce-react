import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
 import Home from './Pages/Home';
import Header from './Components/Header';
// import NotFound from '.NotFound';
import NotFound from './Pages/NotFound';
// import Weather from '.Weather';
import SignUp from './Pages/Auth/SignUp';
// import Box from './pages/Box';
// import SignUp from './SignUp';
// import Login from './LoginUp'; // Consider renaming this to 'Login'
// import BuyProduct from './BuyProduct';
import Login from './Pages/Auth/LoginUp';
import BuyProduct from './Pages/Buyproduct';
// import Product from './Product';
import Product from './Pages/Product';
// import Profile from './Profile'
import Profile from './Pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/box" element={<Box />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buy-product" element={<BuyProduct />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 