import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Home, Calendar } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Image with Multiple Layers */}
      <div className="absolute inset-0 z-0">
        {/* Primary Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&auto=format&fit=crop&q=80')`
          }}
        />
        
        {/* Animated Overlay Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/70" />
        
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        
        {/* Animated Geometric Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full blur-xl animate-float" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-secondary/30 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-primary/40 rounded-full blur-md animate-float" style={{ animationDelay: '4s' }} />
        </div>
        
        {/* Subtle Noise Texture */}
        <div
          className={`absolute inset-0 opacity-5 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-5xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-white via-secondary to-orange-300 bg-clip-text text-transparent animate-glow">
              Home & Services
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/95 max-w-3xl mx-auto leading-relaxed">
            Discover amazing properties, book short-term stays, find reliable movers, and explore our marketplace - all in one platform.
          </p>

          {/* Enhanced Search Form */}
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/30 animate-slide-up hover:bg-white/20 transition-all duration-500 hover:shadow-3xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/90 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </label>
                <div className="relative group">
                  <Input
                    placeholder="Enter location..."
                    className="pl-12 pr-4 h-14 bg-white/95 border-white/40 focus:border-primary hover:bg-white transition-all duration-300 text-foreground placeholder:text-muted-foreground/70 rounded-xl shadow-lg"
                  />
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/90 flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Property Type
                </label>
                <div className="relative group">
                  <Input
                    placeholder="Rental, Airbnb..."
                    className="pl-12 pr-4 h-14 bg-white/95 border-white/40 focus:border-primary hover:bg-white transition-all duration-300 text-foreground placeholder:text-muted-foreground/70 rounded-xl shadow-lg"
                  />
                  <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/90 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date
                </label>
                <div className="relative group">
                  <Input
                    type="date"
                    className="pl-12 pr-4 h-14 bg-white/95 border-white/40 focus:border-primary hover:bg-white transition-all duration-300 text-foreground rounded-xl shadow-lg"
                  />
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                </div>
              </div>
              
              <Button
                size="lg"
                className="h-14 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl rounded-xl"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-scale-in">
            <a href="/rentals" className="group">
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-white/15 border-white/40 text-white hover:bg-white/25 h-16 transform hover:scale-105 transition-all duration-300 hover:shadow-xl rounded-xl backdrop-blur-sm group-hover:border-white/60"
              >
                <Home className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Browse Rentals
              </Button>
            </a>
            <a href="/airbnb" className="group">
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-white/15 border-white/40 text-white hover:bg-white/25 h-16 transform hover:scale-105 transition-all duration-300 hover:shadow-xl rounded-xl backdrop-blur-sm group-hover:border-white/60"
              >
                <MapPin className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Book Airbnb
              </Button>
            </a>
            <a href="/movers" className="group">
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-white/15 border-white/40 text-white hover:bg-white/25 h-16 transform hover:scale-105 transition-all duration-300 hover:shadow-xl rounded-xl backdrop-blur-sm group-hover:border-white/60"
              >
                <Search className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Find Services
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;