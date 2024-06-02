import { useAppSelector } from "@/hooks";
import AuthRoutes from "./auth";
import { MainRouter } from "./main";
import Cookies from "universal-cookie";
import { CommonEnum } from "@/constants";
import { VerifyManager } from "@/pages/auth/set-manager-password/verify-manager";


const Routing: React.FC = () => {
    const cookies = new Cookies();
    const isTemporary: string = cookies.get(CommonEnum.ISTEMPORARY);
    const token = useAppSelector((state) => {
        return state?.login?.token
    })
    console.log(isTemporary)
    console.log(token)

    return (
        // <>
        //     {!token && !isTemporary ? <AuthRoutes /> : isTemporary && token ? <VerifyManager /> : <MainRouter />}
        // </>
        <>
        {(!token && !isTemporary) ? <AuthRoutes /> : (isTemporary && token) ? <VerifyManager /> : <MainRouter />}
    </>
    );
};
export default Routing;