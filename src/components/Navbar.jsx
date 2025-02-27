import logo from '../assets/Icono.png';
import { IoMdHome, IoMdCreate } from 'react-icons/io';
import { IoReaderSharp } from 'react-icons/io5';
import { GrUpdate } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';

const Nav = ({ show }) => {
  return (
    <nav className={show ? 'sidenav active' : 'sidenav'}>
      <img src={logo} alt="logo" className="logo" />
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/create"><IoMdCreate /> Crear</a></li>
        <li><a href="/read"><IoReaderSharp /> Ver</a></li>
        <li><a href="/update"><GrUpdate /> Actualizar</a></li>
        <li><a href="/delete"><MdDelete /> Eliminar</a></li>
      </ul>
    </nav>
  );
};

export default Nav;
