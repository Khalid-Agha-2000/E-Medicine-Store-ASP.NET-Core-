import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Orders from './users/Orders';
import Profile from './users/Profile';
import Cart from './users/Cart';
import Shop from './users/Shop';
import Header from './Header';
import MedicineDetails from './users/MedicineDetails';
import Footer from './Footer';
import NotAuthorized from './NotAuthorized';

import ManageMedicines from './admin/ManageMedicines';
import ManageOrders from './admin/ManageOrders';
import ManageCustomers from './admin/ManageCustomers';
import AddEditMedicine from './admin/AddEditMedicine';
import AdminRoute from './AdminRoute';

export default function RouterPage() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                <Routes>
                    <Route path='/' element={<Shop/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/orders' element={<Orders/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/shop' element={<Shop/>}/>
                    <Route path='/medicine/:id' element={<MedicineDetails/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/not-authorized' element={<NotAuthorized />} />

                    <Route path='/manage-medicines' element={
                        <AdminRoute>
                            <ManageMedicines/>
                        </AdminRoute>
                    }/>
                    
                    <Route path='/manage-orders' element={
                        <AdminRoute>
                            <ManageOrders/>
                        </AdminRoute>
                    }/>

                    <Route path='/manage-customers' element={
                        <AdminRoute>
                            <ManageCustomers/>
                        </AdminRoute>
                    }/>

                    <Route path='/add-edit-medicine' element={
                        <AdminRoute>
                            <AddEditMedicine/>
                        </AdminRoute>
                    }/>

                </Routes>
                </main>
            <Footer/>
            </div>
        </Router>
    );
}