// components/nameForm.js
import { useState, useEffect } from 'react';
import { Name } from '../utils/dataStructures.js'
import NameForm from '../components/dataforms/nameForm.js'
import { server } from '../config/config.js';

// record for user details constructor(username, organization, orgid, website, phone, email, line1, line2, city, state, postalcode, country)

export default function DirectorySearch() {

  const [address, setAddress] = useState('');
  const [result, showResult] = useState(false);

  const submitSearch = async (e) => {
    e.preventDefault();
    showResult(true);
  }

  return (
    <>
      <div className='justify-center items-start h-screen flex'>
      <form onSubmit={submitSearch}>

        <div className="grid xl:grid-cols-2 xl:gap-6 px-2">
          <div className="col-span-2 relative z-0 mb-6 w-full group">
            <label htmlFor="address" className='flex'>Blockchain address to search
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

        <div>
          <label htmlFor="submit" className='flex'>&nbsp;</label>
          <button id='submit' 
            className='bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded p-2 flex-1'
            type='submit'
            onClick={submitSearch}
            >
              Search
          </button>
        </div>

      </form>
        <div className="grid xl:grid-cols-1 xl:gap-6 px-2">
          { result && (<div><NameForm address={address} readonly={true}/></div>) }
          { !result && (<div><NameForm address='' readonly={true}/></div>) }
        </div>
      </div>

 
    </>
    )
}
