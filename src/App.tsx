import { useEffect } from "react";
import { Route, Routes } from "react-router";

import { NavBar } from "./components/ui/shared";
import useRequests from "./hooks/useRequests";
import {
  AccountSecurity,
  NotFound,
  Products,
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
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/user-profile/:id" element={<UserProfile />} />
        <Route path="/account-security/:id" element={<AccountSecurity />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
