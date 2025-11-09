import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { WeatherCard } from "@/components/WeatherCard";
import { useToast } from "@/hooks/use-toast";
import { Cloud } from "lucide-react";

const Index = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

  const fetchWeather = async (city: string) => {
    if (API_KEY === "YOUR_API_KEY_HERE") {
      toast({
        title: "API Key Required",
        description: "Please add your OpenWeatherMap API key in src/pages/Index.tsx",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeatherData(data);
      toast({
        title: "Success",
        description: `Weather data loaded for ${city}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch weather data. Please try again.",
        variant: "destructive",
      });
      console.error("Error fetching weather:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sky flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 animate-in fade-in duration-700">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Cloud className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">Weather App</h1>
          </div>
          <p className="text-white/80 text-lg">
            Search for any city to get real-time weather information
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <SearchBar onSearch={fetchWeather} isLoading={isLoading} />
          {weatherData && <WeatherCard data={weatherData} />}
        </div>

        {!weatherData && !isLoading && (
          <div className="text-center text-white/60 animate-in fade-in duration-1000 delay-300">
            <p>Start by searching for a city above</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
