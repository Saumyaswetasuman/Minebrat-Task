import React,{useState, useEffect} from 'react'
import City from './City';

const State = () => {
    const [states,setStates] = useState(null);
    const [stateName,setStateName] = useState("")
    const [stateId,setStateId] = useState(null)
    const [displayPage,setDisplayPage]= useState(false)
    useEffect(()=>{
        const fetchStates = async ()=>{
            const response  =  await fetch("http://api.minebrat.com/api/v1/states");
            const outData = await response.json()
            console.log(outData)
            setStates(outData)
        }
        fetchStates()
    },[])
    const handleChange = (e)=>{
        e.preventDefault()
        console.log(e.target.value)
        setStateName(e.target.value)
        if(states){
            let temp = states.filter((item)=>{
                return item.stateName === e.target.value
            })
            console.log(temp[0].stateId)
            setStateId(temp[0].stateId)
            setDisplayPage(true)
        }

    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(states){
            let temp = states.filter((item)=>{
                return item.stateName === stateName
            })
            console.log(temp[0].stateId)
            setStateId(temp[0].stateId)
            setDisplayPage(true)
        }

    }
  return (
    <div>
      <form>
        <select onChange={handleChange}>
            {states && states.map((state)=>{
                return(
                    <option key={state.stateName}>{state.stateName}</option>
                )
            })}
        </select>
        {/* <button onClick={handleSubmit}>Submit</button> */}
      </form>
      <div>
       
{displayPage &&  <City stateName={stateName} stateId={stateId}/> }
      </div>
    </div>
  )
}

export default State
