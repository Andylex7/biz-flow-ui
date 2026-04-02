import React, { useState } from 'react';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';

const App = () => {
  const [isBoarded, setIsBoarded] = useState(false);

  return (
    <>
      <Toaster position="top-right" expand={true} richColors />
      {!isBoarded ? (
        <Onboarding onComplete={() => setIsBoarded(true)} />
      ) : (
        <Layout />
      )}
    </>
  );
};

export default App;