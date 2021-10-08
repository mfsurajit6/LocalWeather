document.addEventListener('DOMContentLoaded',  () =>{
    const canvas = document.getElementById('canvas');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( async (position) => {
            let lat = position.coords.latitude;
            let lng =  position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=18d82aacfcaa9bc9b1ed76e23750d9d6`;
            
            try {
                const res = await fetch(url);
                const data = await res.json();
                let dataToPrint = `
                    <ul>
                        <li> Locality: ${data.name} (${data.coord.lat}, ${data.coord.lon})</li>
                        <li> Temparature: ${(parseFloat(data.main.temp) - 273.15).toFixed(2)} C</li>
                        <li> Feels Like: ${(parseFloat(data.main.feels_like) - 273.15).toFixed(2)} C </li>
                        <li> Humidity: ${data.main.humidity} %</li>
                        <li> Wind Speed: ${(parseFloat(data.wind.speed).toFixed(2) * 3.6).toFixed(2)} KM/H</li>`;
                        let des = "";
                            for(i in data.weather){
                                des+=data.weather[i].description;
                            }
                        
                    dataToPrint+=`<li>Description: ${des} </li></ul>`
                canvas.innerHTML = dataToPrint;
            } catch(err) {
                console.log(err);
            }
        });
    } else {
        canvas.innerHTML = "Please allow location settings to get the weather data";
    }
});