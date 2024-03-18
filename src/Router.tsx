import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Bets from "./pages/Bets/Bets";
import Raffle from "./pages/Raffle/Raffle";
import Awards from "./pages/Awards/Awards";
import Footer from "./components/Footer/Footer";

export default function Router() {
  return (
    <BrowserRouter>
      <div className="pageContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bets" element={<Bets />} />
          <Route path="/raffle" element={<Raffle />} />
          <Route path="/awards" element={<Awards />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
