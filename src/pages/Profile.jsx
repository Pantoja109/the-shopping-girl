import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  return (
    <div>
      <button type="button" onClick={onLogout} className="btn btn-primary">
        LogOut
      </button>
    </div>
  );
}
