import { useState, useEffect } from 'react';
import { IoMenu } from 'react-icons/io5';
import ScrollButton from '@components/ScrollButton'; 
import NavBar from '@components/Navbar'; 
import Banner from '@components/Banner'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Cambiado Switch por Routes
import Footer from '@components/Footer'; 
import { Hourglass } from 'react-loader-spinner'; 
import Home from '@views/Home';
import Create from '@views/Create';
import Read from '@views/Read';
import Update from '@views/Update';
import Delete from '@views/Delete';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <> 
      {
  loading ? 
  <div className="loader-container">
    <Hourglass
      visible={true}
      height="100"
      width="100"
      ariaLabel="hourglass-loading"
      colors={['#ffead9','#ffacca']}
    />
  </div> 
  :
  <Router>
    <header className="header">
      <IoMenu className="menu-icon" onClick={() => setShowNav(!showNav)} />
    </header>

    <NavBar show={showNav} />
    <Banner />
    <div className="main">
      <Routes> 
        <Route path="/" element={<Home />} />  
        <Route path="/create" element={<Create />} />  
        <Route path="/read" element={<Read />} />  
        <Route path="/update" element={<Update />} />  
        <Route path="/delete" element={<Delete />} />  
      </Routes>
    </div>
    <Footer />

  </Router>      
}
    </>
  );
}

export default App;
