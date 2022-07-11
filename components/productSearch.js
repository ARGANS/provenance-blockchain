// components/productSearch.js
import { useState, useEffect } from 'react';
import { server } from '../config/config.js';
import { ProxyGeneration, Generation } from  '../utils/dataStructures';
import EventForm from '../components/dataforms/eventForm.js';
import ResultAccordion from '../components/resultAccordion.js';
import { sha256 } from 'js-sha256';

// record for user details constructor(username, organization, orgid, website, phone, email, line1, line2, city, state, postalcode, country)

export default function ProductSearch({prodId, filename}) {

  const [id, setId] = useState(prodId);
  const [genesis, showGenesis] = useState(false);
  const [prereg, showPrereg] = useState(false);
  const [found, showFound] = useState(false);
  const [reg, showReg] = useState(false);

  const [newproxy, setNewproxy] = useState(new ProxyGeneration());
  const [newgenesis, setNewgenesis] = useState(new Generation());
  const [dataStruct, setDataStruct] = useState([]);

  const submitSearch = async (e) => {
    showPrereg(false); 
    showReg(false);
    showGenesis(false);
    let result = [];
    e.preventDefault();
    console.log(prodId);
    fetch(server + "/api/get/record/" + prodId)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.length === 0) {
          showGenesis(true);
        } else {
          setDataStruct(data)
          showFound(true);
        }
      })
  }

  function strSha256(hexstr) {
      // We transform the string into an arraybuffer.
      var buffer = new Uint8Array(hexstr.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
     }))
    // https://github.com/EOSIO/eosjs-ecc#examples
    return sha256(buffer)
  }

  function preregister() {
    showGenesis(false);
    const tempProxy = new ProxyGeneration();
    tempProxy["Product identifier"] = strSha256(prodId);
    tempProxy["File identifier"] = prodId;
    tempProxy["Filename"] = filename;
    tempProxy["Description"] = "none";
    setNewproxy(tempProxy);
    showPrereg(true);
  }

  function register() {
    showPrereg(false);
    const tempGenesis = new Generation();
    tempGenesis["Product identifier"] = strSha256(prodId);
    tempGenesis["File identifier"] = prodId;
    tempGenesis["Filename"] = filename;
    tempGenesis["Description"] = "none";
    setNewgenesis(tempGenesis);
    showReg(true);
  }

  return (
    <>
      <div>

        <form onSubmit={submitSearch}>
          <div>
            <span>
              <label htmlFor="address" className='flex'>File identifier to search
              </label>
              <input
                className='bg-blue-200 shadow-inner rounded-l rounded-r p-2 w-full'
                id='id' aria-label='id' placeholder='Identifier' 
                value={prodId}
                readOnly={true}
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

        <div>
        {
          ( genesis) && (
            <div className="py-4">
              <div>
                There is no product registered against the hash of this file. You can register the file against your own
                address if you are the producer of this file, or you can register it on behalf of another entity who can
                claim it later.
              </div>
              <div className="py-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={e => register()}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Register as your file
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>&nbsp;&nbsp;
                <button className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded" onClick={e => preregister()}>
                  Pre-register for someone else
                </button>
              </div>
            </div>
          )
        }
        </div>

        <div>
        { (!reg && !prereg) && (
            <div className="py-4">
              <div>
                If this file is a modification to an existing product, you can record it against that product with one
                of the following events:
              </div>
              <div className="py-4">
                <button className="bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={e => register()}>
                  &nbsp;&nbsp;Processing event&nbsp;
                </button>&nbsp;&nbsp;
                <button className="bg-indigo-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded" onClick={e => preregister()}>
                  &nbsp;&nbsp;Merging event&nbsp;&nbsp;&nbsp;
                </button>&nbsp;&nbsp;
                <button className="bg-violet-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={e => register()}>
                  &nbsp;&nbsp;Packaging event&nbsp;&nbsp;
                </button>
              </div>
              <div className="py-4">
                <button className="bg-red-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded" onClick={e => preregister()}>
                  &nbsp;&nbsp;&nbsp;&nbsp;Deletion event&nbsp;&nbsp;&nbsp;
                </button>&nbsp;&nbsp;
                <button className="bg-pink-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={e => register()}>
                  Correction event
                </button>
              </div>
           </div>
           )
        }
        </div>

        <div>
        {
          prereg && (
          <div className="py-4">
            <EventForm event={newproxy} readonly={true} submit={true} />
          </div>
          )
        }
        </div>

        <div>
        {
          reg && (
          <div className="py-4">
            <EventForm event={newgenesis} readonly={true} submit={true} />
          </div>
          )
        }
        </div>

        <div>
        {
          found && (
            <div className="py-4">
              <ResultAccordion resultStruct={ dataStruct } />
            </div>
          )
        }
        </div>

      </div>
    </>
    )
}
