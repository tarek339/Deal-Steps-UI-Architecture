import { Route, Routes } from "react-router";

import { NavBar } from "./components/ui/shared";
import {
  AccountSecurity,
  Products,
  SignIn,
  SignUp,
  UserProfile,
  VerifyEmail,
} from "./views";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/user-profile/:id" element={<UserProfile />} />
        <Route path="/account-security/:id" element={<AccountSecurity />} />
      </Routes>
    </>
  );
}

export default App;
