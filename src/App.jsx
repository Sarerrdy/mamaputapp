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
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Logout from "./pages/Logout";
import Signin from "./pages/Signin";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
      <CartProvider>
        <GlobalStyles />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="services" element={<Services />} />
                <Route path="shoppingcart" element={<ShoppingCart />} />
                <Route path="signin" element={<Signin />} />
                <Route path="admin" element={<Admin />} />
                <Route path="logout" element={<Logout />} />
                <Route element={<PrivateRoute />}>
                  <Route path="checkout" element={<Checkout />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
