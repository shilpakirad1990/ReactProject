import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import EventList from './EventList'
import Filter from './Filter';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';

const App = () => {
  
  const [eventsData, setEventsData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [filterEvents, setFilterEvents] = useState([]);
  const [searchTextFilter, setTextSearchFilter] = useState("");
  const [isFreeFilter, setIsFreeFilter] = useState(false);
  const [showTimeFilter, setShowTimeFilter] = useState(0);
  const [signupEvents, setSignupEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  //fetch events
  useEffect(() => {
    (async function () {
      fetch('http://localhost:5555/events')
        .then(response => response.json())
        .then(data =>
          setEventsData(data)
        ).catch((error) => {
          console.log(error);
        });;
    })()

  }, []);

  //fetch cities
  useEffect(() => {
    (async function () {
      fetch('http://localhost:4444/cities')
        .then(response => response.json())
        .then(data =>
          setCitiesData(data)
        ).catch((error) => {
          console.log(error);
        });;
    })()

  }, []);

  //retrieve city name 
  const getCityName = useCallback((id) => {
    let rec = citiesData.filter(x => x.id === parseInt(id));
    if (rec && rec[0] && rec[0].name) {
      return rec[0].name
    }
  }, [citiesData])

  //Search records by applied filters
  useEffect(() => {
    const searchRegex = searchTextFilter && new RegExp(`${searchTextFilter.toLowerCase()}`, "gi");
    const result = eventsData.filter(
      event =>
      (!searchRegex || searchRegex.test(event.name) || searchRegex.test(getCityName(event.city))) &&
      (!isFreeFilter || event.isFree === isFreeFilter) &&
      (!(parseInt(showTimeFilter)) || filterByShowTime(showTimeFilter, event))
    );
    setFilterEvents(result);
  }, [eventsData,searchTextFilter, isFreeFilter, showTimeFilter,getCityName]);

  
  //search records by Show time
  const filterByShowTime = (time, rec) => {
    let timeVal = (time === "1") ? '6-12' : (time === "2") ? '12-17' : (time === "3") ? '17-21' : '21-6';
    let start = new Date(rec.startDate).getUTCHours();
    let end = new Date(rec.endDate).getUTCHours();
    if (timeVal === '21-6') {
      return ((start >= timeVal.split("-")[0] && end <= timeVal.split("-")[1]) || (start < 6 && end > 0))
    } else {
      return (start >= timeVal.split("-")[0] && end <= timeVal.split("-")[1])
    }
  }

 //set selected tab to check active tab
  const selectTab = (index) => {
    setSelectedTab(index);
  }

  //Function for signUp / cancel signUp
  const signUpAction = (id, removeSignUP) => {
    if (!removeSignUP && !signupEvents.includes(id)) {
      signupEvents.push(id);
    } else {
      const index = signupEvents.indexOf(id);
      if (index > -1) {
        signupEvents.splice(index, 1);
      }
    }
    setSignupEvents(signupEvents);
    setMyEvents(eventsData.filter(x => {
      return signupEvents.includes(x.id)
    }))
  }


  return (
  <div>
   <div className="header-container">
      <h2>Trivago Event Management</h2>
   </div>
   <Tabs onSelect={event =>
      selectTab(event)}>
      <TabList>
         <Tab> Events List </Tab>
         <Tab> My Events </Tab>
      </TabList>
      <TabPanel>
         <Filter
            searchValue={searchTextFilter}
            setSearchValue={setTextSearchFilter}
            isFreeFilter = {isFreeFilter}
            setIsFreeFilter = {setIsFreeFilter}
            showTime = {showTimeFilter}
            setTimeFilter = {setShowTimeFilter}
            ></Filter>
         <h1>Ganpti bappa morya</h1>
         
         {(filterEvents.length > 0) ? (
         
         <EventList 
            events={filterEvents} 
            cityName={getCityName} 
            signUp={signUpAction} 
            selectedTab={selectedTab}>
          </EventList>
         ) : (
         <h3>No Events Found</h3>
         )}
      </TabPanel>
      <TabPanel>
         {(myEvents.length > 0 && selectedTab !== 0)? (

         <EventList 
            events={myEvents} 
            cityName = {getCityName} 
            signUp={signUpAction} 
            selectedTab={selectedTab}>
          </EventList>
         ) : (
         <h3>No Signup Events Found</h3>
         )}
      </TabPanel>
   </Tabs>
</div>
)
}

export default App;