import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import DirectorySearch from '../components/directorySearch.js'
import { useEffect, useState } from 'react';
import { server } from '../config/config.js';
import {useSSE} from 'use-sse';

// page where you enter an address and get read-only details


export default function Directory() {

  return (
    <div>
      <Head>
        <title>Directory</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div><DirectorySearch /></div>

    </div>
  );
}
