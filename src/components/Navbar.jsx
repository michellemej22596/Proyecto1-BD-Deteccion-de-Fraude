import logo from '../assets/Icono.png';

const Nav = ({ show }) => {
  
  return(
    <nav className={show ? 'sidenav active' : 'sidenav'}>

    <img src={logo} alt='logo' className='logo' />

      <ul>
        <li>
          <a href="/">Home</a>
        </li>        
        <li>
          <a href="/create">Create</a>
        </li>        
        <li>
          <a href="/read">Read</a>
        </li>        
        <li>
          <a href="/update">Update</a>
        </li>        
        <li>
          <a href="/delete">Delete</a>
        </li>        
      </ul>
    </nav>
  )
}

export default Nav;