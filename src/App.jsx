import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './AuthContext';
import LoginPage from "./LoginPage";
import Dashboard from "./components/Dashboard";

// Client imports
import ClientProfile from "./pages/Client/Profile";
import ClientOrders from "./pages/Client/Order";
import ClientPayment from "./pages/Client/Payement";
import ClientTracking from "./pages/Client/Tracking";
import ClientProducts from "./pages/Client/Products";
import Cart from "./pages/Client/Cart";
import ProductDetails from "./pages/Client/Product_details";

// Management imports 
import DashboardHome from "./pages/Management/DashboardHome";
import ManagementProducts from "./pages/Management/Products";
import ManagementOrders from "./pages/Management/Orders";
import ManagementStocks from "./pages/Management/Stocks";
import ManagementUsers from "./pages/Management/Users";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ManagementProducts />} />
          <Route path="orders" element={<ManagementOrders />} />
          <Route path="stocks" element={<ManagementStocks />} />
          <Route path="users" element={<ManagementUsers />} />
          
          {/* Routes Client */}
          <Route path="client">
            <Route path="profile" element={<ClientProfile />} />
            <Route path="orders" element={<ClientOrders />} />
            <Route path="cart" element={<Cart />} />
            <Route path="payment" element={<ClientPayment />} />
            <Route path="tracking" element={<ClientTracking />} />
            <Route path="products" element={<ClientProducts />} />
            <Route path="products/:id" element={<ProductDetails />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;