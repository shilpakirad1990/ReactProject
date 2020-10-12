import React from "react";

const Filter = ({searchValue,setSearchValue,isFreeFilter,setIsFreeFilter,showTime,setTimeFilter}) => {
  
  //Update filter values
  const updateSearchValue = (val, key) => {
    switch (key) {
      case 'TEXT':
        setSearchValue(val);
        break;
      case 'IS_FREE':
        setIsFreeFilter(val);
        break;
      case 'TIME':
        setTimeFilter(val);
        break;
      case 'RESET':
      default:
        setSearchValue(" ");
        setIsFreeFilter(false);
        setTimeFilter(0);
     }
  };

  return (
      <div className="filter-container">
        <div>
          <label>Search Events by :</label>
        </div>

        <label htmlFor="show-search-TextArea">Event/City Name:</label>  
        <input id="show-search-TextArea"
          type="text" value={searchValue}
          onChange={(e) => updateSearchValue(e.target.value,'TEXT')}
        ></input>

        <label htmlFor="show-isFreeCheckBox">IsFree:</label>
        <input id="isFreeCheckBox" onChange={e=>updateSearchValue(e.target.checked,'IS_FREE')} type="checkbox" checked={isFreeFilter} />
        
        <label htmlFor="show-time">Choose Show Time:</label>
        <select id="show-time" value={showTime} onChange={e=> updateSearchValue(e.target.value,'TIME')} >
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