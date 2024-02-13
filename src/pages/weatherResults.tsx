import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/weatherResults.module.css'
import Image from 'next/image'

export default function WeatherResults() {
  const apiKey = process.env.NEXT_PUBLIC_API;
  const [data, setData] = useState<IWeatherForecast["list"][0]>();
  // const [dailyData, setDailyData] = useState<IWeatherForecast["list"]>([]);
  const [dailyData, setDailyData] = useState<IWeatherForecast["list"]>([{
    main: {
      temp: 0,
    },
    weather: [{
      main: "",
      description: "",
    }],
    wind: {
      speed: 0,
    },
    dt_txt: ""
  }]);
  const router = useRouter();
  const [cityName, setCityName] = useState('');
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const weatherIcons = {
    Rain: '/images/rain.png',
    Clouds: '/images/cloudy.png',
    Clear: '/images/sunny.png',
  }



  useEffect(() => {
    const { cityName } = router.query;
    if (cityName) {
      setCityName(cityName);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((weatherData: IWeatherForecast) => {
          setData(weatherData);
          console.log(weatherData);
        })
        .catch(error => {
          console.error('Error fetching weather data: ', error);
        });

      const fiveDayWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;
      fetch(fiveDayWeatherUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((fiveDayWeatherData: IWeatherForecast) => {
          console.log(fiveDayWeatherData);
          setDailyData(fiveDayWeatherData.list.filter((item, index) => index % 8 === 0));
        })
        .catch(error => {
          console.error('Error fetching 5-day weather data: ', error);
        });
    }
  }, [router.query, apiKey]);


  return (
    <div className={styles.main}>
      <div className={styles.currentWeatherDisplay}>
        <h2>{cityName}</h2>
        <div className={styles.currentWeather}>
          {
            data && (
              <div className={styles.currentWeatherInfo}>
                <div>Last Updated: {new Date(data.dt * 1000).toLocaleString()}</div>
                {data.weather[0].main in weatherIcons && (
                  <img className={styles.weatherIcons} src={weatherIcons[data.weather[0].main]} alt={data.weather[0].main} />
                )}
                <div>{data.weather[0].main}</div>
                <div>{data.weather[0].description}</div>
                <div>Temp: {data.main.temp} C</div>
                <div>Wind: {data.wind && data.wind.speed} m/s</div>
              </div>
            )
          }
        </div>
      </div>

      <div className={styles.fiveDayWeatherDisplay}>
        <h2>5-day forecast</h2>
        <div className={styles.fiveDayWeather}>
          {dailyData.map((dayData, index) => (
            <div  className={styles.fiveDayWeatherInfo} key={index}>
              <div>{formatDate(dayData.dt_txt)}</div>
              {dayData.weather[0].main in weatherIcons && (
                <img className={styles.forecastIcons} src={weatherIcons[dayData.weather[0].main]} alt={dayData.weather[0].main} />
              )}
              <div>{dayData.weather[0].main}</div>
              <div>{dayData.weather[0].description}</div>
              <div>Temp: {dayData.main.temp}</div>
              <div>Wind: {dayData.wind.speed} m/s</div>

            </div>
          ))}
          
        </div>
      </div>

      <footer className={styles.footer}>
        <p>Copyright © 2024 Bruhther Weather. All rights reserved.</p>
      </footer>

    </div>
  );
}