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
        <li>
          <a href="/">
            <IoMdHome /> Home
          </a>
        </li>
        <li>
          <a href="/create">
            <IoMdCreate /> Create
          </a>
        </li>
        <li>
          <a href="/read">
            <IoReaderSharp /> Read
          </a>
        </li>
        <li>
          <a href="/update">
            <GrUpdate /> Update
          </a>
        </li>
        <li>
          <a href="/delete">
            <MdDelete /> Delete
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
