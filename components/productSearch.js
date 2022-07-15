// components/productSearch.js
import { useState, useEffect } from 'react';
import { server } from '../config/config.js';
import { ProxyGeneration, Generation } from  '../utils/dataStructures';
import EventForm from '../components/dataforms/eventForm.js';
import ResultAccordion from '../components/resultAccordion.js';
import { sha256 } from 'js-sha256';

// record for user details constructor(username, organization, orgid, website, phone, email, line1, line2, city, state, postalcode, country)

export default function ProductSearch({result}) {

  console.log("Result")
  console.log(result)

  return (
    <>
      <div className="py-4">
        <ResultAccordion resultStruct={ result } />
      </div>
    </>
    )
}
