import './App.css';
import {Routes, Route} from "react-router-dom";
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Home from './pages/Home';
import Footer from './pages/Footer';
import Header from './pages/Header';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Services from './pages/Services';

function App() {
  return (
    <div className="">
      <Header/>
      <Routes>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/my-cart' element={<Cart/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<RegisterForm/>}/>
      <Route path='/products' element={<Products/>}/>
      </Routes>
        <Footer/>
    </div>
  );
}

export default App;
