import React, {useState, useEffect} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const EventList = ({events,cities , signupEventsArr ,setSignupEventsArr, signUp , selectedTab})=>{
    
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

    const updateSignupArr = (id)=>{
        console.log(id);
        signupEventsArr.push(id);
        setSignupEventsArr(signupEventsArr);
    }

    const generateHeaders = () =>{
        if(events.length){
        var cols = Object.keys(events[0]); 
        let columns = cols.map(function(colData) {
            let val = colData.toUpperCase();
            return <th key={colData}>{val}</th>;
        });
        swapNameField(columns, 2,1);
        columns.push(<th>ACTION</th>);
        return columns;
    }
    };

    const getCityName = (id)=>{
        let rec = cities.filter(x=> x.id == id);
        if(rec && rec[0] && rec[0].name){
           return rec[0].name
        }
    }

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

    const swapNameField = (arr,fromIndex,toIndex) =>{
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }
    
    const generateRows = ()=>{ 
        if(events.length){
        var cols = Object.keys(events[0]); // [{key, label}]
        var data = events;
    
        return data.map(function(item,index) {
            var cells = cols.map(function(colData) {
                let value = item[colData];
                if(colData == 'id'){
                    value++
                }
                if(colData == 'startDate' || colData == 'endDate'){
                    value = formatDate(value);
                }
                if(colData == 'city'){
                    value =  getCityName(value)
                }
                if(colData == 'isFree'){
                    value = (value == true) ? 'Yes' : 'No' 
                }
                return <td>{value}</td>
            });
            swapNameField(cells, 2,1);
            if(selectedTab){
                cells.push(
                    <td>
                       <button class="btn-cls" onClick={e=>submit(item.id)}>Cancel SignUp</button>
                    </td>
                )
            }else{
            cells.push(
                <td>
                   <button class="btn-cls" onClick={e=>submit(item.id)}>Sign Up</button>
                </td>
            )
            }
           // cells.push( <td><button onClick={()=>updateSignupArr(item.id)} >SingUp</button></td>);
            return <tr key={index}>{cells}</tr>;
        });
    }
    }

    return(
        <div class="content-table">
     <table>
        <thead><tr>{generateHeaders()}</tr></thead>
        <tbody>{generateRows()}</tbody>
     </table>
     </div>
    )
}

export default EventList;