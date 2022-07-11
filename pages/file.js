import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import { server } from '../config/config.js';
import {useSSE} from 'use-sse';
import { sha256 } from 'js-sha256';
import FileSearch from '../components/fileSearch.js';


export default function File() {

  const [myaddress, setMyaddress] = useState('');
  const [hashOutput, setHashOutput] = useState('');
  const [filestring, setFilestring] = useState('');

  useEffect(() => {
    fetch(server + "/api/get/address")
    .then(response => response.json())
    .then(data => {
      setMyaddress(data.address);
    });
  }, [])

  useEffect(() => {
    console.log(hashOutput);
  }, [hashOutput]);

  function readbinaryfile(file) {
    return new Promise((resolve, reject) => {
      var fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result)
      };
      fr.readAsArrayBuffer(file);
    });
  }

  function hash() {
    if (typeof fileselector !== "undefined") {
      setFilestring(fileselector.value.replace('C:\\fakepath\\', ''))
      if (fileselector.files.length !== 0) {
        setHashOutput('Computing hash...');
        console.log(fileselector.files.length)
        readbinaryfile(fileselector.files[0])
          .then(function(result) {
            const hashResult = sha256(result)
            setHashOutput(hashResult)
          })
      } else {
        console.log("No file selected")
      }
    }
  }
  

  return (
    <div>
      <Head>
        <title>Argans Provenance Proof of Concept</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <label className="block mb-0 text-md font-medium text-gray-900 dark:text-blue-300" htmlFor="file_input">Select file:</label>
        <input
          className="block w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer p-0"
          type="file" id="fileselector"
          onInput={ (event) => { hash() }}
          onClick={(event) => { event.target.value = null}}
        />

      </div>
      <br/>
        { (hashOutput !== '') && (<div><FileSearch fileId={ hashOutput } filename={ filestring } /></div>) }
    </div>
  );
}
