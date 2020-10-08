import React,{useState , useEffect , useCallback} from 'react';
import EventList from './EventList';

const EventPage = ({query}) =>{
    const [isFetching, setFetching] = useState(false);
    const [eventsData, setEventsData] = useState([]);
    const [cities , setCities] = useState([]);
   // const [searchKey , setSearchKey] = useState(query);
    const [filteredData, setFilteredData] = useState([]);
    
    useEffect(
        function(){
            setFetching(true);
            
            (async function (){
                fetch('http://localhost:3000/events')
                .then(response => response.json())
                .then(data => 
                    setEventsData(data)
                    );
             })()


            setFetching(false);
        },[] )

        useEffect(
            function(){
                setFetching(true);
                
                (async function (){
                    fetch('http://localhost:8888/cities')
                    .then(response => response.json())
                    .then(data => 
                        setCities(data)
                        );
                 })()
    
    
                setFetching(false);
            },[] )

        

       useEffect(()=>{
            const columns = eventsData[0] && Object.keys(eventsData[0]);

           // setFetching(true);
           setFilteredData(
                eventsData.filter(x=>{
                    return columns.some(y=>{
                      return (x[y].toString().toLowerCase().indexOf(query['TEXT']) > -1 )
                    })
                  })
            )
        
           // setFetching(false);
        },[query,eventsData]
        )

        
        

    

    if(isFetching){
        return <div>fetching....</div>
    }
    
        
        return(
        <div>
        <EventList eventsData = {filteredData} citiesData = {cities}></EventList>
        </div>
        )
  

    
}

export default EventPage;

