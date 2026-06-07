import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CategoriasPage from './pages/CategoriasPage';
import ProductsPage from './pages/ProductsPage';
import IngredientsPage from './pages/IngredientsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/ingredientes" element={<IngredientsPage />} />
        <Route path="/" element={<Navigate to="/categorias" />} />
      </Routes>
    </BrowserRouter>
  );
}
