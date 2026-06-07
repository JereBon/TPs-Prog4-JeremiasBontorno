import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex items-center gap-8">
      <span className="font-bold text-lg">Gestor de Productos</span>
      <Link to="/categorias" className="hover:text-blue-200">Categorías</Link>
      <Link to="/productos" className="hover:text-blue-200">Productos</Link>
      <Link to="/ingredientes" className="hover:text-blue-200">Ingredientes</Link>
    </nav>
  );
}
