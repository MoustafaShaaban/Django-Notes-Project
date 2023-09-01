import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage';
import Login from './components/auth/Login';
import Header from './pages/Header';
import DeleteNote from "./components/notes/DeleteNote";
//import Logout from "./components/auth/Logout";

function App() {
  

  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/delete-note/:id' element={<DeleteNote />} />
          {/* <Route path='/logout' element={<Logout />} /> */}
        </Routes>
      </Header>
    </BrowserRouter>
  )
}

export default App
