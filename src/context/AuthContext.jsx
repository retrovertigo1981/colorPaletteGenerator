import { Authcontext } from "./createContext.js";

export function AuthProvider({ children }) {
  const user = {
    login: true,
  };

  return (
    <Authcontext.Provider value={{ user }}>{children}</Authcontext.Provider>
  );
}
