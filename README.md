live demo: https://pedantic-tereshkova-c02184.netlify.app/

Weather app showing resuts from different APIs so you can compare different sources and get more accurate weather data.
I noticed, that Meteo.lt is showing more accurate and updated data that OpenWeatherMap. Understandably, as Meteo is 
created to show weather only in Lithuania and probably takes data from a weather station close to Lithuania. OpenWeatherMap is providing data from all over the world.
1. Open Weather App
2. Meteo.lt


App is using heroku CORS acess to go around an error when connecting to Meteo.lt api. Because there's a limit for the Horoku app requests,
app can crash if you make arount 100 requests.

Used Suspense on loading the text about temperature, wind and city name. There's an auto complete drowdown menu when user interst
3 or more letters of the city name.
Background picture was created with Adebe Photoshop.

![](https://github.com/Metsuge/WeatherApp/WeatherAppImage.jpg)
