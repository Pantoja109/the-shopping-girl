import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";

export function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(result);

      //Check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      //If user doesn't exists create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("No se pudo autenticar con Google");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="font-semibold">
        {location.pathname === "/sign-up"
          ? "Registrar con:"
          : "Iniciar sesion con:"}
      </p>
      <button className="w-10 h-10 mt-2" onClick={onGoogleClick}>
        <img className="w-full" src={googleIcon} alt="google" />
      </button>
    </div>
  );
}
