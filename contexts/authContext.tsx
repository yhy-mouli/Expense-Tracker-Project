import { auth, fireStore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType>(null);
    const router = useRouter()


    const updateUserData = async (uid: string) => {
        try {
            const docRef = doc(fireStore, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                const userData: UserType = {
                    uid: data?.uid,
                    name: data.name || null,
                    email: data.email || null,
                    image: data.image || null,
                };
                setUser({ ...userData });
            }
        } catch (error: any) {
            let msg = error.message;
            console.log("Error", error);
        }
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            console.log("firebase userrr: ", firebaseUser);
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser?.uid,
                    email: firebaseUser?.email,
                    name: firebaseUser?.displayName,
                });
                updateUserData(firebaseUser.uid);

                //console.log("User.name : ", firebaseUser?.displayName);
                //console.log("User.name : ", user?.name);

                router.replace("/(tabs)");
            } else {
                // there is no user
                setUser(null);
                router.replace("/(auth)/welcome");
            }
        });

        return () => unsub();
    }, []);

    //7777777777777777777777777777777777777777777777777777777777777777
    useEffect(() => {
        console.log("User.name :", user?.name);
    }, [user]);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);

            return { success: true }

        } catch (error: any) {
            let msg = error.message;
            console.log("Error Message: ", msg);
            if (msg.includes("(auth/invalid-credential)")) msg = "Wrong Credentials";
            if (msg.includes("(auth/invalid-email)")) msg = "Wrong Email";
            return { success: false, msg }
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            //èèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèè
            await updateProfile(response.user, { displayName: name });
            await setDoc(doc(fireStore, 'users', response?.user?.uid), {
                uid: response?.user?.uid,
                name,
                email
            });
            //èèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèè
            await updateUserData(response.user.uid);
            return { success: true }
        } catch (error: any) {
            let msg = error.message;
            console.log("Error message: ", msg);
            if (msg.includes("auth/email-already-in-use")) msg = "This email is already in use";
            return { success: false, msg }
        }
    };
    ////

    const contextValue: AuthContextType = {
        user,
        setUser,
        register,
        login,
        updateUserData,
    }
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("AuthContext must be wrapped inside an authProvider");
    }
    return context;
}


