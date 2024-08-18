import './App.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar'
import Login from './pages/Login'
import Lukisan from './pages/Lukisan'
import Dasbor from './pages/Dasbor'
import Pengguna from './pages/Pengguna'
import Pesanan from './pages/Pesanan'
import Riwayat from './pages/Riwayat'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
        <Route index element={<Dasbor />} />
        <Route path="/lukisan" element={<Lukisan />} />
        <Route path="/pengguna" element={<Pengguna />} />
        <Route path="/pesanan" element={<Pesanan />} />
        <Route path="/riwayat" element={<Riwayat />} />
        </Route>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
