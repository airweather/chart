import axios from "axios";
import {useState, useEffect} from "react";

const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/';

let latitude;
let longitude;

const getLocation = () => {
  if (navigator.geolocation) { // GPS를 지원하면
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = Math.floor(position.coords.latitude);
      longitude = Math.floor(position.coords.longitude);
      // console.log(position.coords.latitude + ' ' + position.coords.longitude);
    }, function(error) {
      console.error(error);
    }, {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: Infinity
    });
  } else {
    alert('GPS를 지원하지 않습니다');
  }
}

const getDate = new Date();
const date = ''+getDate.getFullYear() 
      + (getDate.getMonth() <9 ? '0' + (getDate.getMonth()+1).toString() : getDate.getMonth() + 1) 
      + getDate.getDate();
const time = (getDate.getHours() < 10 ? '0' + getDate.getHours().toString() : getDate.getHours().toString()) + (getDate.getMinutes() < 10 ? '0' + getDate.getMinutes().toString() : getDate.getMinutes().toString());


const requestParams = {
  //type 
  //초단기실황조회 : getUltraSrtNcst
  //초단기예보조회 : getUltraSrtFcst
  //단기예보조회 : getVilageFcst
  //예보버전조회 : getFcstVersion
  type: 'getUltraSrtNcst',
  serviceKey: '6X6R8qPmP1c%2Bhn3K%2BI9ZOtxfoSCmtBt2Tx7H%2BoR%2BeVquA%2BQMwHyAvssRSP1auHTljoTkhrnUMS6tvBqu%2FrTK0g%3D%3D',
  pageNo: 1,
  numOfRows: 1000,
  dataType: 'JSON',
  base_date: date,
  base_time: '0000',
  nx: 37,
  ny: 127
}



function App() {
  getLocation();
  const [currentWeather, setCurrentWeather] = useState();

  useEffect(() => {getWeather()}, []);

  const getWeather = () => {
    
    // axios({
    //   method: 'get',
    //   url: url+`${requestParams.type}?serviceKey=${requestParams.serviceKey}&pageNo=${requestParams.pageNo}&numOfRows=${requestParams.numOfRows}&dataType=${requestParams.dataType}&base_date=${requestParams.base_date}&base_time=${requestParams.base_time}&nx=${requestParams.nx}&ny=${requestParams.ny}`,
    //   })
    //   .catch((error) => {
    //   // 에러 핸들링
    //   console.log(error);
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     const data = response.data.response.body.items.item;
    //     console.log(data);
    //     setCurrentWeather(data);
    //     console.log('curWeather : ',currentWeather);
    //   });
      
    fetch(url+`${requestParams.type}?serviceKey=${requestParams.serviceKey}&pageNo=${requestParams.pageNo}&numOfRows=${requestParams.numOfRows}&dataType=${requestParams.dataType}&base_date=${requestParams.base_date}&base_time=${requestParams.base_time}&nx=${requestParams.nx}&ny=${requestParams.ny}`)
    .then((response) => response.json())
    .then((data) => {
      const weatherData = data.response.body.items.item;
      console.log(weatherData);
      setCurrentWeather(weatherData);
      console.log('current : ', currentWeather);
    });
  }

  const checkData = () => {
    console.log(currentWeather);
    console.log(latitude)  ;
    console.log(longitude);
  }


  return (
    <div className="App">
      <h1>Weather Check</h1>
      <button onClick={getWeather}>getWeather</button>
      <button onClick={checkData}>Check</button>
      <div>
        {currentWeather?.map((weather) => {
          return <p key={weather.category}>{weather.category} : {weather.obsrValue}</p>
        })}
      </div>

    </div>
  );
}

export default App;
