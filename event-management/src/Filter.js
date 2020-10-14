import React from "react";
import CheckboxGroup from 'react-checkbox-group'

const Filter = ({searchValue,setSearchValue,isFreeFilter,setIsFreeFilter,showTime,setTimeFilter,searchCity,setSearchCity}) => {
  
//Update filter values
  const updateSearchValue = (val, key) => {
    switch (key) {
      case 'NAME':
        setSearchValue(val);
        break;
      case 'CITY' : 
        setSearchCity(val);
        break;
      case 'IS_FREE':
        setIsFreeFilter(val);
        break;
      case 'TIME':
        setTimeFilter(val);
        break;
     
      default:
        setSearchValue("");
        setSearchCity("");
        setIsFreeFilter(false);
        setTimeFilter([]);
     }
  };

  return (
    <div className="filter-container">
        <div>
            <input id="searchByName"
              type="text" value={searchValue.NAME}
              onChange={(e) => updateSearchValue(e.target.value,'NAME')}
              placeholder = "Name"
            ></input>

            <input id="searchByCity"
              type="text" value={searchValue.CITY}
              onChange={(e) => updateSearchValue(e.target.value,'CITY')}
              placeholder = "City"
            ></input>
        </div>

        <div className = "isFree-div">
            <input id="isFreeCheckBox" onChange={e=>updateSearchValue(e.target.checked,'IS_FREE')} type="checkbox" checked={isFreeFilter} /> 
            <div className="display-inline"><label htmlFor="show-isFreeCheckBox">Only</label><button className="is-free-btn">Free</button></div>
        </div>
        
        <CheckboxGroup name="showTime" value={showTime} onChange={e=>
            updateSearchValue(e,'TIME')}>
            {(Checkbox) => (
            <div className="checkbox-cls">
              <label>
                  <Checkbox value="6-12" />
                  Morning
              </label>
              <label>
                  <Checkbox value="13-17" />
                  Afternoon
              </label>
              <label>
                  <Checkbox value="17-21" />
                  Evening
              </label>    
              <label>
                  <Checkbox value="21-6" />
                  Night
              </label>
            </div>
            )}
        </CheckboxGroup>
      </div>
    );
};

export default Filter;