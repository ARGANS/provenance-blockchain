// components/nameForm.js
import { useState, useEffect } from 'react';
import { Name } from '../utils/dataStructures.js'
import { server } from '../config/config.js';

// record for user details constructor(username, organization, orgid, website, phone, email, line1, line2, city, state, postalcode, country)

export default function NameForm({address, readonly}) {

  const [username, setUsername] = useState('');
  const [organization, setOrganization] = useState('');
  const [orgid, setOrgid] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalcode, setPostalcode] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
      if (address !== "") {
      console.log(server + "/api/get/details/" + address)
      fetch(server + "/api/get/details/" + address)
      .then(response => response.json())
      .then(data => {
        // check that there is an entry for the address
        if (data.length > 0) {
          const mostRecentDetails = data[data.length - 1];
          console.log(mostRecentDetails);
          setUsername(mostRecentDetails.data.json.username);
          setOrganization(mostRecentDetails.data.json.organization);
          setOrgid(mostRecentDetails.data.json.orgid);
          setWebsite(mostRecentDetails.data.json.website);
          setPhone(mostRecentDetails.data.json.phone);
          setEmail(mostRecentDetails.data.json.email);
          setLine1(mostRecentDetails.data.json.line1);
          setLine2(mostRecentDetails.data.json.line2);
          setCity(mostRecentDetails.data.json.city);
          setState(mostRecentDetails.data.json.state);
          setPostalcode(mostRecentDetails.data.json.postalcode);
          setCountry(mostRecentDetails.data.json.country);
        }
      })
      }
  }, [address])

  const submitName = async (e) => {
    e.preventDefault();
    console.log("Submit clicked")
    const data = new Name(username, organization, orgid, website, phone, email, line1, line2, city, state, postalcode, country);
    fetch(server + "/api/set/details", {
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

  console.log("My address", address)

  return (
    <>
      <div className='justify-center items-center h-screen flex'>
      <form onSubmit={submitName}>

        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="col-span-2 relative z-0 mb-6 w-full group">
            <label htmlFor="address" className='flex'>Blockchain address</label>
            <input
              className='bg-gray-100 shadow-inner rounded-l rounded-r p-2 w-full'
              id='address' aria-label='address' placeholder='Address' 
              value={address}
              disabled
             />
          </div>
        </div>
        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 mb-6 w-full group"> 
            <label htmlFor="username" className='flex'>Name</label>
            { !readonly && (
            <input
              className='bg-blue-200 shadow-inner rounded-l p-2 flex-1'
              id='username' aria-label='name' placeholder='Name' 
              value={username}
              onChange={e => setUsername(e.target.value)}
             />
            )}
            { !!readonly && (
            <input
              className='bg-gray-100 shadow-inner rounded-l p-2 flex-1'
              id='username' aria-label='name' placeholder='Name' 
              value={username}
              disabled
             />
            )}
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="organization" className='flex'>Organization</label>
            { !readonly && (
            <input
              className='bg-blue-200 shadow-inner rounded-l p-2 flex-1'
              id='organization' aria-label='organization' placeholder='Organization' 
              value={organization}
              onChange={e => setOrganization(e.target.value)}
             />
            )}
            { !!readonly && (
            <input
              className='bg-gray-100 shadow-inner rounded-l p-2 flex-1'
              id='organization' aria-label='organization' placeholder='Organization' 
              value={organization}
              disabled
             />
            )}
          </div>
        </div>

        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="orgid" className='flex'>Business Id</label>
            { !readonly && (
            <input
              className='bg-blue-200 shadow-inner rounded-l p-2 flex-1'
              id='orgid' aria-label='Business Id' placeholder='Business Id' 
              value={orgid} 
              onChange={e => setOrgid(e.target.value)} 
             />
            )}
            { !!readonly && (
            <input
              className='bg-gray-100 shadow-inner rounded-l p-2 flex-1'
              id='orgid' aria-label='Business Id' placeholder='Business Id' 
              value={orgid} 
              disabled
             />
            )}
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="website" className='flex'>Website</label>
            { !readonly && (
            <input
              className='bg-blue-200 shadow-inner rounded-r p-2 flex-1'
              id='website' aria-label='Website' placeholder='Website' 
              value={website} 
              onChange={e => setWebsite(e.target.value)} 
             />
            )}
            { !!readonly && (
            <input
              className='bg-gray-100 shadow-inner rounded-l p-2 flex-1'
              id='website' aria-label='Website' placeholder='Website' 
              value={website} 
              disabled
             />
            )}
          </div>
        </div>

        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 mb-6 w-full group"> 
            <label htmlFor="phone" className='flex'>Phone</label>
            { !readonly && (
            <input type="tel"
              className='bg-blue-200 shadow-inner rounded-l p-2 flex-1'
              id='phone' aria-label='phone' placeholder='Phone' 
              value={phone}
              onChange={e => setPhone(e.target.value)} 
             />
            )}
            { !!readonly && (
            <input type="tel"
              className='bg-gray-100 shadow-inner rounded-l p-2 flex-1'
              id='phone' aria-label='phone' placeholder='Phone' 
              value={phone}
              disabled
             />
            )}
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="email" className='flex'>Email</label>
            { !readonly && (
            <input type="email"
              className='bg-blue-200 shadow-inner rounded-r p-2 flex-1'
              id='email' aria-label='Email' placeholder='Email' 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
             />
            )}
            { !!readonly && (
            <input type="email"
              className='bg-gray-100 shadow-inner rounded-l p-2 flex-1'
              id='email' aria-label='Email' placeholder='Email' 
              value={email} 
              disabled
             />
            )}
          </div>
        </div>

        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 mb-6 w-full group"> 
            <label htmlFor="line1" className='flex'>Address</label>
            { !readonly && (
            <input
              className='bg-blue-200 shadow-inner rounded-l p-2 flex-1'
              id='line1' aria-label='Address' placeholder='Address' 
              value={line1} 
              onChange={e => setLine1(e.target.value)} 
             />
            )}
            { !!readonly && (
            <input
              className='bg-gray-100 shadow-inner rounded-l p-2 flex-1'
              id='line1' aria-label='Address' placeholder='Address' 
              value={line1} 
              disabled
             />
            )}
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="line2" className='flex'>Address (line 2)</label>
            { !readonly && (
            <input
              className='bg-blue-200 shadow-inner rounded-r p-2 flex-1'
              id='line2' aria-label='Line2' placeholder='Address (line 2)' 
              value={line2} 
              onChange={e => setLine2(e.target.value)} 
             />
            )}
            { !!readonly && (
            <input
              className='bg-gray-100 shadow-inner rounded-l p-2 flex-1'
              id='line2' aria-label='Line2' placeholder='Address (Line2)' 
              value={line2}
              disabled
             />
            )}
          </div>
        </div>

        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 mb-6 w-full group"> 
            <label htmlFor="postalcode" className='flex'>Postal code</label>
            { !readonly && (
            <input
              className='bg-blue-200 shadow-inner rounded-l p-2 flex-1'
              id='postalcode' aria-label='Postal code' placeholder='Postal code' 
              value={postalcode} 
              onChange={e => setPostalcode(e.target.value)} 
             />
            )}
            { !!readonly && (
            <input
              className='bg-gray-100 shadow-inner rounded-l p-2 flex-1'
              id='postalcode' aria-label='Postal code' placeholder='Postal code' 
              value={username}
              disabled
             />
            )}
          </div>
          <div className="relative z-0 mb-6 w-full group"> 
            <label htmlFor="city" className='flex'>City</label>
            { !readonly && (
            <input
              className='bg-blue-200 shadow-inner rounded-r p-2 flex-1'
              id='city' aria-label='City' placeholder='City' 
              value={city} 
              onChange={e => setCity(e.target.value)} 
             />
            )}
            { !!readonly && (
            <input
              className='bg-gray-100 shadow-inner rounded-l p-2 flex-1'
              id='city' aria-label='City' placeholder='City' 
              value={city}
              disabled
             />
            )}
          </div>
        </div>

        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="state" className='flex'>State</label>
            { !readonly && (
            <input
              className='bg-blue-200 shadow-inner rounded-l p-2 flex-1'
              id='state' aria-label='State' placeholder='State' 
              value={state} 
              onChange={e => setState(e.target.value)} 
             />
            )}
            { !!readonly && (
            <input
              className='bg-gray-100 shadow-inner rounded-l p-2 flex-1'
              id='state' aria-label='State' placeholder='State' 
              value={state}
              disabled
             />
            )}
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="country" className='flex'>Country</label>
            { !readonly && (
            <input
              className='bg-blue-200 shadow-inner rounded-r p-2 flex-1'
              id='country' aria-label='Country' placeholder='Country' 
              value={country} 
              onChange={e => setCountry(e.target.value)} 
             />
            )}
            { !!readonly && (
            <input
              className='bg-gray-100 shadow-inner rounded-l p-2 flex-1'
              id='coutry' aria-label='Country' placeholder='Country' 
              value={country}
              disabled
             />
            )}
          </div>
        </div>

        { !readonly &&
          (
          <div>
            <label htmlFor="submit" className='flex'>&nbsp;</label>
            <button id='submit' className='bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded p-2 flex-1'
              type='submit'
              onClick={submitName}
            >
              Write to blockchain
            </button>
          </div>
          )
        }

      </form>
      </div>
    </>
    )
}
