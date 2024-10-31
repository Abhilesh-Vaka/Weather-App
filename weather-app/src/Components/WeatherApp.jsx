import sunny from '../assets/images/sunny.png'
import cloudy from '../assets/images/cloudy.png'
import snowy from '../assets/images/snowy.png'
import rainy from '../assets/images/rainy.png'
import smokey from '../assets/images/smokey.png'
import searchs from '../assets/images/search.png'
import windy from '../assets/images/cloud-wind-icon.svg'
import humid from '../assets/images/humid.svg'
import { useState , useEffect } from 'react'


const WeatherApp = () => {
    const [data,setData]=useState({})
    const [location,setLocation]=useState('')
    const api_key ='5d5c723c20383ca82bb556870705f75b'

    useEffect(()=>{
        const fetchDefaultWeather = async () =>{
            const defaultLocation = 'Hyderabad'
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}
            &units=Metric&appid=${api_key}`
            const res=await fetch(url)
            const defaultData = await res.json()
            setData(defaultData)
        }
    
        fetchDefaultWeather()
    },[])

    const InputChange=(e)=>{
        setLocation(e.target.value)
    }

    const search = async()=>{
        if(location.trim() !==""){
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`
            const res=await fetch(url)
            const searchData =await res.json()
            if(searchData.cod !==200){
                setData({notFound:true})
            }else{
                setData(searchData)
                setLocation('')
            }
        }
        
    }

    const KeyDown =(e)=>{
        if(e.key ==='Enter'){
            search()
        }
    }

    const weatherImgs ={
        Clear: sunny,
        Clouds: cloudy,
        Rain: rainy,
        Snow: snowy,
        Haze: cloudy,
        Mist: cloudy,
        Smoke: smokey,
        Fog: cloudy,
    }     

    const weatherImg = data.weather ? weatherImgs[data.weather[0].main]:null

    const backgroundImages = {
        Clear: 'linear-gradient(to right,#f3b07c,#fcd283)',
        Clouds: 'linear-gradient(to right,#57d6d4,#71eeec)',
        Rain: 'linear-gradient(to right,#5bc8fb,#80eaff)',
        Snow: 'linear-gradient(to right,#aff2ff,#fff)',
        Haze: 'linear-gradient(to right,#57d6d4,#71eeec)',
        Mist: 'linear-gradient(to right,#57d6d4,#71eeec)',
        Fog: 'linear-gradient(to right,#57d6d4,#71eeec)',
        Smoke: 'linear-gradient(to right,#f5f5f5,#cfbobo)',
    }

    const backgroundImage = data.weather ? 
    backgroundImages[data.weather[0].main] : 
    'linear-gradient(to right,#f3b07c,#fcd283)'

    const currentDate =new Date()

    const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

    const months = [
        'Jan','Feb','Mar','Apr',
        'May','Jun','Jul','Aug',
        ,'Sep','Oct','Nov','Dec',
    ]

    const dayOfWeek =daysOfWeek[currentDate.getDay()]
    const month = months[currentDate.getMonth()]
    const dayOfMonth=currentDate.getDate()

    const formattedDate=`${dayOfWeek},${dayOfMonth} ${month}`

    return (
    <div className="container" style={{backgroundImage} }>
        <div className="weather-app" style={
            {backgroundImage:backgroundImage &&
                backgroundImage.replace ? backgroundImage.replace('to right','to left'):null}}>
            <div className="search">
                <div className="search-top">
                    <div className="location">{data.name}</div>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Enter Location" 
                    value={location}
                    onChange={InputChange}
                    onKeyDown={KeyDown}
                    />
                    <img className='me' src={searchs} alt="search"  onClick={search}/>
                </div>
            </div>
            {data.notFound ? (<div className='not-found'>Not Found 🤷‍♂️🤷‍♂️</div>):(
                <>
                <div className="weather">
                <img src={weatherImg} alt="sunny" />
                <div className="weather-type">{data.weather ? data.weather[0].main:null}</div>
                <div className="temp">{data.main ? `${Math.floor(data.main.temp)}`:null}</div>
                </div>
                <div className="weather-date">
                    <p>{formattedDate}</p>
                </div>
                <div className="weather-data">
                    <div className="humidity">
                        <div className="data-name">Humidity</div>
                        <img src={humid} alt="humid" />
                        <div className="data">{data.main ? data.main.humidity:null}%</div>
                    </div>
                    <div className="wind">
                        <div className="data-name">Wind</div>
                        <img className='windy' src={windy} alt="" />
                        <div className="data">{data.wind ? data.wind.speed:null}km/hr</div>
                    </div>
                </div>
                </>
            )}
        </div>
    </div>
    )
}

export default WeatherApp
