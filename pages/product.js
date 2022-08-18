import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import { server } from '../config/config.js';
import {useSSE} from 'use-sse';
import { sha256 } from 'js-sha256';
import ProductSearch from '../components/productSearch.js';


export default function Product() {

  const [myaddress, setMyaddress] = useState('');
  const [hashOutput, setHashOutput] = useState('');
  const [product, showProduct] = useState(false);
  const [notfound, showNotfound] = useState(false);

  const [dataStruct, setDataStruct] = useState([]);

  useEffect(() => {
    fetch(server + "/api/get/address")
    .then(response => response.json())
    .then(data => {
      setMyaddress(data.address);
    });
  }, [])

  const submitSearch = async (e) => {
    let result = [];
    e.preventDefault();
    fetch(server + "/api/get/record/" + hashOutput)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          showProduct(false);
          showNotfound(true);
        } else {
          console.log("The data retrieved is", data)
          setDataStruct(data);
          showProduct(true);
          showNotfound(false);
        }
      })
  }

  return (
    <div>
      <Head>
        <title>Argans Provenance Proof of Concept</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <form onSubmit={submitSearch}>
          <div>
            <span>
              <label htmlFor="address" className='flex'>Product identifier to search
              </label>
              <input
                className='bg-blue-200 shadow-inner rounded-l rounded-r p-2 w-full'
                id='id' aria-label='id' placeholder='Identifier' 
                value={hashOutput} 
                onChange={e => setHashOutput(e.target.value)} 
                // onChange={e => setId(e.target.value)}
               />
              <label htmlFor="submit" className='flex'>&nbsp;</label>
              <button id='submit' 
                className='bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded p-2 flex-1'
                type='submit'
                onClick={ submitSearch }
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </span>
          </div>
        </form>
      </div>

      <div>
        { (notfound) && (
          <div className="py-2">
            There is no product registered against the supplied identifier.
          </div>) 
        }
      </div>

      <div>
        { (product) && (<div className="py-2"><ProductSearch result={ dataStruct } /></div>) }
      </div>
    </div>
  );
}
