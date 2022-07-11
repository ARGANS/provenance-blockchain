import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NameForm from '../components/dataforms/nameForm.js'
import { useEffect, useState } from 'react';
import { server } from '../config/config.js';
import {useSSE} from 'use-sse';
import SocialButton from '../components/socialButton';
import { signIn, signOut, useSession } from 'next-auth/react';
import NftCard from '../components/nftCard';


export default function Index() {

  const [ descr, setDescr ] = useState('');
  const [ connected, setConnected ] = useState(false);
  const [ provider, setProvider ] = useState(false);
  const [ myaddress, setMyaddress] = useState('');
  const [ myname, setMyName] = useState('');
  const { data, status } = useSession()

  // console.log("Index session data: ", data);

  useEffect(() => {
    fetch(server + "/api/get/address")
    .then(response => response.json())
    .then(data => {
      setMyaddress(data.address);
    });
  }, [])

  useEffect(() => {
    if (status === "authenticated") {
      setMyName(data.user.name)
    }
  })

  return (
    <div>
      <Head>
        <title>Argans Provenance Proof of Concept</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      { !(status === "authenticated") && (
        <div>
          <div>
            Log in with social media to connect your blockchain address to your
            profile.
          </div>
          <div className="py-2 text-center" onClick={() => signIn() }>
            <SocialButton />
          </div>
        </div>
       )}
       { (status === "authenticated") && (
         <div className="bg-gray-50">You are logged in as:
           <div className="py-6">
             <NftCard
                  name={ (data?.user?.name) ? data.user.name : "Error - sign out and try again"}
                  description={descr}
                  image={ (data?.user?.image) ? data.user.image : "" }
                  provider={ (data?.user?.provider) ? data.user.provider : "" }
                  url={ (data?.user?.url) ? data.user.url : "" }
             />
           </div>
           <div className="text-center">
             <span>
               <a
                 className="no-underline hover:underline cursor-pointer text-pink-500"
                 onClick={() => signOut()}>
                 Sign out
               </a>&nbsp;
             </span>
              to switch to a different social media profile and start again.
           </div>

           <div className="p-2"><NameForm address={myaddress} name={myname} readonly={false} submit={true}/></div>
         </div>
       )}
    </div>
  );
}
