import { Login } from "@/pages/auth/login";
import { VerifyManager } from "@/pages/auth/set-manager-password/verify-manager";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path='*' element={<Navigate to='/' />} />
      <Route path="verify-manager" element={<VerifyManager/>}/>
    </Routes>
  );
};

export default AuthRoutes;