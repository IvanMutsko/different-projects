!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){i[e]=t},t.parcelRequired7c6=r);var s,a=r("bpxeT"),c=r("2TvXO"),l=(s=e(a)(e(c).mark((function t(n,i){var r,s;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat("https://api.openweathermap.org/data/2.5/weather?","lat=").concat(n,"&lon=").concat(i,"&units=metric&appid=").concat("c807f2acdd74ab8a78287327fdf94a6e"));case 3:return r=e.sent,e.next=6,r.json();case 6:return s=e.sent,e.abrupt("return",s);case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),t,null,[[0,10]])}))),function(e,t){return s.apply(this,arguments)}),o=document.querySelectorAll("#map path"),u=document.querySelector(".state"),d=document.querySelector("#weather-block");function p(e){var t=new Date(1e3*e),n=t.getHours().toString().padStart(2,"0"),i=t.getMinutes().toString().padStart(2,"0");return"".concat(n,":").concat(i)}o.forEach((function(e){e.style.fill="#ffd700",e.style.fillOpacity="0.3",e.style.stroke="rgba(0, 0, 0, 0.3)",e.style.strokeWidth="1px",e.addEventListener("mouseenter",(function(t){e.style.fill="#0057b8";var n=e.getAttribute("title");u.textContent=", ".concat(n)})),e.addEventListener("mouseleave",(function(t){e.style.fill="#ffd700",u.textContent=""})),e.addEventListener("click",(function(e){var t=e.target.getAttribute("data-geocode"),n=t.split(",")[0].trim(),i=t.split(",")[1].trim();l(n,i).then((function(e){var t,n,i=e.main,r=e.weather,s=e.wind,a=e.clouds,c=e.sys,l={temp:i.temp,feelsLike:i.feels_like,pressure:(.750062*i.pressure).toFixed(0),humidity:i.humidity,windSpeed:s.speed,windGust:s.gust,clouds:a.all,sunrise:p(c.sunrise),sunset:p(c.sunset),description:r[0].description,icon:r[0].icon,main:r[0].main,id:r[0].id};d.textContent="",d.classList.remove("visually-hidden"),n='\n  <div class="weather-description">\n          <h2 class="descr-title">'.concat((t=l).description.charAt(0).toUpperCase()+t.description.slice(1),'</h2>\n          <img\n            class="weather-img"\n            src="https://openweathermap.org/img/wn/').concat(t.icon,'@2x.png"\n          />\n          <ul class="time-wrap weather-list">\n                <li>sunrise: ').concat(t.sunrise,"</li>\n                <li>sunset: ").concat(t.sunset,'</li>\n              </ul>\n          </ul>\n        </div>\n        <div class="wether-data-wrap">\n          <ul class="weather-list">\n            <li>Temperature: ').concat(t.temp," °C</li>\n            <li>Feels like: ").concat(t.feelsLike," °C</li>\n            <li>Wind: ").concat(t.windSpeed," m/s</li>\n            <li>Wind gust: ").concat(t.windGust,' m/s</li>\n          </ul>\n          <ul class="weather-list">\n            <li>Pressure: ').concat(t.pressure," mmHg</li>\n            <li>Humidity: ").concat(t.humidity," %</li>\n            <li>Cloudiness: ").concat(t.clouds," %</li>\n          </ul>\n        </div>\n  "),d.insertAdjacentHTML("beforeend",n)}))}))}))}();
//# sourceMappingURL=map.b6c42a40.js.map