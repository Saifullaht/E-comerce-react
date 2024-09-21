import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "./utils/firebase";
import { doc, getDoc } from "firebase/firestore"; // Use getDoc to fetch data

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    isLogin: false,
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(false); // Optional: Set loading to true when checking the user state
  
      if (user) {
        console.log("Authenticated user:", user);
  
        const docRef = doc(db, "users", user.uid);
        console.log("Document reference:", docRef);
  
        try {
          const userInfo = await getDoc(docRef); // Fetch user info with getDoc()
          console.log("user info hai ", userInfo);
          
          if (userInfo.exists()) {
            console.log("User data:", userInfo.data());
  
            setUser({
              isLogin: true,
              ...userInfo.data(),
            });
          } else {
            console.log("No such user document found");
            setUser({
              isLogin: true,
              email: user.email, // If no data, just set the email from auth
            });
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
  
      } else {
        setUser({
          isLogin: false,
          email: "",
        });
      }
      
      setLoading(false); // Ensure loading is set to false after user state is determined
      console.log("User not logged in");
    });
  
    return subscribe; // Clean up the subscription on unmount
  }, []);
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;