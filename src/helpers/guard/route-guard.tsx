import { useAppSelector } from "@/hooks";
import { ICommonState } from "@/models/table";
import { Outlet, Navigate } from "react-router-dom";

export const Guard: React.FC = () => {
    const token = useAppSelector((state: ICommonState) => state?.login?.token);
 
    return (
        token ? <Outlet /> : <Navigate to={"login"} />
    )
} 