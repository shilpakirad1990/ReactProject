import React from "react";

       
const Filter = ({ searchValue, setSearchValue , isFreeFilter, setIsFreeFilter , showTime, setTimeFilter}) => {
  const updateSearchValue = (val,key) => {
    switch(key){
        case 'TEXT' : 
        setSearchValue(val);
        break;
        
        case 'IS_FREE' :
        setIsFreeFilter(val);
        break;

        case 'TIME' :
        setTimeFilter(val);
        break;

        case 'RESET' :
            setSearchValue(" ");
            setIsFreeFilter(false);
            setTimeFilter(0);

     }
    
  };


  return (
    
    <div class="filter-container">
      <div>
        <label>Search Events by :</label>
      </div>
      <label for="show-searchTextArea">Event/City Name:</label>  
      <input id="searchTextArea"
        type="text" value={searchValue}
        onChange={(e) => updateSearchValue(e.target.value,'TEXT')}
      ></input>

       <label for="show-isFreeCheckBox">IsFree:</label>
       <input id="isFreeCheckBox" onClick={e=>updateSearchValue(e.target.checked,'IS_FREE')} type="checkbox" checked={isFreeFilter} />
       
       <label for="show-time">Choose Show Time:</label>
        <select id="show-time" value={showTime}
           onChange={e=>updateSearchValue(e.target.value,'TIME')} >
        <option value="0">All</option>
        <option value="1">Morning</option>
        <option value="2">Afternoon</option>
        <option value="3">Evening</option>
        <option value="4">Night</option>
      </select>
      <button onClick={(e)=>updateSearchValue(null,'RESET')}>Clear</button>
    </div>
  );
};

export default Filter;
