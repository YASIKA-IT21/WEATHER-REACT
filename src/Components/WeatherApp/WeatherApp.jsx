import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.jpeg';
import cloud_image from '../Assets/cloud.jpeg';
import humidity_icon from '../Assets/humidity_image.png';
import wind_icon from '../Assets/wind.png';
import clear  from '../Assets/clear_image.jpeg';
import drizzle from '../Assets/drizzle.jpeg';
import rain from '../Assets/rain.jpeg';
import snow from '../Assets/snow.jpeg';


const WeatherApp = () => {
    const api_key = "58d8db90b0019965e7c1031d0fd33ffe";
    const[wicon,setwicon]=useState(cloud_image);

    const search = async () => {
        const inputCity = document.querySelector(".inputcity");
        if (!inputCity || inputCity.value.trim() === "") {
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=Metric&appid=${api_key}`;
        const response = await fetch(url);
        const data = await response.json();

        const humidityElement = document.querySelector(".humidity_percent");
        const windElement = document.querySelector(".wind-rate");
        const tempElement = document.querySelector(".weather_temp");
        const locationElement = document.querySelector(".weather_location");

        if (data.main && data.main.humidity) {
            humidityElement.innerHTML = `${data.main.humidity}%`;
        }
        if (data.wind && data.wind.speed) {
            windElement.innerHTML = `${data.wind.speed} KM/HR`;
        }
        if (data.main && data.main.temp) {
            tempElement.innerHTML = `${data.main.temp}°C`;
        }
        if (data.name) {
            locationElement.innerHTML = data.name;
        }
        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n" )
        {
            setwicon(clear);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n" )
        {
            setwicon(cloud_image);
        } 
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n" )
        {
            setwicon(drizzle);
        } 
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n" )
        {
            setwicon(drizzle);
        } 
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n" )
        {
            setwicon(snow);
        } 
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n" )
        {
            setwicon(rain);
        } 
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n" )
        {
            setwicon(snow);
        } 
        else{
            setwicon(clear);

        }

    };

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type='text' className='inputcity' placeholder='Search'></input>
                <div className="search_icon" onClick={search}>
                    <img src={search_icon} alt="" width="55px" height="55px"></img>
                </div>
            </div>

            <div className="weather_image">
                <img src={wicon} alt="Cloudy"></img>
            </div>
            <div className="weather_temp">24°C</div>
            <div className="weather_location">London</div>
            <div className="data_container">
                <div className="element">
                    <img src={humidity_icon} width="70px" className='icon' alt="Humidity Icon"></img>
                    <div className="data">
                        <div className="humidity_percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} className='icon' width="65px" alt="Wind Icon"></img>
                    <div className="data">
                        <div className="wind-rate">18 KM/HR</div>
                        <div className="text">Wind-speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
