import React, { useState } from 'react';
import logo from '../assets/Icono.png';
import { IoMdHome, IoMdCreate } from 'react-icons/io';
import { IoReaderSharp } from 'react-icons/io5';
import { GrUpdate } from 'react-icons/gr';
import { MdDelete, MdAccountCircle } from 'react-icons/md';
import { BiCaretRight } from 'react-icons/bi';
import { Link } from 'react-router-dom'; 


const Nav = ({ show }) => {
  const [showAccounts, setShowAccounts] = useState(false);

  const toggleAccounts = () => {
    setShowAccounts(!showAccounts);
  };

  return (
    <nav className={show ? 'sidenav active' : 'sidenav'}>
      <img src={logo} alt="logo" className="logo" />
      <ul>
        <li><Link to="/"><IoMdHome /> Home</Link></li>
        <li><Link to="/create"><IoMdCreate /> Create</Link></li>
        <li><Link to="/read"><IoReaderSharp /> Read</Link></li>
        <li><Link to="/update"><GrUpdate /> Update</Link></li>
        <li><Link to="/delete"><MdDelete /> Delete</Link></li>
        <li>
          <a href="#" onClick={toggleAccounts}>
            <MdAccountCircle /> Accounts
          </a>
          {showAccounts && (
            <ul>
              <li><Link to="/account/create"><BiCaretRight />Create</Link></li>
              <li><Link to="/account/read"><BiCaretRight />Read</Link></li>
              <li><Link to="/account/update"><BiCaretRight />Update</Link></li>
              <li><Link to="/account/status"><BiCaretRight />Status</Link></li>
              <li><Link to="/account/balance"><BiCaretRight />Balance</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
