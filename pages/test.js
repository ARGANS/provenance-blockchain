import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import EventForm from '../components/dataforms/eventForm.js'
import { useEffect, useState } from 'react';
import { server } from '../config/config.js';
import {useSSE} from 'use-sse';

// page where you enter an address and get read-only details

const dataStruct =
[

{
 "apple" : "This",
 "banana" : "Is",
 "caper" : "A",
 "date" : "Test",
 "eggplant" : "Thing",
 "color" : "green",
 "description" : "a description"
},
{
 "apple" : "This",
 "banana" : "Is",
 "caper" : "A",
 "date" : "Test",
 "eggplant" : "Thing",
 "color" : "red",
 "description" : "a description"
},
{
 "apple" : "This",
 "banana" : "Is",
 "caper" : "A",
 "date" : "Test",
 "eggplant" : "Thing",
 "color" : "blue",
 "description" : "a description"
}

]

export default function Test() {

  return (
    <div>
      <Head>
        <title>Directory</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className="accordion" id="accordionConfig">
        {
          dataStruct.map((element, idx) => { 
            return (
                  <div className={"bg-" + element["color"] + "-200 w-full border border-gray-200 divide-y divide-gray-200 p-2"}>
                    <details>
                      <summary>Accordion { idx.toString()} </summary>
                      <EventForm event={element} readonly={true} submit={true} />
                    </details>
                  </div>
            )
          })
        }
      </div>
    </div>
  );
}
