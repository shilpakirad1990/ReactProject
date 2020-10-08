import React from 'react';

const FilterPage = (props)=>{
    return(
        <div>
            <h3>Filter By :</h3>
            <input type="text" onChange={event=> {props.updateSearchVal(event.target.value,'TEXT')}}></input>
            IsFree<input onClick={e=> {props.updateSearchVal(e.target.checked,'IS_FREE')}} type="checkbox" value="true" />
            <select 
        value="" 
        onChange={event=> {props.updateSearchVal(event.target.value,'TIME')}}
      >
       <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
        <option value="night">Night</option>
      </select>
      <button onClick={props.applyFilter}>Apply</button>
        </div>
    )
}

export default FilterPage;