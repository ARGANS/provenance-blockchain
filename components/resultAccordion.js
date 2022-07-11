/* ./components/resultAccording.js */
import { useSession } from "next-auth/react"
import EventForm from '../components/dataforms/eventForm.js';

function ResultAccordion ({ resultStruct }) {
  console.log("Rendering results");
  const { data , status } = useSession()

  function readableTime(unixtime) {
    const newDate = new Date();
    newDate.setTime(unixtime*1000);
    const dateString = newDate.toUTCString();
    return dateString
  }

  return (
    <div>
      <div>
        <div className="py-4">
          The following registrations were retrieved for this file:
        </div>
        <div>
          {
            resultStruct.map((element, idx) => { 
              return (
                <div className={"bg-" + element.data.json["color"] + "-200 w-full border border-gray-200 divide-y divide-gray-200 p-2"} key={ "item-" + idx.toString }>
                  <details>
                    <summary>{ element.data.json["Type"] + " (at " +  readableTime(element["blocktime"]) + ")" } </summary>
                    <EventForm event={element.data.json} readonly={true} submit={false} />
                  </details>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default ResultAccordion;
