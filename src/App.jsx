import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { ToastContainer } from "react-toastify";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Clients } from "./pages/Clients";
import { PrivateRoute } from "./components/PrivateRoute";
import { Spinner } from "./components/Spinner";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { NewClient } from "./pages/NewClient";
import "react-toastify/dist/ReactToastify.css";
import { ClientDetail } from "./pages/ClientDetail";
import { NewPurchase } from "./pages/NewPurchase";
import { Profile } from "./pages/Profile";

export function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Header />
          <main className="h-screen w-10/12 mx-auto my-10">
            <Routes>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Clients />} />
              </Route>
              <Route path="/clientes/:clientId" element={<ClientDetail />} />
              <Route
                path="/clientes/:clientId/add-purchase"
                element={<NewPurchase />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/new-client" element={<NewClient />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
