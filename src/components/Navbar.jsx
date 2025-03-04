import React, { useState } from 'react';
import logo from '../assets/Icono.png';
import { IoMdHome, IoMdCreate } from 'react-icons/io';
import { IoReaderSharp, IoCardSharp } from 'react-icons/io5';
import { GrUpdate, GrTransaction } from 'react-icons/gr';
import { MdDelete, MdAccountCircle, MdReportProblem } from 'react-icons/md';
import { BiCaretRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Nav = ({ show }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
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
          <a href="#" onClick={() => toggleMenu('accounts')}>
            <MdAccountCircle /> Accounts
          </a>
          {activeMenu === 'accounts' && (
            <ul>
              <li><Link to="/account/create"><BiCaretRight /> Create</Link></li>
              <li><Link to="/account/read"><BiCaretRight /> Read</Link></li>
              <li><Link to="/account/update"><BiCaretRight /> Update</Link></li>
              <li><Link to="/account/status"><BiCaretRight /> Status</Link></li>
              <li><Link to="/account/balance"><BiCaretRight /> Balance</Link></li>
            </ul>
          )}
        </li>

        <li>
          <a href="#" onClick={() => toggleMenu('cards')}>
            <IoCardSharp /> Cards
          </a>
          {activeMenu === 'cards' && (
            <ul>
              <li><Link to="/card/search"><BiCaretRight /> Search</Link></li>
              <li><Link to="/card/create"><BiCaretRight /> Create</Link></li>
              <li><Link to="/card/read"><BiCaretRight /> Read</Link></li>
              <li><Link to="/card/delete"><BiCaretRight /> Delete</Link></li>
            </ul>
          )}
        </li>

        <li>
          <a href="#" onClick={() => toggleMenu('transactions')}>
            <GrTransaction /> Transactions
          </a>
          {activeMenu === 'transactions' && (
            <ul>
              <li><Link to="/transactions/search"><BiCaretRight /> Search</Link></li>
              <li><Link to="/transactions/create"><BiCaretRight /> Create</Link></li>
              <li><Link to="/transactions/read"><BiCaretRight /> Read</Link></li>
            </ul>
          )}
        </li>

        <li>
          <a href="#" onClick={() => toggleMenu('fraud')}>
            <MdReportProblem /> Fraud
          </a>
          {activeMenu === 'fraud' && (
            <ul>
              <li><Link to="/fraud/detect"><BiCaretRight /> Detect</Link></li>
              <li><Link to="/fraud/connections"><BiCaretRight /> Connections</Link></li>
              <li><Link to="/fraud/recurring"><BiCaretRight /> Recurring</Link></li>
              <li><Link to="/fraud/Suspicious"><BiCaretRight /> Suspicious</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

