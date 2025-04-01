import { useEffect } from "react";
import { Route, Routes } from "react-router";

import { Footer, NavBar } from "./components/ui/shared";
import useRequests from "./hooks/useRequests";
import {
  AccountSecurity,
  Cart,
  Home,
  NotFound,
  ProductProfile,
  SignIn,
  SignUp,
  UserProfile,
  VerifyEmail,
} from "./views";

function App() {
  const { fetchUser } = useRequests();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
          <Route path="/account-security/:id" element={<AccountSecurity />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/product-profile/:id" element={<ProductProfile />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
