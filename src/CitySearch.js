import React, {useState} from 'react';
import './App.js'

// we passed the getAirQualityIndex function from App.js as a prop
// So this function CitySearch can call getAirQualityIndex even though its not in the same file
const CitySearch = ({getAirQualityIndex}) =>{

    // capture what user is typing and holding it in state
    const [inputValue, setInputValue] = useState('')

    // pass in event (something that happens/interaction), user changes input box by typing or backspacing
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    // once they finish typing and submit, we want to send input value held in inputValue state to the API to fetch so need to move it to App.js
    const handleSearch = (e) =>{
        // prevents default behavour in this case prevent refresh
        e.preventDefault()
        const formattedCity = inputValue.replace(/ /g, '-')
        getAirQualityIndex(formattedCity)
    }

    return(
        <form onSubmit={handleSearch} className='mb-4'>
            <input type='text' placeholder='Enter City' onChange={handleInputChange} className='form-control'></input>
            <button type='submit' className='btn btn-primary mt-3'>Search</button>
        </form>
    )
}

export default CitySearch;