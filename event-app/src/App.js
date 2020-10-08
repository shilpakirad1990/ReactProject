import React, {useState} from 'react';
import './App.css';
import EventPage from './Event/EventPage';
import FilterPage from './Filter/FilterPage';

function App() {
  const initialFilter = {
    TIME:[],
    IS_FREE : [],
    TEXT : []
  }
  const [searchKey,setSearchKey] = useState(initialFilter);

  const updateSearchVal = (val,type)=>{
    console.log(searchKey);
    
    searchKey[type] = val;
    setSearchKey(searchKey);
    console.log(searchKey);
  }

  return (
    <div>
      <FilterPage updateSearchVal = {updateSearchVal}></FilterPage>
      <EventPage query={searchKey}></EventPage>
    </div>
  );
}

export default App;
