import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Protectedpages from './components/Protectedpages';
import { useSelector } from 'react-redux';
import Spinner from './components/spinner';
import Profile from './pages/Profile';

function App() {
  const {loading} = useSelector((state)=>state.loaders)
  return (
    
    <div>
      {loading && <Spinner/>}
      <BrowserRouter>
    <Routes>
      <Route path='/' element={<Protectedpages><Home/></Protectedpages>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Protectedpages><Profile/></Protectedpages>}/>
    </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
