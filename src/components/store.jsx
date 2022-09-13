import { createContext } from "react";
const Ctx = createContext();

const Storage = ({ value, children }) => {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export { Storage, Ctx }
