import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets } from "lucide-react";

interface WeatherData {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherIcon = ({ condition }: { condition: string }) => {
  const iconClass = "w-24 h-24 text-primary animate-in fade-in duration-500";
  
  switch (condition.toLowerCase()) {
    case "clear":
      return <Sun className={iconClass} />;
    case "rain":
    case "drizzle":
      return <CloudRain className={iconClass} />;
    case "snow":
      return <CloudSnow className={iconClass} />;
    case "clouds":
      return <Cloud className={iconClass} />;
    default:
      return <Cloud className={iconClass} />;
  }
};

export const WeatherCard = ({ data }: WeatherCardProps) => {
  return (
    <Card className="w-full max-w-md backdrop-blur-xl bg-gradient-card border-white/20 shadow-soft animate-in slide-in-from-bottom duration-700">
      <div className="p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-card-foreground">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-muted-foreground capitalize text-lg">
            {data.weather[0].description}
          </p>
        </div>

        <div className="flex items-center justify-center py-4">
          <WeatherIcon condition={data.weather[0].main} />
        </div>

        <div className="text-center">
          <div className="text-6xl font-bold text-card-foreground mb-2">
            {Math.round(data.main.temp)}°C
          </div>
          <p className="text-muted-foreground">
            Feels like {Math.round(data.main.feels_like)}°C
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-3">
            <Wind className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="font-semibold text-card-foreground">
                {Math.round(data.wind.speed)} m/s
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Droplets className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-semibold text-card-foreground">
                {data.main.humidity}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
