import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FaucetForm from '../components/dataforms/faucetForm.js'
import { useEffect, useState } from 'react';
import { server } from '../config/config.js';
import {useSSE} from 'use-sse';

// page where you enter an address and get read-only details


export default function Faucet() {

  return (
    <div>
      <Head>
        <title>Faucet</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div><FaucetForm /></div>

    </div>
  );
}
