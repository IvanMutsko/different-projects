const e=async function(e,t){try{const i=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${e}&lon=${t}&units=metric&appid=c807f2acdd74ab8a78287327fdf94a6e`);return await i.json()}catch(e){console.log(e)}},t=document.querySelectorAll("#map path"),i=document.querySelector(".state"),s=document.querySelector("#weather-block");function n(e){const t=new Date(1e3*e);return`${t.getHours().toString().padStart(2,"0")}:${t.getMinutes().toString().padStart(2,"0")}`}t.forEach((t=>{t.style.fill="#ffd700",t.style.fillOpacity="0.3",t.style.stroke="rgba(0, 0, 0, 0.3)",t.style.strokeWidth="1px",t.addEventListener("mouseenter",(e=>{t.style.fill="#0057b8";const s=t.getAttribute("title");i.textContent=`, ${s}`})),t.addEventListener("mouseleave",(e=>{t.style.fill="#ffd700",i.textContent=""})),t.addEventListener("click",(t=>{const i=t.target.getAttribute("data-geocode"),l=i.split(",")[0].trim(),r=i.split(",")[1].trim();e(l,r).then((e=>{const{main:t,weather:i,wind:l,clouds:r,sys:a}=e,d={temp:t.temp,feelsLike:t.feels_like,pressure:(.750062*t.pressure).toFixed(0),humidity:t.humidity,windSpeed:l.speed,windGust:l.gust,clouds:r.all,sunrise:n(a.sunrise),sunset:n(a.sunset),description:i[0].description,icon:i[0].icon,main:i[0].main,id:i[0].id};s.textContent="",s.classList.remove("visually-hidden"),function(e){const t=`\n  <div class="weather-description">\n          <h2 class="descr-title">${e.description.charAt(0).toUpperCase()+e.description.slice(1)}</h2>\n          <img\n            class="weather-img"\n            src="https://openweathermap.org/img/wn/${e.icon}@2x.png"\n          />\n          <ul class="time-wrap weather-list">\n                <li>sunrise: ${e.sunrise}</li>\n                <li>sunset: ${e.sunset}</li>\n              </ul>\n          </ul>\n        </div>\n        <div class="wether-data-wrap">\n          <ul class="weather-list">\n            <li>Temperature: ${e.temp} °C</li>\n            <li>Feels like: ${e.feelsLike} °C</li>\n            <li>Wind: ${e.windSpeed} m/s</li>\n            <li>Wind gust: ${e.windGust} m/s</li>\n          </ul>\n          <ul class="weather-list">\n            <li>Pressure: ${e.pressure} mmHg</li>\n            <li>Humidity: ${e.humidity} %</li>\n            <li>Cloudiness: ${e.clouds} %</li>\n          </ul>\n        </div>\n  `;s.insertAdjacentHTML("beforeend",t)}(d)}))}))}));
//# sourceMappingURL=map.2bda31a8.js.map