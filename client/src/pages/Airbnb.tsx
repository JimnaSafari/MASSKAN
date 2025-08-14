import Navigation from "@/components/Navigation";
import { heroBackgroundCss } from "@/data/pageImages";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { allCounties, townsForCounty } from "@/data/locations";
import { getProperties, Property } from "@/lib/api";

const Airbnb = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [county, setCounty] = useState<string>("");
  const [town, setTown] = useState<string>("");
  const towns = townsForCounty(county);

  useEffect(() => {
    const fetchAirbnbProperties = async () => {
      try {
        setLoading(true);
        const airbnbProperties = await getProperties('airbnb');
        setProperties(airbnbProperties);
      } catch (error) {
        console.error('Error fetching Airbnb properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAirbnbProperties();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section className="relative py-24 bg-cover bg-center overflow-hidden" style={{ backgroundImage: heroBackgroundCss("airbnb") }}>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Airbnb Stays
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-slide-up">
              Experience Kenyan hospitality with our unique stays.
            </p>
          </div>

          {/* Search Filters */}
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md border-0 shadow-elegant animate-bounce-in">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Location</label>
                  <Select value={county} onValueChange={(v) => { setCounty(v); setTown(""); }}>
                    <SelectTrigger className="h-12 border-border/50 focus:border-primary">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      {allCounties.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {county && (
                    <Select value={town} onValueChange={setTown}>
                      <SelectTrigger className="h-12 border-border/50 focus:border-primary">
                        <SelectValue placeholder="Select town" />
                      </SelectTrigger>
                      <SelectContent>
                        {towns.map((t) => (
                          <SelectItem key={t.name} value={t.name}>{t.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Price per night */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Price per night</label>
                  <Select>
                    <SelectTrigger className="h-12 border-border/50 focus:border-primary">
                      <SelectValue placeholder="All Prices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-5000">KSh 0 - 5,000</SelectItem>
                      <SelectItem value="5000-10000">KSh 5,000 - 10,000</SelectItem>
                      <SelectItem value="10000-20000">KSh 10,000 - 20,000</SelectItem>
                      <SelectItem value="20000+">KSh 20,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Guests</label>
                  <Select>
                    <SelectTrigger className="h-12 border-border/50 focus:border-primary">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5+">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter Button */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-transparent">Search</label>
                  <Button size="lg" className="w-full h-12 btn-primary rounded-xl font-semibold">
                    Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Stays Section */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Stays</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked accommodations offering the best of Kenyan hospitality
            </p>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-64 mb-4"></div>
                  <div className="bg-muted rounded h-4 mb-2"></div>
                  <div className="bg-muted rounded h-4 w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, index) => (
                <div 
                  key={property.id} 
                  className="animate-scale-in hover:animate-float"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <PropertyCard 
                    id={property.id}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    priceType={property.price_type}
                    rating={property.rating}
                    reviews={property.reviews}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    area={property.area}
                    image={property.image}
                    type={property.type}
                    featured={property.featured}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12 animate-fade-in">
            <Button variant="outline" size="lg" className="btn-outline px-8 py-3 rounded-full">
              Load More Stays
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-6">
          <div className="text-center text-white animate-fade-in">
            <h2 className="text-3xl font-bold mb-8">Why Choose Our Airbnb Platform?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center animate-slide-up" style={{ animationDelay: "200ms" }}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
                <p className="text-white/80">Stay in the heart of Kenya's most beautiful destinations</p>
              </div>
              <div className="text-center animate-slide-up" style={{ animationDelay: "400ms" }}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Hosts</h3>
                <p className="text-white/80">All our hosts are verified and provide authentic experiences</p>
              </div>
              <div className="text-center animate-slide-up" style={{ animationDelay: "600ms" }}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
                <p className="text-white/80">Simple and secure booking process with instant confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Airbnb;