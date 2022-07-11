// components/nameForm.js
import { useState, useEffect } from 'react';
// import { Generation } from '../utils/dataStructures.js'
import { server } from '../../config/config.js';
import parse from 'html-react-parser';

// record for user details constructor(username, organization, orgid, website, phone, email, line1, line2, city, state, postalcode, country)

export default function eventForm({event, readonly, submit}) {
  const [myaddress, setMyaddress] = useState('');
  const [myowner, setMyowner] = useState('');
  const [color, setColor] = useState(event["color"]);
  const [description, setDescription] = useState(event["Description"]);
  const [owner, setOwner] = useState("Unknown");

  useEffect(() => {
    fetch(server + "/api/get/address")
    .then(response => response.json())
    .then(data => {
      setMyaddress(data.address);
      setMyowner(data.address);
    });
  }, [])

  const submitForm = async (e) => {
    const data = event
    data["Description"] = description;
    if ("Proposed owner" in data) { data["Proposed owner"] = owner };
    if ("Owner" in data) { data["Owner"] = myowner };
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
    })
  }

  return (
    <>
      <div className={ 'bg-' + color + '-100 justify-center items-top h p-2' }> 
        <form onSubmit={ submitForm }>
          <span className="bg-violet-100"/><span className="bg-blue-100"/> <span className="bg-red-100"/><span className="bg-green-100"/>
          <span className="bg-yellow-100"/><span className="bg-indigo-100"/><span className="bg-lime-100"/> <span className="bg-violet-100"/> 

          <span className="bg-violet-200"/><span className="bg-blue-200"/> <span className="bg-red-200"/><span className="bg-green-200"/>
          <span className="bg-yellow-200"/><span className="bg-indigo-200"/><span className="bg-lime-200"/> <span className="bg-violet-200"/> 

          <span className="bg-violet-600"/><span className="bg-blue-600"/> <span className="bg-red-600"/><span className="bg-green-600"/>
          <span className="bg-yellow-600"/><span className="bg-indigo-600"/><span className="bg-lime-600"/> <span className="bg-violet-600"/> 

          <span className="bg-violet-700"/><span className="bg-blue-700"/> <span className="bg-red-700"/><span className="bg-green-700"/>
          <span className="bg-yellow-700"/><span className="bg-indigo-700"/><span className="bg-lime-700"/> <span className="bg-violet-700"/> 
          <div>
            {
              Object.keys(event).map((key) => { 
                // console.log("Key:", key)
                if (
                    (((key !== 'color') && 
                     ((key !== 'Description') && 
                     (key !== 'Proposed owner'))) && (key !== 'Owner')) 
                     || (!submit && (key !== 'color'))) {
                  return (
                    <div className="col-span-1 relative z-0 mb-6 w-full group" key={ "Form-"+ key }>
                      <label htmlFor="type" className="flex">{ key }</label>
                      <input
                        className={ "bg-gray-200 shadow-inner rounded-l rounded-r p-2 w-full" }
                        id={ key }
                        aria-label={ key }
                        value={ event[key] }
                        readOnly={true}
                      />
                    </div>
                  )
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
                }
              })
            }
          </div>
          { !!submit &&
            (
            <div>
              <label htmlFor="submit" className='flex'>&nbsp;</label>
              <button id='submit'
                className={ 'bg-' + event["color"] + '-600 hover:bg-' + event["color"] + '-700 duration-300 text-white shadow p-2 rounded p-2 flex-1'}
                type='submit'
                onClick={submitForm}
              >
                Submit record
              </button>
            </div>
          )
        }
        </form>
      </div>
    </>
    )
}