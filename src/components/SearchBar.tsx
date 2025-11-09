import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md animate-in fade-in duration-500">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-card/50 backdrop-blur-sm border-white/20 focus:border-primary text-card-foreground placeholder:text-muted-foreground"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft transition-smooth"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};
