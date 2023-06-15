// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const { data } = await axios.get("/api/user");

//         setUser(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     checkAuth();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
