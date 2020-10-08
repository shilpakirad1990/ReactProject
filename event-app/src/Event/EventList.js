import React from 'react';

const EventList = (props) => {
    const columns = props.eventsData[0] && Object.keys(props.eventsData[0]);
    

   const getCityName = (id)=>{
       
       let rec = props.citiesData.filter(x=> x.id == id);
       if(rec && rec[0] && rec[0].name){
           return rec[0].name
        }
    }

    const checkIsFree = (isFree)=>{
        console.log(isFree);
        return  isFree === true ? 'Yes' : 'No'
    }

    return (
      /*  <table cellPadding={0} cellSpacing={0}>
            <thead>
            <tr>
                columns.map(x=>
                  <th>{x.name}</th>
                )
                </tr>
            </thead>
            <tbody>
                {props.eventsData.map(row=>
                <tr>
                   columns.map(col=>{
                       <td>{row[col]}</td>
                   })
                </tr>
                
                )}
            </tbody>
        </table>*/
       
        
        props.eventsData.map(x=>
            <div className="event" key={x.id}>
            <li> Event Name :{x.name} </li>
            <li> City name : {getCityName(x.city)} </li>
            <li> isFree : {checkIsFree(x.isFree)} </li>
            <li> Start Date : {x.startDate} </li>
            <li> End Date : {x.endDate} </li>
            </div>
        )
     
    )
}

export default EventList;