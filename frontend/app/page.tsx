'use client'
/* The code is importing several modules and hooks from different libraries. */
import React from 'react';

/* The code is importing three components: `LandingPage`, `NavBar`, and `Footer` from their respective
files located in the `../components` directory. These components are then used in the `App` function
to render them in the JSX code. */
import { LandingPage } from '../components/LandingPage';
import { Footer } from '../components/Footer';

function App() {

  return (
    <>
      <LandingPage />
      <Footer />
    </>
  );
}

export default App;
