
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PantsPage from './pages/ClothesCustomizePages/Pant';
import Dress03Page from './pages/ClothesCustomizePages/Dress03';
import ShirtsPage from './pages/ClothesCustomizePages/Shirts';
import DressPage from './pages/ClothesCustomizePages/Dress';
import LadiesShirtPage from './pages/ClothesCustomizePages/LadiesShirt';
import CottonPantPage from './pages/ClothesCustomizePages/CottonPant';
import DenimShirt from './pages/ClothesCustomizePages/DenimShirt';
import ErrorPage from './pages/ErrorPage';
import ProductPage from './pages/ProductPage';
import Blouse02Page from './pages/ClothesCustomizePages/Blouse02';
import Collection from './pages/Collection';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SearchPage from './pages/SearchPage';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';


//cart
import Cart from './pages/Cart/Cart';
import PaymentPage from './pages/Cart/PaymentPage';
import Card from './pages/Cart/Card';


//Support ticketform  page  and list page
import SupportForm from './pages/CustomerSupport/SupportForm';
import SupportList from './pages/CustomerSupport/SupportList';


function App() {
  

  return (
    
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/search' element={<SearchPage/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/collection' element={<Collection/>}/>


    <Route  element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/>

      {/* clothes */}
      <Route path='/pant' element={<PantsPage/>}/>
      <Route path='/dress3' element={<Dress03Page/>}/>
      <Route path='/shirts' element={<ShirtsPage/>}/>
      <Route path='/dress' element={<DressPage/>}/>
      <Route path='/lshirt' element={<LadiesShirtPage/>}/>
      <Route path='/blouse2' element={<Blouse02Page/>}/>
      <Route path='/cottonpant' element={<CottonPantPage/>}/>

      {/* cart */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<PaymentPage />} />
      <Route path="/card" element={<Card />} />
    </Route>
   
    <Route path='/denimshirt' element={<DenimShirt/>}/>
    <Route path='/product/:id' element={<ProductPage/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='*' element={<ErrorPage/>}/>
    <Route path='supportform'  element={<SupportForm/>}/>
    <Route path='supportlist'  element={<SupportList/>}/>

    </Routes>
    <Footer/>
    </BrowserRouter>
   

    
  )
}

export default App
