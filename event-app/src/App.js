import React, {useState} from 'react';
import './App.css';
import EventPage from './Event/EventPage';
import FilterPage from './Filter/FilterPage';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const initialFilter = {
  TIME:'',
  IS_FREE : '',
  TEXT : ''
}

function App() {
  const [searchKey,setSearchKey] = useState(initialFilter);

  const updateSearchVal = (val,type)=>{
    console.log(searchKey);
    
    searchKey[type] = val;
    setSearchKey(searchKey);
    console.log(searchKey);
  }

  const selectTab = (index)=>{
    console.log(index);
    //alert(index);
  }

  return (
    <div>
    <Tabs onSelect={event => selectTab(event)}>
        <TabList>
          <Tab >Events View</Tab>
          <Tab >My Events </Tab>
        </TabList>
        <TabPanel>
            <FilterPage updateSearchVal = {updateSearchVal}></FilterPage>
           <EventPage query={searchKey}></EventPage>
        </TabPanel>
        
        <TabPanel>XYZ</TabPanel>
      </Tabs>
      
    </div>
  );
}

export default App;
