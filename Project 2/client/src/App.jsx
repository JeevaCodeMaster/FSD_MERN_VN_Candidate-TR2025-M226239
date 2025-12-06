
import './App.css'
import BookAppointment from './Components/BookAppointment'
import DoctorForm from './Components/DoctorForm'
import Home from './Components/Home'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Register from './Components/Register'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import UserAppointment from './Components/UserAppointment'
import DoctorDashboard from './Components/DoctorDashboard'
import AdminDashboard from './Components/AdminDasboard'
import UserList from './Components/UserList'
import DoctorAList from './Components/DoctorAList'

function App() {
  
  return (
    <>
    <BrowserRouter>
     <Navbar/>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
       <Route path="/register" element={<Register/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
         <Route path="/navbar" element={<Navbar/>}></Route>
         <Route path="/doc-form" element={<DoctorForm/>}></Route>
         <Route path="/Book_Appoint" element={<BookAppointment/>}></Route>
         <Route path="/user-app" element={<UserAppointment/>}></Route>
         <Route path="/doc-dash" element={<DoctorDashboard/>}></Route>
         <Route path="/admin-dash" element={<AdminDashboard/>}></Route>
         <Route path="/userl" element={<UserList/>}></Route>
          <Route path="/doctorl" element={<DoctorAList/>}></Route>
    </Routes>
    </BrowserRouter>

      
    </>
  )
}

export default App
