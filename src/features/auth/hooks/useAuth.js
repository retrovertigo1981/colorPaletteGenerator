import { useContext } from "react";
import { Authcontext } from "../context/createContext";

const useAuth = () => {
    const context = useContext(Authcontext);
    return context;
}

export { useAuth };