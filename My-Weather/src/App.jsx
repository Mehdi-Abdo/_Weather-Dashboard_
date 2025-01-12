import "./App.css";
import search from "./assets/icons/search.svg";
import { BackgroundLayout, WeatherCard, MiniCard } from "./Components";
import Today from "./Components/Today";
import Tomorrow from "./Components/Tomorrow";
import { useState, useEffect } from "react";
import {
  fetchCity,
  fetchData,
  GetHours,
  GetLatLon,
  GetTomorrowHours,
  weatherDays,
} from "./redux/weatherSlice";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const city = useSelector((state) => state.weather.city);
  const dispatch = useDispatch();

  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) || []
  );
  const [cityName, setCityName] = useState(city || "rabat");
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const getLL = useSelector((state) => state.weather.geo);
  const lat = getLL?.lat;
  const lon = getLL?.lon;

 

  const handleSearch = () => {
    if (inputValue.trim()) {
      setCityName(inputValue);
      

      // Save the searched city to search history
      const updatedHistory = [...new Set([inputValue, ...searchHistory])]; // Ensure uniqueness
      setSearchHistory(updatedHistory);

      // Save to local storage
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

      // Clear input
      setInputValue("");
      setFilteredSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.currentTarget.value;
    setInputValue(value);
    
    

    // Filter suggestions based on input value
    if (value.trim()) {
      const filtered = searchHistory.filter((item) =>
        item.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setCityName(suggestion);
    setFilteredSuggestions([]);
  };

  useEffect(() => {
    dispatch(fetchCity());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchData({ cityName }));
    dispatch(GetLatLon({ cityName }));
  }, [cityName, dispatch]);

  useEffect(() => {
    if (lat && lon) {
      dispatch(GetHours({ lat, lon }));
      dispatch(GetTomorrowHours({ lat, lon }));
      dispatch(weatherDays({ lat, lon }));
    }
  }, [lat, lon, dispatch]);

  return (
    <div className="  w-full h-screen text-white px-4 md:px-8">
      <nav className="w-full border-b-2 border-gray-400 p-3 flex flex-wrap sm:flex-col md:flex-row justify-between items-center gap-4">
        <div className=" header flex items-center gap-2">
          <FilterDramaIcon />
          <h1 className="font-bold tracking-wide text-2xl md:text-3xl xl:text-4xl">
            Weather
          </h1>
        </div>

        <div className="relative w-full sm:w-[20rem]">
  <div className="flex items-center bg-white shadow-lg rounded-lg px-4 py-2">
    <img
      src={search}
      onClick={() => handleSearch()}
      alt="search"
      className="w-6 h-6 cursor-pointer"
    />
    <input
      value={inputValue}
      onChange={handleInputChange}
      type="text"
      placeholder="Search city"
      className="focus:outline-none w-full text-gray-700 text-sm md:text-lg ml-2"
    />
  </div>

  {filteredSuggestions.length > 0 && (
    <ul className="absolute top-full mt-1 bg-white shadow-lg rounded-lg w-full max-h-40 overflow-y-auto z-10 border border-gray-200">
      {filteredSuggestions.map((suggestion, index) => (
        <li
          key={index}
          className="p-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleSuggestionClick(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  )}
</div>
<BackgroundLayout />
      </nav>

     

      <main className="w-full mt-20 flex flex-wrap gap-6 py-4 px-4 md:px-[10%] items-center justify-center">
        <WeatherCard />

        <div className="flex flex-col md:flex-row justify-center gap-4 w-full md:w-[60%]">
          <MiniCard />
        </div>
        <hr className="line  mt-24  bg-white w-full" />
        <div className="w-full  flex justify-center my-4">
          <Button className="button-t" variant="contained" color="success">
            Today
          </Button>
        </div>

        <div className="w-full flex justify-center flex-wrap">
          <Today />
        </div>

        <div className="w-full flex justify-center my-4">
          <Button className="button-t" variant="contained" color="success">
            Tomorrow
          </Button>
        </div>

        <div className="w-full flex justify-center flex-wrap">
          <Tomorrow />
        </div>
      </main>
    </div>
  );
}

export default App;
