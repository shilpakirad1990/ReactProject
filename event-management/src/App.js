import React , {useState, useEffect} from 'react';
import EventList from './EventList'
import Filter from './Filter';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';

const App = () => {

 const [eventsData , setEventsData] = useState([]); 
 const [citiesData , setCitiesData] = useState([]);
 const [filterEvents, setFilterEvents] = useState([]);
 const [searchTextFilter, setTextSearchFilter] = useState("");
 const [isFreeFilter, setIsFreeFilter] = useState(false);
 const [showTimeFilter, setShowTimeFilter] = useState(0);
 const [signupEvents , setSignupEvents] = useState([]);
 const [myEvents,setMyEvents] = useState([]);
 const [selectedTab , setSelectedTab] = useState(0);
  

 useEffect(() => {
  (async function (){
    fetch('http://localhost:5555/events')
    .then(response => response.json())
    .then(data => 
        setEventsData(data)
        ).catch((error) => {
          console.log(error);
      });;
 })()

  }, []);

  useEffect(() => {
    (async function (){
      fetch('http://localhost:4444/cities')
      .then(response => response.json())
      .then(data => 
          setCitiesData(data)
          ).catch((error) => {
            console.log(error);
        });;
   })()
  
    }, []);

 useEffect(() => {
   /* let results = eventsData.filter(x=>{
      return (x.name.includes(searchTextFilter))
    })*/

    const searchRegex = searchTextFilter && new RegExp(`${searchTextFilter}`, "gi");
    

    const result = eventsData.filter(
      event =>
        (!searchRegex || searchRegex.test(event.name)) &&
        (!isFreeFilter || event.isFree == isFreeFilter) &&
        (!(parseInt(showTimeFilter)) || filterByShowTime(showTimeFilter,event))
    );

    setFilterEvents(result);
    
  }, [eventsData,searchTextFilter,isFreeFilter,showTimeFilter]);

  const filterByShowTime = (time, rec) =>{
    let timeVal = (time == "1") ? '6-12' :(time == "2") ? '12-17' : (time == "3") ? '17-21' : '21-6';
    let start = new Date(rec.startDate).getUTCHours();
                    let end = new Date(rec.endDate).getUTCHours();
                    if(timeVal === '21-6'){
                      return ((start >= timeVal.split("-")[0] && end <= timeVal.split("-")[1]) || (start < 6 && end > 0))
                    }else{
                    return (start >= timeVal.split("-")[0] && end <= timeVal.split("-")[1])
                    } 
  }

  useEffect(() => {
    let results = eventsData.filter(x=>{
      return (signupEvents.includes(x.id))
    })
    setMyEvents(results);
    
  }, [eventsData,signupEvents]);


 const selectTab = (index)=>{
   setSelectedTab(index);
  }

  const signUpAction = (id) =>{
    signupEvents.push(id);
    setSignupEvents(signupEvents);
    setMyEvents(eventsData.filter(x=>{
      return signupEvents.includes(x.id)
    }))
  }


return(
  
  <div>
   <div class="header-container">
    <h2>Trivago Event Management</h2>
   </div>
    <Tabs onSelect={event => selectTab(event)}>
        <TabList class="tab-container">
          <Tab class="tab">Events View</Tab>
          <Tab class="tab">My Events </Tab>
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
        <EventList events={filterEvents} cities = {citiesData} signupEventsArr={signupEvents} setSignupEventsArr={setSignupEvents} signUp={signUpAction}></EventList>
      ) : (
        <span>No events main</span>
      )}
        </TabPanel>
        
        <TabPanel>
        {(myEvents.length > 0 && selectedTab != 0)? (
        <EventList events={myEvents} cities = {citiesData} signupEventsArr={signupEvents} setSignupEventsArr={setSignupEvents} signUp={signUpAction}></EventList>
      ) : (
        <span>No events</span>
      )}
        </TabPanel>
      </Tabs>
      
    </div>



  
)

}

export default App;
