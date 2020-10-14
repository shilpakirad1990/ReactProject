import React, {useState,useEffect,useCallback} from 'react';
import EventList from './EventList'
import Filter from './Filter';
import 'react-tabs/style/react-tabs.css';
import './App.css';

const App = () => {
  
  const [eventsData, setEventsData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [filterEvents, setFilterEvents] = useState([]);
  const [searchTextFilter, setTextSearchFilter] = useState('');
  const [searchCityFilter, setCitySearchFilter] = useState('');
  const [isFreeFilter, setIsFreeFilter] = useState(false);
  const [showTimeFilter, setShowTimeFilter] = useState([]);
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
    const searchNameRegex = searchTextFilter && new RegExp(`${searchTextFilter.toLowerCase()}`, "gi");
    const searchCityRegex = searchCityFilter && new RegExp(`${searchCityFilter.toUpperCase()}`, "gi");
    const result = eventsData.filter(
      event =>
      ((!searchNameRegex || searchNameRegex.test(event.name) )&&
      (!searchCityRegex || searchCityRegex.test(getCityName(event.city))) &&
      (!isFreeFilter || event.isFree === isFreeFilter) &&
      (!((showTimeFilter.length)) || filterByShowTime(showTimeFilter, event))
    ));
    setFilterEvents(result);
  }, [eventsData,searchTextFilter,searchCityFilter, isFreeFilter, JSON.stringify(showTimeFilter),getCityName]);// eslint-disable-line react-hooks/exhaustive-deps

  
  //search records by Show time
  const filterByShowTime = (time, rec) => {
    let startTimeArr = [];
    let endTimeArr = [];
    time.forEach(x => {
      startTimeArr.push(x.split("-")[0]);
      endTimeArr.push(x.split("-")[1]);
    })
    let startTime = Math.min(...startTimeArr);
    let endTime = (endTimeArr.includes("6")) ? "6" : Math.max(...endTimeArr);
    
    let start = new Date(rec.startDate).getUTCHours();
    let end = new Date(rec.endDate).getUTCHours();
    if (startTime === '21' || endTime === '6') {
      return ((start >= startTime && end <= 24) || (start > 0 && end < 6))
    } else {
      return (start >= startTime && end <= endTime)
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
       <a href="http://seekvectorlogo.com/trivago-vector-logo-svg/"><img className = "img-logo" alt="logo" src="http://seekvectorlogo.com/wp-content/uploads/2018/09/trivago-vector-logo.png" /></a>
       
       <div className = "header-links">
          <button className= "header-link" onClick={e=>selectTab(0)}>All events</button>
          <button className= "header-link" onClick={e=>selectTab(1)}>My Events</button>
          <button className= "header-link">About</button>
       </div>

    </div>

    <div className= "all-events-view">
       {(selectedTab === 0) ?
       <>
        <div className="column left" >
            <Filter
              searchValue={searchTextFilter}
              setSearchValue={setTextSearchFilter}
              isFreeFilter = {isFreeFilter}
              setIsFreeFilter = {setIsFreeFilter}
              showTime = {showTimeFilter}
              setTimeFilter = {setShowTimeFilter}
              searchCity = {searchCityFilter}
              setSearchCity = {setCitySearchFilter}>
            </Filter>
        </div>
       
        <div className="column right" >
            {(filterEvents.length > 0) ? (
            <EventList 
              events={filterEvents} 
              cityName={getCityName} 
              signUp={signUpAction} 
              selectedTab={selectedTab}>
            </EventList>
            ) : (
              <div className="no-data-cls">No Events Found</div>
            )}
        </div>

       </>
       :
       <div className="my-events-container">
          {(myEvents.length > 0 && selectedTab === 1)? (
            <EventList 
              events={myEvents} 
              cityName = {getCityName} 
              signUp={signUpAction} 
              selectedTab={selectedTab}>
            </EventList>
          ) : (
            <div className="no-data-cls">No Signup Events Found</div>
          )}
       </div>
       }
    </div>
 </div>
  
  )
}

export default App;