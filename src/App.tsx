import { useEffect } from "react";
import { Route, Routes } from "react-router";

import { NavBar } from "./components/ui/shared";
import useRequests from "./hooks/useRequests";
import useSelectors from "./hooks/useSelectors";
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
  const { user, userLoading } = useSelectors();
  const { fetchUser } = useRequests();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(userLoading);
    console.log(user);
  }, [user, userLoading]);
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
