// components/nameForm.js
import { useState, useEffect } from 'react';
import { Name } from '../../utils/dataStructures.js'
import { server } from '../../config/config.js';

// 

export default function Home() {

  const [address, setAddress] = useState('');
  const [result, showResult] = useState('');

  const submitPayment = async (e) => {
    e.preventDefault();
    const data = [address, 1000]
    fetch(server + "/api/set/send/" + address + "/1000")
    .then(result => {
      console.log(result.body);
      showResult('Sent payment of 1000 tokens to ' + address);
    })
  }

  return (
    <>
      <div className='justify-center items-start h-screen flex'>
      <form onSubmit={submitPayment}>

        <div className="grid xl:grid-cols-2 xl:gap-6 px-2">
          <div className="col-span-2 relative z-0 mb-6 w-full group">
            <label htmlFor="address" className='flex'>Blockchain address to pay
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input
              className='bg-blue-200 shadow-inner rounded-l rounded-r p-2 w-full'
              id='address' aria-label='address' placeholder='Address' 
              value={address}
              onChange={e => setAddress(e.target.value)}
             />
          </div>
        </div>

        <div className="grid xl:grid-cols-2 xl:gap-6 px-2">
          <div className="col-span-2 relative z-0 mb-6 w-full group">
            <label htmlFor="submit" className='flex'>&nbsp;</label>
            <button id='submit' 
              className='bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded p-2 flex-1'
              type='submit'
              onClick={submitPayment}
              >
                Pay 1000 tokens
            </button>
          </div>
        </div>
        <div className="grid xl:grid-cols-1 xl:gap-6 px-2">
          <div>{result}</div>
        </div>
      </form>
      </div>

 
    </>
    )
}
