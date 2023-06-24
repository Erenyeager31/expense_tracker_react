// import logo from './logo.svg';

// css imports
import './App.css';

// import './Homepage.css'

// components import
import Login from './components/Login';
import Navbar from './components/Navbar'
import Signup from './components/Signup';

// module imports
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Homepage from './components/Homepage';

function App() {
  return (
    <>
      {/* <Navbar/> */}
      {/* <Signup /> */}
      <BrowserRouter>
        <Routes>
            <Route path='' element={
              <Login/>
            }>
            </Route>
            <Route path='/Signup' element={
              <Signup></Signup>
            }></Route>
            <Route path='/Homepage' element={
              <>
              <Navbar/>
              <Homepage/>
              </>
            }></Route>
        </Routes>
      </BrowserRouter>

      {/* above snippet is commented for now but it works properly */}

      {/* <Navbar email="dishantshah3133@gmail.com"></Navbar>
      <Homepage string="qwerty"/> */}
    </>
  );
}

export default App;
