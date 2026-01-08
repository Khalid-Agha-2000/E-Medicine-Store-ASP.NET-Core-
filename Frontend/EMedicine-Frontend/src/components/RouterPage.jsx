import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Dashboard from './users/Dashboard';
import Orders from './users/Orders';
import Profile from './users/Profile';
import Cart from './users/Cart';
import MedicineDisplay from './users/MedicineDisplay';
import Header from './users/Header';
import OrderDetails from './users/OrdersDetails';
import MedicineDetails from './users/MedicineDetails';
import Footer from './Footer';

import ManageMedicines from './admin/ManageMedicines';
import AdminOrders from './admin/AdminOrders';
import CustomerList from './admin/CustomerList';
// import Medicine from './admin/Medicine';
import AddEditMedicine from './admin/AddEditMedicine';

export default function RouterPage() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                <Routes>
                    <Route path='/' element={<MedicineDisplay/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/orders' element={<Orders/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/shop' element={<MedicineDisplay/>}/>
                    <Route path='/orderdetails' element={<OrderDetails/>}/>
                    <Route path='/medicine/:id' element={<MedicineDetails/>}/>

                    <Route path='/managemedicines' element={<ManageMedicines/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/adminorders' element={<AdminOrders/>}/>
                    <Route path='/customerlist' element={<CustomerList/>}/>
                    {/* <Route path='/medicine' element={<Medicine/>}/> */}
                    <Route path='/add-edit-medicine' element={<AddEditMedicine/>}/>
                </Routes>
                </main>
            <Footer/>
            </div>
        </Router>
    );
}