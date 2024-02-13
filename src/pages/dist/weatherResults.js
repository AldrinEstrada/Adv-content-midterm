"use strict";
exports.__esModule = true;
var react_1 = require("react");
var router_1 = require("next/router");
var weatherResults_module_css_1 = require("@/styles/weatherResults.module.css");
function WeatherResults() {
    var apiKey = process.env.NEXT_PUBLIC_API;
    var _a = react_1.useState(), data = _a[0], setData = _a[1];
    // const [dailyData, setDailyData] = useState<IWeatherForecast["list"]>([]);
    var _b = react_1.useState([{
            main: {
                temp: 0
            },
            weather: [{
                    main: "",
                    description: ""
                }],
            wind: {
                speed: 0
            },
            dt_txt: ""
        }]), dailyData = _b[0], setDailyData = _b[1];
    var router = router_1.useRouter();
    var _c = react_1.useState(''), cityName = _c[0], setCityName = _c[1];
    var formatDate = function (dateString) {
        var date = new Date(dateString);
        var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    var weatherIcons = {
        Rain: '/images/rain.png',
        Clouds: '/images/cloudy.png',
        Clear: '/images/sunny.png'
    };
    react_1.useEffect(function () {
        var cityName = router.query.cityName;
        if (cityName) {
            setCityName(cityName);
            var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + apiKey;
            fetch(url)
                .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
                .then(function (weatherData) {
                setData(weatherData);
                console.log(weatherData);
            })["catch"](function (error) {
                console.error('Error fetching weather data: ', error);
            });
            var fiveDayWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=" + apiKey;
            fetch(fiveDayWeatherUrl)
                .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
                .then(function (fiveDayWeatherData) {
                console.log(fiveDayWeatherData);
                setDailyData(fiveDayWeatherData.list.filter(function (item, index) { return index % 8 === 0; }));
            })["catch"](function (error) {
                console.error('Error fetching 5-day weather data: ', error);
            });
        }
    }, [router.query, apiKey]);
    return (React.createElement("div", { className: weatherResults_module_css_1["default"].main },
        React.createElement("div", { className: weatherResults_module_css_1["default"].currentWeatherDisplay },
            React.createElement("h2", null, cityName),
            React.createElement("div", { className: weatherResults_module_css_1["default"].currentWeather }, data && (React.createElement("div", { className: weatherResults_module_css_1["default"].currentWeatherInfo },
                React.createElement("div", null,
                    "Last Updated: ",
                    new Date(data.dt * 1000).toLocaleString()),
                data.weather[0].main in weatherIcons && (React.createElement("img", { className: weatherResults_module_css_1["default"].weatherIcons, src: weatherIcons[data.weather[0].main], alt: data.weather[0].main })),
                React.createElement("div", null, data.weather[0].main),
                React.createElement("div", null, data.weather[0].description),
                React.createElement("div", null,
                    "Temp: ",
                    data.main.temp,
                    " C"),
                React.createElement("div", null,
                    "Wind: ",
                    data.wind && data.wind.speed,
                    " m/s"))))),
        React.createElement("div", { className: weatherResults_module_css_1["default"].fiveDayWeatherDisplay },
            React.createElement("h2", null, "5-day forecast"),
            React.createElement("div", { className: weatherResults_module_css_1["default"].fiveDayWeather }, dailyData.map(function (dayData, index) { return (React.createElement("div", { className: weatherResults_module_css_1["default"].fiveDayWeatherInfo, key: index },
                React.createElement("div", null, formatDate(dayData.dt_txt)),
                dayData.weather[0].main in weatherIcons && (React.createElement("img", { className: weatherResults_module_css_1["default"].forecastIcons, src: weatherIcons[dayData.weather[0].main], alt: dayData.weather[0].main })),
                React.createElement("div", null, dayData.weather[0].main),
                React.createElement("div", null, dayData.weather[0].description),
                React.createElement("div", null,
                    "Temp: ",
                    dayData.main.temp),
                React.createElement("div", null,
                    "Wind: ",
                    dayData.wind.speed,
                    " m/s"))); }))),
        React.createElement("footer", { className: weatherResults_module_css_1["default"].footer },
            React.createElement("p", null, "Copyright \u00A9 2024 Bruhther Weather. All rights reserved."))));
}
exports["default"] = WeatherResults;
