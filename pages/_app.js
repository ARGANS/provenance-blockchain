import Navbar from '../components/navbar'
import '../styles/globals.css'
import React from 'react';
import { SessionProvider } from "next-auth/react";
import UserContext from '../components/UserContext';

function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  return (
    <SessionProvider session={session}>
    <>
    <Navbar />
    <div className="container max-w-prose mx-auto">
           <Component {...pageProps} />
    </div>
    </>
    </SessionProvider>
  )
}

export default MyApp
