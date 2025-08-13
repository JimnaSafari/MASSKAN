import Navigation from "@/components/Navigation";
import { heroBackgroundCss } from "@/data/pageImages";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Building2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getProperties, Property } from "@/lib/supabase";

const Office = () => {
  const [offices, setOffices] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Office Spaces | Masskan Murima";

    const fetchOfficeProperties = async () => {
      try {
        setLoading(true);
        const officeProperties = await getProperties('office');
        setOffices(officeProperties);
      } catch (error) {
        console.error('Error fetching office properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfficeProperties();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Enhanced Hero */}
      <section className="relative py-24 bg-cover bg-center overflow-hidden" style={{ backgroundImage: heroBackgroundCss("office") }}>
        <div className="container mx-auto px-4">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Office Spaces for Rent</h1>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              Flexible offices, co-working, and corporate floors in prime locations.
            </p>
          </div>

          {/* Search */}
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Location" className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger>
                    <Building2 className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Office Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cowork">Co-working</SelectItem>
                    <SelectItem value="private">Private Office</SelectItem>
                    <SelectItem value="floor">Whole Floor</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50000">KSh 0 - 50,000</SelectItem>
                    <SelectItem value="50000-150000">KSh 50,000 - 150,000</SelectItem>
                    <SelectItem value="150000+">KSh 150,000+</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-gradient-primary">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">
            {loading ? 'Loading...' : `Available Offices (${offices.length})`}
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-64 mb-4"></div>
                  <div className="bg-muted rounded h-4 mb-2"></div>
                  <div className="bg-muted rounded h-4 w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offices.map((office) => (
                <PropertyCard 
                  key={office.id} 
                  id={office.id}
                  title={office.title}
                  location={office.location}
                  price={office.price}
                  priceType={office.price_type}
                  rating={office.rating}
                  reviews={office.reviews}
                  bedrooms={office.bedrooms}
                  bathrooms={office.bathrooms}
                  area={office.area}
                  image={office.image}
                  type={office.type}
                  featured={office.featured}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Office;
