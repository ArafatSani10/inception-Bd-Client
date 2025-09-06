import React, { useEffect, useState } from "react";
import AuthContext from "./Authcontext";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import auth from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //   just for get access token from backend
  const exchangeForBackendTokens = async (firebaseUser) => {
    const firebaseIdToken =
      await firebaseUser.getIdToken(/* forceRefresh? false */);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/firebase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // IMPORTANT for refresh cookie
      body: JSON.stringify({ firebaseIdToken }),
    });
    if (!res.ok) throw new Error("Backend exchange failed");
    const data = await res.json();
    localStorage.setItem("access_token", data?.data?.accessToken); // your JWT
    // use data.user if you prefer server copy
  };

  // Create user with displayName
  const createUser = (email, password, name) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Update displayName after registration
        await updateProfile(userCredential.user, {
          displayName: name,
          // photoURL optional; we will use email letters for fallback
        });
        setUser({ ...userCredential.user, displayName: name });
        setLoading(false);
      })
      .catch((err) => {
        console.log("google error", err);
        setLoading(false);
        throw err;
      });
  };

  //   const singInUser = (email, password) => {
  //     setLoading(true);
  //     return signInWithEmailAndPassword(auth, email, password);
  //   };

  const singInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        console.log("cred", cred);
        await exchangeForBackendTokens(cred.user);
        setUser(cred.user);
      })
      .finally(() => setLoading(false));
  };

  const signOutUser =() => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // যদি backend token চাই
      await exchangeForBackendTokens(user);
      setUser(user);
      return user;
    } catch (err) {
      console.error("Google sign-in error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    singInUser,
    signOutUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
