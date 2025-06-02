import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import Details from './pages/details'
import Home from './pages/home'
import "./index.css"
import LoginAdm from './pages/loginAdm'
import AdmDashboard from './pages/dashboard'
import AddProducts from './pages/adminAddProducts'
import AddAdmins from './pages/addAdmin'
import Navbar from './components/navbar'
import Footer from './components/footer'
import AdminList from './pages/listAdmin'
import AdminImport from './pages/importAdm'
import AdminProducts from './pages/AdminProducts'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/' element={<App></App>}>
      <Route index element={<Home></Home>} />
      <Route path='main/products/:id' element={<Details></Details>} /></Route>
      <Route path='admin/login' element={<LoginAdm />}></Route>
      <Route path='admin/' element={<AdmDashboard></AdmDashboard>}/>
      <Route path='admin/products/add' element={<AddProducts/>}></Route>
      <Route path='admin/register' element={<AddAdmins/>}></Route>
      <Route path='admin/list' element={<AdminList />}></Route>
      <Route path='admin/import' element={<AdminImport />}></Route>
      <Route path='admin/products' element={<AdminProducts />}></Route>
    </Routes>
  </Router>
);
