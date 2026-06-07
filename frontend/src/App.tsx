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
        <Route path="/categories" element={<CategoriasPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
        <Route path="/" element={<Navigate to="/categories" />} />
      </Routes>
    </BrowserRouter>
  );
}
