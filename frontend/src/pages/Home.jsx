import React from 'react'
import Services from './Services';
import Hero from './Hero';
import Compnaies from './Compnaies';
import AboutUs from './AboutUs';
import New from './New';
import JoinUs from './JoinUs';

// import { AuthProvider } from '../AuthContext';

const Home = () => {





  return (
    <section className="flex flex-col items-center justify-center">
      <Hero/>
      <Compnaies/>
      <Services/>
      <AboutUs/>
      <New/>
      <JoinUs/>
    </section>
  )
}

export default Home