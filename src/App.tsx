import { Route, Routes } from "react-router";

import { NavBar } from "./components/ui/shared";
import { Products, SignIn, SignUp, VerifyEmail } from "./views";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </>
  );
}

export default App;
