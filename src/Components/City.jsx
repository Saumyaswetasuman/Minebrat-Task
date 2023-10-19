import React,{useState,useEffect} from 'react'
import ResultPage from './ResultPage'

const City = ({stateId, stateName}) => {
    const [cities,setCities] = useState(null)
    const [cityName,setCityName]=useState("")
    const [displayPage,setDisplayPage]= useState(false)

    useEffect(()=>{
        const fetchCitiesList = async ()=>{
            const response =  await fetch( `http://api.minebrat.com/api/v1/states/cities/${stateId}`);
            const dataOutput = await response.json()
            console.log(dataOutput)
            setCities(dataOutput)
    }
    fetchCitiesList()
    },[])
    const handleChange = (e)=>{
        console.log(e.target.value)
        setCityName(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(cities){
            setDisplayPage(true)
        }
    }
  return (
    <div>
      <form>
        <select  onChange={handleChange}>
            {cities && cities.map((city)=>{
                return(
                    <option key={city.cityName}>{city.cityName}</option>
                )
            })}
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <div>
        {displayPage && <ResultPage stateName={stateName} cityName={cityName}/>}
      </div>
    </div>
  )
}

export default City
