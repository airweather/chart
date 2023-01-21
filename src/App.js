import axios from "axios";
import {useState, useEffect} from "react";

const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/';
const fetchMode = {
  method: 'GET',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json',
  },
}



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
  base_date: 20230121,
  base_time: '0600',
  nx: 55,
  ny: 127
}

function App() {
  const [currentWeather, setCurrentWeather] = useState();

  // useEffect(() => {getWeather()}, []);

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
  }

  const showData = () => {
    setCurrentWeather([...currentWeather, {a:'1'}]);
  }

  return (
    <div className="App">
      <h1>Weather Check</h1>
      <button onClick={getWeather}>getWeather</button>
      <button onClick={checkData}>Check</button>
      <button onClick={showData}>Show</button>
      {/* {currentWeather?.map((weather) => {
        <div key={weather.category}>
          <div>{weather.category}</div>
          <div>{weather.obsrValue}</div>
        </div>
      })} */}

      <div>
        {currentWeather?.map((weather) => {
          <p>{weather.category}</p>
        })}
      </div>

    </div>
  );
}

export default App;
