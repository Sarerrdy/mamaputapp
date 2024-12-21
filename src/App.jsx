import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";

import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import ShoppingCart from "./pages/ShoppingCart";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import PrivateRoute from "./pages/PrivateRoute";
import AdminRoute from "./pages/AdminRoute";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import AdminDashboard from "./pages/AdminDashboard";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { OrderProvider } from "./contexts/OrderContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Register from "./pages/Register";
import OrderSummary from "./pages/OrderSummary";
import PaymentForm from "./features/PaymentForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import CategoryList from "./components/Category/CategoryList";
import CategoryEdit from "./components/Category/CategoryEdit";
import CategoryCreate from "./components/Category/CategoryCreate";
import CategoryDelete from "./components/Category/CategoryDelete";
import MenuList from "./components/Menu/MenuList";
import MenuEdit from "./components/Menu/MenuEdit";
import MenuCreate from "./components/Menu/MenuCreate";
import MenuDelete from "./components/Menu/MenuDelete";
import OrderList from "./components/Order/OrderList";
import OrderEdit from "./components/Order/OrderEdit";
import RoleManagement from "./components/Role/RoleManagement";

const theme = createTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <OrderProvider>
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route index element={<Navigate replace to="home" />} />
                    <Route path="home" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="services" element={<Services />} />
                    <Route path="shoppingcart" element={<ShoppingCart />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="register" element={<Register />} />
                    <Route element={<PrivateRoute />}>
                      <Route path="payment" element={<PaymentForm />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="checkout" element={<Checkout />} />
                      <Route path="ordersummary" element={<OrderSummary />} />
                    </Route>
                    {/* Admin Dashboard Route */}{" "}
                    <Route element={<AdminRoute />}>
                      <Route path="admin" element={<AdminDashboard />}>
                        <Route path="categories" element={<CategoryList />} />
                        <Route
                          path="categories/create"
                          element={<CategoryCreate />}
                        />
                        <Route
                          path="categories/edit/:id"
                          element={<CategoryEdit />}
                        />
                        <Route
                          path="categories/delete/:id"
                          element={<CategoryDelete />}
                        />
                        <Route path="menus" element={<MenuList />} />
                        <Route path="menus/edit/:id" element={<MenuEdit />} />
                        <Route path="menus/create" element={<MenuCreate />} />
                        <Route
                          path="menus/delete/:id"
                          element={<MenuDelete />}
                        />
                        <Route path="orders" element={<OrderList />} />{" "}
                        <Route
                          path="orders/edit/:order_id"
                          element={<OrderEdit />}
                        />
                        <Route
                          path="/admin/roles"
                          element={<RoleManagement />}
                        />
                      </Route>
                    </Route>
                  </Route>
                </Routes>
              </OrderProvider>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
