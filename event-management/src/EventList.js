import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


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

    //create table headers  
    const generateHeaders = () =>{
        if(events.length){
        var cols = Object.keys(events[0]); 
        let columns = cols.map(function(colData) {
            let val = colData.toUpperCase();
            return <th key={colData}>{val}</th>;
        });
        swapNameField(columns, 2,1);
        columns.push(<th key="action">ACTION</th>);
        return columns;
        }
    };

    //create table rows 
    const generateRows = ()=>{ 
        if(events.length){
        let cols = Object.keys(events[0]);
        let data = events;
    
        return data.map(function(item,index) {
                var cells = cols.map(function(colData) {
                let value = item[colData];
                let displayValue = formatGridDisplayValue(colData,value);
                let key = `${index}+${colData}`;
                return <td key={key}>{displayValue}</td>
            });
            swapNameField(cells, 2,1);
            let actionIndex = cols.length+1;
            if(selectedTab){
                cells.push(
                    <td key={`${actionIndex}+"-"cancel-action`}>
                       <button className="btn-cls" onClick={e=>submit(item.id)}>Cancel SignUp</button>
                    </td>
                )
            }else{
                cells.push(
                <td key={`${actionIndex}+"-"signup-action`}>
                   <button className="btn-cls" onClick={e=>submit(item.id)}>Sign Up</button>
                </td>
                )
            }
            return <tr key={index}>{cells}</tr>;
        });
        }
    }

    //format display values 
    const formatGridDisplayValue = (header, value)=>{
        switch(header) {
            case 'id' : 
                value++
                break;
            case 'startDate' :
            case 'endDate' :
                value = formatDate(value);
                break;
            case 'city' :
                value =  cityName(value);
                break;
            case 'isFree' :
                value = (value === true) ? 'Yes' : 'No' ;
                break;
            default :
                break;
        }
        return value
    }

    //function for date formatting
    const formatDate = (dateVal) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];;
        let date = new Date(dateVal);
        let hours = date.getUTCHours();
        let minutes = date.getUTCHours();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let timeVal = hours + ':' + minutes + ' ' + ampm;
        return  date.getDate() + ' ' +months[date.getMonth()] + ' ' + date.getFullYear() + '  @' +timeVal;
    }

    //Interchange position of name and isfree columns
    const swapNameField = (arr,fromIndex,toIndex) =>{
        let element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }
    
    return(
    <div className="content-table">
     <table>
        <thead><tr>{generateHeaders()}</tr></thead>
        <tbody>{generateRows()}</tbody>
     </table>
     </div>
    )
}

export default EventList;