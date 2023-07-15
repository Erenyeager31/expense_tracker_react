import './App.css';
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
import ExpenseState from './context/ExpenseState';
import FilterState from './context/FilterState';

function App() {
  // console.log(sessionStorage.getItem("email"))
  return (
    <>

      <ExpenseState>
        <FilterState>
      <BrowserRouter>
        <Routes>
            <Route path='' element={
              <Login/>
            }>
            </Route>
            <Route path='/Signup' element={
              <Signup></Signup>
            }></Route>
            <Route path={(sessionStorage.getItem("email") && '/Homepage') || ""} element={(sessionStorage.getItem("email")  &&
              <>
              <Navbar/>
              <Homepage/>
              </>) || (<Login/>)
            }></Route>
        </Routes>
      </BrowserRouter>
      </FilterState>
      </ExpenseState>
    </>
  );
}

export default App;
