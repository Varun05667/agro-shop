import React from 'react';
// import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Posts from '../components/Posts';

import * as weatherImg from '../assets/weather.png'
import * as newsImg from '../assets/news.png';

export default function HomeScreen(props) {

  // console.log()
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-3">
          <div className="mt-3">

          <div className="border rounded mb-3" 
              style={{justifyContent:"center", textAlign:"center", cursor:'pointer'}}
              onClick={() => openInNewTab("https://www.accuweather.com/en/in/sangli-miraj-and-kupwad/2785298/weather-forecast/2785298")}>
              <img src={weatherImg} width={100} alt="user"/>
              <h6>Check Weather</h6>
            </div>
            
            <div className="border rounded mb-3" 
              style={{justifyContent:"center", textAlign:"center", cursor:'pointer'}}
              onClick={() => openInNewTab("https://www.agrowon.com/")}>
              <img src={newsImg} width={100} alt="user"/>
              <h6>Agro News</h6>
            </div>
            
          </div>
        </div>
        <div className="col-sm-12 col-md-8 col-lg-9">
          <Posts history={props.history}/>
        </div>
      </div>
    </div>
  );
}
