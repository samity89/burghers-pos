import {React, useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { UserContext } from "./UserContext";
import NavBar from "./Navbar";
import Checks from "./Checks";
import Menu from "./Menu";
import Admin from "./Admin";
import Login from "./Login";
import './App.css';

function App() {
  const [products, setProducts] = useState([])
  const [checks, setChecks] = useState([])
  const [currentCheck, setCurrentCheck] = useState(false)
  const [user, setUser] = useState(false)
  
  useEffect(() => {
    fetch("/products")
    .then((r) => r.json())
    .then((r) => setProducts(r));
    fetch("/checks")
    .then((r) => r.json())
    .then((r) => setChecks(r));
  }, [user])
  
  return (
    <div className="App">
      <img src={require('./logo.png')} alt="BURGHERS"/>
      <hr></hr>
      <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
      <div>
      <NavBar 
      checks={checks}
      setChecks={setChecks}
      currentCheck={currentCheck}
      setCurrentCheck={setCurrentCheck}
      />
      </div>
      </UserContext.Provider>
        <Routes>
          <Route path="/menu" element={
            <UserContext.Provider value={{user, setUser}}>
            <Menu 
            products={products}
            setProducts={setProducts}
            currentCheck={currentCheck}
            setCurrentCheck={setCurrentCheck}
            />
            </UserContext.Provider>
          }/>
          <Route path="/checks" element={
            <UserContext.Provider value={{user, setUser}}>
            <Checks 
            checks={checks}
            setChecks={setChecks}
            currentCheck={currentCheck}
            setCurrentCheck={setCurrentCheck}
            />
            </UserContext.Provider>
          }/>
          <Route path="/admin" element={
            <UserContext.Provider value={{user, setUser}}>
            <Admin 
            products={products}
            setProducts={setProducts}
            />
            </UserContext.Provider>
          }/>
          <Route path="/" element={
            <UserContext.Provider value={{user, setUser}}>
            <Login 
            products={products}
            setProducts={setProducts}
            />
            </UserContext.Provider>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App;
