import { useState, useEffect } from 'react';
import { IoMenu } from 'react-icons/io5';
import SearchBarClients from '@components/SearchBarClients'; 
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
import BankAccount from '@views/BankAccount';
import CreateAccount from '@views/Create_Account';
import ReadAccount from '@views/Read_Account';
import UpdateAccount from '@views/Update_Account';
import StatusAccount from '@views/Status_Account';
import BalanceAccount from '@views/Balance_Account';
import SearchCard from '@views/SearchCard';
import CreateCard from '@views/CreateCard';
import ReadCard from '@views/ReadCard';
import DeleteCard from '@views/DeleteCard';

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
      <SearchBarClients />
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
        <Route path="/bankaccount/:clientId" element={<BankAccount />} /> 
        
        <Route path="/account/create" element={<CreateAccount />} />
        <Route path="/account/read" element={<ReadAccount />} />
        <Route path="/account/update" element={<UpdateAccount />} />
        <Route path="/account/status" element={<StatusAccount />} />
        <Route path="/account/balance" element={<BalanceAccount />} />


        <Route path="/card/search" element={<SearchCard />} />
        <Route path="/card/create" element={<CreateCard />} />
        <Route path="/card/read" element={<ReadCard />} />
        <Route path="/card/delete" element={<DeleteCard />} />
      </Routes>
    </div>
    <Footer />
  </Router>      
}
    </>
  );
}

export default App;
