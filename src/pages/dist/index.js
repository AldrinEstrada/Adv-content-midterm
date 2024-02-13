"use strict";
exports.__esModule = true;
var react_1 = require("react");
var router_1 = require("next/router");
var Home_module_css_1 = require("@/styles/Home.module.css");
var image_1 = require("next/image");
var Home = function () {
    var router = router_1.useRouter();
    var _a = react_1.useState(''), cityName = _a[0], setCityName = _a[1];
    var handleCityChange = function (e) {
        setCityName(e.target.value);
    };
    var handleSearch = function () {
        router.push("/weatherResults?cityName=" + cityName);
    };
    return (React.createElement("div", { className: Home_module_css_1["default"].main },
        React.createElement("div", { className: Home_module_css_1["default"].appTitle },
            React.createElement(image_1["default"], { className: Home_module_css_1["default"].animation, src: '/images/brutherlogo.png', height: 120, width: 100, autoPlay: false, controls: true }),
            React.createElement("h1", null, "Bruhther"),
            React.createElement("h3", null, "Weather for the bros"),
            React.createElement("p", null, "Check the weather today bruh!")),
        React.createElement("div", { className: Home_module_css_1["default"].searchTab },
            React.createElement("input", { type: "text", value: cityName, onChange: handleCityChange, placeholder: "Enter a city name", className: Home_module_css_1["default"].search }),
            React.createElement("button", { onClick: handleSearch, className: Home_module_css_1["default"].searchButton }, "Search")),
        React.createElement("footer", { className: Home_module_css_1["default"].footer },
            React.createElement("p", null, "Copyright \u00A9 2024 Bruhther Weather. All rights reserved."))));
};
exports["default"] = Home;
