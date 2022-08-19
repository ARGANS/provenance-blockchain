// components/fileSearch.js
import { useState, useEffect } from 'react';
import { server } from '../config/config.js';
import { 
  ProxyGeneration,
  Generation,
  Processing,
  Merging,
  Packaging,
  Deletion,
  Correction
} from  '../utils/dataStructures';
import EventForm from '../components/dataforms/eventForm.js';
import ResultAccordion from '../components/resultAccordion.js';
import { sha256 } from 'js-sha256';

// record for user details constructor(username, organization, orgid, website, phone, email, line1, line2, city, state, postalcode, country)

export default function FileSearch({fileId, filename}) {

  const [id, setId] = useState(fileId);
  const [buttons, showButtons] = useState(false);
  const [prereg, showPrereg] = useState(false);
  const [found, showFound] = useState(false);
  const [reg, showReg] = useState(false);

  const [processB, showProcessB] = useState(false);
  const [mergeB, showMergeB] = useState(false);
  const [packageB, showPackageB] = useState(false);
  const [deleteB, showDeleteB] = useState(false);
  const [correctB, showCorrectB] = useState(false);

  const [newproxy, setNewproxy] = useState(new ProxyGeneration());
  const [newgenesis, setNewgenesis] = useState(new Generation());
  const [newprocessing, setNewprocessing] = useState(new Processing());
  const [newmerging, setNewmerging] = useState(new Merging());
  const [newpackaging, setNewpackaging] = useState(new Packaging());
  const [newdeletion, setNewdeletion] = useState(new Deletion());
  const [newcorrection, setNewcorrection] = useState(new Correction());

  const [dataStruct, setDataStruct] = useState([]);


  function hideAll() {
    // showButtons(false)
    showPrereg(false)
    showFound(false)
    showReg(false)
    showProcessB(false)
    showMergeB(false)
    showPackageB(false)
    showDeleteB(false)
    showCorrectB(false)
  }

  function hideForms() {
    showPrereg(false)
    showReg(false)
    showProcessB(false)
    showMergeB(false)
    showPackageB(false)
    showDeleteB(false)
    showCorrectB(false)
  }

  const submitSearch = async (e) => {
    showFound(false)
    hideForms();
    let result = [];
    e.preventDefault();
    console.log(fileId);
    fetch(server + "/api/get/record/" + fileId)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.length === 0) {
          showButtons(true);
        } else {
          console.log("The data retrieved is", data)
          setDataStruct(data)
          showFound(true);
          showButtons(true);
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
    hideAll();
    const tempData = new ProxyGeneration();
    tempData["Product identifier"] = strSha256(fileId);
    tempData["File identifier"] = fileId;
    tempData["Filename"] = filename;
    tempData["Description"] = "none";
    setNewproxy(tempData);
    showPrereg(true);
  }

  function register() {
    hideAll();
    const tempData = new Generation();
    tempData["Product identifier"] = strSha256(fileId);
    tempData["File identifier"] = fileId;
    tempData["Filename"] = filename;
    tempData["Description"] = "none";
    setNewgenesis(tempData);
    showReg(true);
  }

  function processF() {
    hideAll();
    const tempData = new Processing();
    tempData["Product identifier"] = "";
    tempData["File identifier"] = fileId;
    tempData["Filename"] = filename;
    tempData["Description"] = "none";
    setNewprocessing(tempData);
    showProcessB(true);
  }

  function mergeF() {
    hideAll();
    const tempData = new Merging();
    tempData["Product identifier"] = "";
    tempData["File identifier"] = fileId;
    tempData["Filename"] = filename;
    tempData["Description"] = "none";
    setNewmerging(tempData);
    showMergeB(true);
  }

  function packageF() {
    hideAll();
    const tempData = new Packaging();
    tempData["Product identifier"] = "";
    tempData["File identifier"] = fileId;
    tempData["Filename"] = filename;
    tempData["Description"] = "none";
    setNewpackaging(tempData);
    showPackageB(true);
  }

  function deleteF() {
    hideAll();
    const tempData = new Deletion();
    tempData["Product identifier"] = "";
    tempData["File identifier"] = fileId;
    tempData["Filename"] = filename;
    tempData["Description"] = "none";
    setNewdeletion(tempData);
    showDeleteB(true);
  }

  function correctF() {
    hideAll();
    const tempData = new Correction();
    tempData["Product identifier"] = "";
    tempData["File identifier"] = fileId;
    tempData["Filename"] = filename;
    tempData["Description"] = "none";
    setNewcorrection(tempData);
    showCorrectB(true);
  }

  function modifier() {
    return ((!reg && !prereg) && buttons)
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
                value={fileId}
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
          (buttons && !found) && (
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
        { modifier() && (
            <div className="py-4">
              <div>
                If this file is a modification to an existing product, you can record it against that product with one
                of the following events:
              </div>
              <div className="py-4">
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={e => processF()}>
                  &nbsp;&nbsp;Processing event&nbsp;
                </button>&nbsp;&nbsp;
                <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={e => mergeF()}>
                  &nbsp;&nbsp;Merging event&nbsp;&nbsp;&nbsp;
                </button>&nbsp;&nbsp;
                <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" onClick={e => packageF()}>
                  &nbsp;&nbsp;Packaging event&nbsp;&nbsp;
                </button>
              </div>
              <div className="py-4">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={e => deleteF()}>
                  &nbsp;&nbsp;&nbsp;&nbsp;Deletion event&nbsp;&nbsp;&nbsp;
                </button>&nbsp;&nbsp;
                <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" onClick={e => correctF()}>
                  Correction event
                </button>
              </div>
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
          processB && (
          <div className="py-4">
            <EventForm event={newprocessing} readonly={true} submit={true} />
          </div>
          )
        }
        </div>

        <div>
        {
          mergeB && (
          <div className="py-4">
            <EventForm event={newmerging} readonly={true} submit={true} />
          </div>
          )
        }
        </div>

        <div>
        {
          packageB && (
          <div className="py-4">
            <EventForm event={newpackaging} readonly={true} submit={true} />
          </div>
          )
        }
        </div>

        <div>
        {
          deleteB && (
          <div className="py-4">
            <EventForm event={newdeletion} readonly={true} submit={true} />
          </div>
          )
        }
        </div>

        <div>
        {
          correctB && (
          <div className="py-4">
            <EventForm event={newcorrection} readonly={true} submit={true} />
          </div>
          )
        }
        </div>

      </div>
    </>
    )
}
