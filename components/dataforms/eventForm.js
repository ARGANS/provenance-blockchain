// components/nameForm.js
import { useState, useEffect } from 'react';
// import { Generation } from '../utils/dataStructures.js'
import { server } from '../../config/config.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// record for user details constructor(username, organization, orgid, website, phone, email, line1, line2, city, state, postalcode, country)

export default function eventForm({event, readonly, submit}) {

  const [myaddress, setMyaddress] = useState('');
  const [myowner, setMyowner] = useState('');
  const [color, setColor] = useState(event["color"]);
  const [description, setDescription] = useState(event["Description"]);
  const [owner, setOwner] = useState("Unknown");
  const [productId, setProductId] = useState(event["Product identifier"]);
  const [corrections, setCorrections] = useState((typeof event["Corrections"] !== 'undefined') ? event["Corrections"] : ['','','']);
  const [packaging, setPackaging] = useState((typeof event["Packaged files"] !== 'undefined') ? event["Packaged files"] : ['','','']);
  const [submitted, setSubmitted] = useState('')

  useEffect(() => {
    fetch(server + "/api/get/address")
    .then(response => response.json())
    .then(data => {
      setMyaddress(data.address);
      setMyowner(data.address);
    });
  }, [])


  const setCorrectionsFunction = async (e, idx) => {
    console.log(e, idx)
    const tempArray = corrections
    console.log(corrections)
    tempArray[idx] = e
    setCorrections(tempArray)
  }

  const setPackagingFunction = async (e, idx) => {
    console.log(e, idx)
    const tempArray = packaging
    console.log(packaging)
    tempArray[idx] = e
    setPackaging(tempArray)
  }

  const submitForm = async (e) => {
    const data = event
    data["Description"] = description;
    if ("Proposed owner" in data) { data["Proposed owner"] = owner };
    if ("Owner" in data) { data["Owner"] = myowner };
    if ("Corrections" in data) { data["Corrections"] = corrections};
    if ("Packaging" in data) { data["Packaged files"] = corrections};
    data["Product identifier"] = productId;
    // delete data.color
    e.preventDefault();
    fetch(server + "/api/set/record", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(result => {
      console.log(result.body);
      setSubmitted(event["Type"] + " event submitted to the blockchain");
    })
  }

  return (
    <>
      <div>
       { (submitted === '') && (
      <div className={ 'bg-' + color + '-100 justify-center items-top h p-2' }> 
        <form onSubmit={ submitForm }>
          <span className="bg-violet-100"/><span className="bg-blue-100"/> <span className="bg-red-100"/><span className="bg-green-100"/>
          <span className="bg-yellow-100"/><span className="bg-indigo-100"/><span className="bg-lime-100"/> <span className="bg-pink-100"/> 

          <span className="bg-violet-200"/><span className="bg-blue-200"/> <span className="bg-red-200"/><span className="bg-green-200"/>
          <span className="bg-yellow-200"/><span className="bg-indigo-200"/><span className="bg-lime-200"/> <span className="bg-pink-200"/> 

          <span className="bg-violet-600"/><span className="bg-blue-600"/> <span className="bg-red-600"/><span className="bg-green-600"/>
          <span className="bg-yellow-600"/><span className="bg-indigo-600"/><span className="bg-lime-600"/> <span className="bg-pink-600"/> 

          <span className="bg-violet-700"/><span className="bg-blue-700"/> <span className="bg-red-700"/><span className="bg-green-700"/>
          <span className="bg-yellow-700"/><span className="bg-indigo-700"/><span className="bg-lime-700"/> <span className="bg-pink-700"/> 

          <div>
            {
              Object.keys(event).map((key) => { 
                // console.log("Key:", key)
                if (
                    (((key !== 'color') && 
                     ((key !== 'Description') && 
                     (key !== 'Proposed owner'))) && (key !== 'Owner') && (key !== 'Corrections') && (key !== 'Packaged files')) 
                     || (!submit && (key !== 'color'))) {
                  if (key === 'Product identifier') {
                    if (event['Product identifier'] !== '') {
                      return (
                        <div className="col-span-1 relative z-0 mb-6 w-full group" key={ "Form-"+ key }>
                          <label htmlFor="type" className="flex">{ key }</label>
                            <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pl-0 justify-self-end" onClick={() => {navigator.clipboard.writeText(event[key])}}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"
                                fill="none" stroke="blue" strokeWidth="2" strokeLinecap="round" 
                                strokeLinejoin="round" className="feather feather-copy">
                                <rect stroke="#E5E7EB" strokeWidth="2" width="100%" height="100%" fill="#E5E7EB" />
                                <rect x="11" y="11" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1">
                                </path>
                              </svg>
                            </div>
                              <input
                                className={ "bg-gray-200 shadow-inner rounded-l rounded-r p-2 w-full" }
                                id={ key }
                                aria-label={ key }
                                value={ event[key] }
                                onClick={() => {navigator.clipboard.writeText(event[key])}}
                                readOnly={true}
                              />
                            </div>
                        </div>
                      ) 
                    } else {
                      return (
                        <div className="col-span-1 relative z-0 mb-6 w-full group" key={ "Form-"+ key }>
                          <label htmlFor="type" className="flex">{ key }</label>
                            <div className="relative">
                              <input
                                className={ "bg-" + event["color"]+ "-200 shadow-inner rounded-l rounded-r p-2 w-full" }
                                id={ key }
                                aria-label={ key }
                                value={ productId }
                                onChange={e => setProductId(e.target.value)} 
                              />
                            </div>
                        </div>
                      )
                    }
                  } else if (key === 'Corrections') {
                    return (
                      <div className="col-span-1 relative z-0 mb-6 w-full group" key={ "Form-"+ key }>
                      <label htmlFor="type" className="flex">{ key }</label>
                      {
                        corrections.map((element, idx) => {
                          return (
                            <input
                              className={ "bg-gray-200 shadow-inner rounded-l rounded-r p-2 w-full" }
                              id={ key + idx.toString()}
                              key={ key + idx.toString()}
                              aria-label={ key }
                              value={ event[key][idx] }
                              readOnly={true} 
                            />
                          )
                        })
                      }
                      </div>
                    )
                  } else if (key === 'Packaged files') {
                    return (
                      <div className="col-span-1 relative z-0 mb-6 w-full group" key={ "Form-"+ key }>
                      <label htmlFor="type" className="flex">{ key }</label>
                      {
                        corrections.map((element, idx) => {
                          return (
                            <input
                              className={ "bg-gray-200 shadow-inner rounded-l rounded-r p-2 w-full" }
                              id={ key + idx.toString()}
                              key={ key + idx.toString()}
                              aria-label={ key }
                              value={ event[key][idx] }
                              readOnly={true} 
                            />
                          )
                        })
                      }
                      </div>
                    )
                  } else {
                    return (
                      <div className="col-span-1 relative z-0 mb-6 w-full group" key={ "Form-"+ key }>
                        <label htmlFor="type" className="flex">{ key }</label>
                        <input
                          className={ "bg-gray-200 shadow-inner rounded-l rounded-r p-2 w-full" }
                          id={ key }
                          aria-label={ key }
                          value={ (typeof event[key] === 'string') ? event[key] : JSON.stringify(event[key])}
                          readOnly={true}
                        />
                      </div>
                    )
                  }
                // these if statements are for editing
                } else if (key === 'Description') {
                   return (
                    <div className="col-span-1 relative z-0 mb-6 w-full group" key={ "Form-"+ key }>
                      <label htmlFor="type" className="flex">{ key }</label>
                      <input
                        className={ "bg-" + event["color"]+ "-200 shadow-inner rounded-l rounded-r p-2 w-full" }
                        id={ key }
                        aria-label={ key }
                        value={ description }
                        onChange={e => setDescription(e.target.value)} 
                      />
                    </div>
                  )   
                } else if (key === 'Proposed owner') {
                   return (
                    <div className="col-span-1 relative z-0 mb-6 w-full group" key={ "Form-"+ key }>
                      <label htmlFor="type" className="flex">{ key }</label>
                      <input
                        className={ "bg-" + event["color"]+ "-200 shadow-inner rounded-l rounded-r p-2 w-full" }
                        id={ key }
                        aria-label={ key }
                        value={ owner }
                        onChange={e => setOwner(e.target.value)} 
                      />
                    </div>
                  )   
                } else if (key === 'Owner') {
                   return (
                    <div className="col-span-1 relative z-0 mb-6 w-full group" key={ "Form-"+ key }>
                      <label htmlFor="type" className="flex">{ key }</label>
                      <input
                        className={ "bg-" + event["color"]+ "-200 shadow-inner rounded-l rounded-r p-2 w-full" }
                        id={ key }
                        aria-label={ key }
                        value={ myowner }
                        onChange={e => setMyowner(e.target.value)} 
                      />
                    </div>
                  )   
                } else if (key === 'Corrections') {
                    return (
                      <div className="col-span-1 relative z-0 mb-6 w-full group" key={ "Form-"+ key }>
                      <label htmlFor="type" className="flex">{ key }</label>
                      {
                        corrections.map((element, idx) => {
                          return (
                            <input
                              className={ "bg-" + event["color"] + "-200 shadow-inner rounded-l rounded-r p-2 w-full" }
                              id={ key + "-" + idx.toString()}
                              key={ key + idx.toString()}
                              aria-label={ key }
                              value={ event[key][idx] }
                              onChange={e => setCorrectionsFunction(e.target.value, idx)}
                            />
                          )
                        })
                      }
                      </div>
                    )
                  } else if (key === 'Packaged files') {
                    return (
                      <div className="col-span-1 relative z-0 mb-6 w-full group" key={ "Form-"+ key }>
                      <label htmlFor="type" className="flex">{ key }</label>
                      {
                        corrections.map((element, idx) => {
                          return (
                            <input
                              className={ "bg-" + event["color"] + "-200 shadow-inner rounded-l rounded-r p-2 w-full" }
                              id={ key + "-" + idx.toString()}
                              key={ key + idx.toString()}
                              aria-label={ key }
                              value={ event[key][idx] }
                              onChange={e => setPackagingFunction(e.target.value, idx)}
                            />
                          )
                        })
                      }
                      </div>
                    )
                  }
              })
            }
          </div>
          { !!submit &&
            (
            <div>
              <label htmlFor="submit" className='flex'>&nbsp;</label>
              <button id='submit'
                className={ 'bg-' + ((productId.length !== 64) ? "gray" : event["color"]) + '-600 hover:bg-' + ((productId.length !== 64) ? "gray" : event["color"]) + '-700 duration-300 text-white shadow p-2 rounded p-2 flex-1'}
                type='submit'
                onClick={submitForm}
                disabled={ (productId.length !== 64) }
              >
                Submit record
              </button>
            </div>
          )
        }
        </form>
      </div>
      )}
      </div>
      <div>
      { (submitted !== '') && (
        <div>
          { submitted }
        </div>
      )}
      </div>
    </>
    )
}
