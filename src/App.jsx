import React, { useState, useEffect } from 'react';
import ScrollButton from '@components/ScrollButton'; 
import NavBar from '@components/Navbar'; 
import Footer from '@components/Footer'; 
import Dashboard from '@views/Dashboard';
import { Hourglass } from 'react-loader-spinner'; 

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <> 
      {
        loading ? 
        <div className='bg-stone-950 h-screen flex justify-center items-center'>
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['rgb(199 52 58)', 'rgb(159, 131, 120)']}
          />
        </div> 
        :
        <div className="bg-stone-950 font-serif h-screen flex flex-col justify-between"> 
          <div className="flex-grow">
            <NavBar />
            <Dashboard />
            <ScrollButton />
          </div>
          <div>
          <Footer />
          </div>
        </div>
      }
    </>
  );
}

export default App;
