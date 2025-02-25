import { useState } from 'react'
import Footer from '@components/Footer'; 
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <div className="bg-stone-950 font-serif">
          <Footer />
        </div>
    </>
  )
}

export default App
