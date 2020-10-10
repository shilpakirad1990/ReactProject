import React,{useState , useEffect , useCallback} from 'react';
import EventList from './EventList';


const EventPage = ({query}) =>{
    const [isFetching, setFetching] = useState(false);
    const [eventsData, setEventsData] = useState([]);
    const [cities , setCities] = useState([]);
   // const [searchKey , setSearchKey] = useState(query);
    const [filteredData, setFilteredData] = useState([]);
    const queryString = JSON.stringify(query);
    const [signUpArr , setSignUpArr] = useState([]);
    const [myEvents, setMyEvents] = useState([]);

    const signUp = (id)=> {
        alert(signUpArr);
        setSignUpArr([...signUpArr,id]);
    }
    
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

        
       useEffect(() => {
         setMyEvents(
           eventsData.filter(x=>{
             return signUpArr.includes(x.id)
           })
         )

       }, [signUpArr])


       useEffect(()=>{
            const columns = eventsData[0] && Object.keys(eventsData[0]);
           

           // setFetching(true);
           setFilteredData(
                /*eventsData.filter(x=>{
                    return columns.some(y=>{
                      return (x[y].toString().toLowerCase().indexOf(query['TEXT']) > -1 )
                    })
                  })*/

                  eventsData.filter((x) => {
                    return columns.some((y) => {
                      return x[y].toString().toLowerCase().indexOf(query.TEXT) > -1;
                    });
                  }).filter(rec=>{
                     if(query.IS_FREE){
                        if(rec.isFree == true){
                          return rec
                        }else{
                          return ''
                        }
                     }else{
                       return rec
                     }
                     //return rec
                  }).filter(rec=>{
                    if(query.TIME.length > 0){
                    let start = new Date(rec.startDate).getUTCHours();
                    let end = new Date(rec.endDate).getUTCHours();
                    if(query.TIME === '21-6'){
                      return ((start >= query.TIME.split("-")[0] && end <= query.TIME.split("-")[1]) || (start < 6 && end > 0))
                    }else{
                    return (start >= query.TIME.split("-")[0] && end <= query.TIME.split("-")[1])
                    }  
                  } 
                    else return rec 
                  })
            )
        
           // setFetching(false);
        },[query,eventsData]
        )

       

        
        

    

    
    
        
        return(
        <div>
        
        {filteredData.length > 0 ? 
        <EventList eventsData = {filteredData} citiesData = {cities} signUp={signUp}></EventList>
        :null
        }
        </div>
        )
  

    
}

export default EventPage;

