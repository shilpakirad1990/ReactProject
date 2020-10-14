import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import map  from './icons/map.jpg';
import clock from './icons/clock.png';

const EventList = ({events,cityName,signUp,selectedTab})=>{
   
    //Confirmation popup
    const submit = (id) => {
        confirmAlert({
          title: (selectedTab) ? 'Cancel SignUp' :'SignUp',
          message: 'Please confirm',
          buttons: [
            {
              label: 'Ok',
              onClick: () => {
                signUp(id,selectedTab)
              }
            },
            {
              label: 'Cancel',
              onClick: () => {}
            }
          ]
        });
      };

    //format json in order to find same day events
    const formatEventsJson = (events) =>{
        const results = events.reduce((eventsList,item) => {
            let date = new Date(item.startDate).toDateString();
            if (!eventsList[date]) eventsList[date] = [];
            eventsList[date].push(item);
            return eventsList;
          }, {});
        return results;
    }

    //function to display event from-to time
    const displayEventTime = (start, end)=>{
        let fromVal = getHoursMinutesValue(start);
        let toVal = getHoursMinutesValue(end);
        return (
            <div className ="display-inline"> 
                <img src={clock} alt="city"></img>
                from {fromVal} to {toVal}
            </div>  )
    }

    //date formatting
    const getHoursMinutesValue = (date)=>{
        let dateVal = new Date(date);
        let hoursVal = dateVal.getUTCHours();
        let minutesVal = dateVal.getUTCMinutes();
        let ampm = hoursVal >= 12 ? 'PM' : 'AM';
        let hours = hoursVal % 12;
        hours = hours? hours : 12;
        let minutes = minutesVal < 10 ? '0'+minutesVal : minutesVal;
        return (`${hours}.${minutes} ${ampm}`)
    }

    const formatEventDate = (d)=>{
        let dateArr = d.split(" ");
        const daysNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = monthsNames.find(mon=> mon.includes(dateArr[1]));
        let day = daysNames.find(day=> day.includes(dateArr[0]));
        let suffix = getDateSuffix(dateArr[2]);
        return `${day}, ${dateArr[2]}${suffix} ${month}`

    }

     const getDateSuffix = (d) =>{
        if (d > 3 && d < 21) return 'th';
            switch (d % 10) {
              case 1:  return "st";
              case 2:  return "nd";
              case 3:  return "rd";
              default: return "th";
        }
     }

    //create event container
    const generateEventRows = ()=>{
       let results = formatEventsJson(events);
       let keysArr = Object.keys(results);
       let data = keysArr.map(dateItem=>{
            return(
                <div key={dateItem} className="content-table">
                    <div className="date-cls">
                        {formatEventDate(dateItem)}
                    </div>
                   
                    {results[dateItem].map(item=>{
                    return(
                        <div key={item.id} className = "event-container">
                            
                            <div className = "row1-cls">
                                {(item.isFree) ? 
                                (<><button className="is-free-btn">Free</button>
                                <span className="name-with-free-cls">{item.name}</span></>)
                                :
                                <span className="name-cls">{item.name}</span>
                                }
                                
                                {(!selectedTab)?
                                <button className="signup-btn" onClick={e=>submit(item.id)}>SignUp</button>:
                                <button className="signup-btn" onClick={e=>submit(item.id)}>Cancel Signup</button>
                                }
                            </div>
                            
                            <div className="row1-cls">
                                <img className="float-left" src={map} alt="city"></img>
                                <label className="float-left">{cityName(item.city)}</label>
                                <label className = "float-right">{displayEventTime(item.startDate,item.endDate)}</label>
                           </div>

                        </div>
                    )
                    })}
                </div>
            )
        })
        return data;
    }

    return(
    <div>
        {generateEventRows()}
    </div>
    )
}

export default EventList;