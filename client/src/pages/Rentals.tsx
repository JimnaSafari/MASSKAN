import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal, MapPin, Building, User, Building2, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { allCounties, townsForCounty } from "@/data/locations";
import { heroBackgroundCss } from "@/data/pageImages";
import { getProperties, Property } from "@/lib/supabase";

const Rentals = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [county, setCounty] = useState<string>("");
  const [town, setTown] = useState<string>("");
  const [managementFilter, setManagementFilter] = useState<string>("all");
  const towns = townsForCounty(county);

  useEffect(() => {
    const fetchRentalProperties = async () => {
      try {
        setLoading(true);
        const rentalProperties = await getProperties('rental');
        setProperties(rentalProperties);
      } catch (error) {
        console.error('Error fetching rental properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalProperties();
  }, []);

  // Filter properties based on management type
  const filteredProperties = properties.filter(property => {
    if (managementFilter === "all") return true;
    return property.managed_by === managementFilter;
  });

  // Separate properties by management type
  const landlordProperties = properties.filter(p => p.managed_by === "landlord");
  const agencyProperties = properties.filter(p => p.managed_by === "agency");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section className="relative py-24 bg-cover bg-center overflow-hidden" style={{ backgroundImage: heroBackgroundCss("rentals") }}>
        <div className="container mx-auto px-4">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Find Your Perfect Rental Home
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
              Discover long-term rental properties with detailed information, virtual tours, and verified landlords.
            </p>
          </div>

          {/* Search Bar */}
          <Card className="max-w-5xl mx-auto bg-white/95 backdrop-blur animate-slide-up">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                {/* County */}
                <Select value={county} onValueChange={(v) => { setCounty(v); setTown(""); }}>
                  <SelectTrigger>
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="County" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCounties.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Town */}
                <Select value={town} onValueChange={setTown}>
                  <SelectTrigger>
                    <SelectValue placeholder={county ? "Town" : "Select county first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {towns.map((t) => (
                      <SelectItem key={t.name} value={t.name}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Property Type */}
                <Select>
                  <SelectTrigger>
                    <Building className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">Single Room</SelectItem>
                    <SelectItem value="0.75">Bedsitter</SelectItem>
                    <SelectItem value="1br">1 Bedroom</SelectItem>
                    <SelectItem value="2br">2 Bedroom</SelectItem>
                    <SelectItem value="3br">3 Bedroom</SelectItem>
                    <SelectItem value="4br">4+ Bedroom</SelectItem>
                  </SelectContent>
                </Select>

                {/* Price Range */}
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50000">KSh 0 - 50,000</SelectItem>
                    <SelectItem value="50000-100000">KSh 50,000 - 100,000</SelectItem>
                    <SelectItem value="100000-200000">KSh 100,000 - 200,000</SelectItem>
                    <SelectItem value="200000+">KSh 200,000+</SelectItem>
                  </SelectContent>
                </Select>

                {/* Management Type */}
                <Select value={managementFilter} onValueChange={setManagementFilter}>
                  <SelectTrigger>
                    <Shield className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Management Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Properties</SelectItem>
                    <SelectItem value="landlord">Managed by Landlord</SelectItem>
                    <SelectItem value="agency">Managed by Agency</SelectItem>
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

      {/* Properties Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filters and Results */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Available Properties</h2>
              <p className="text-muted-foreground">
                {loading ? 'Loading...' : `Found ${filteredProperties.length} properties`}
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-64 mb-4"></div>
                  <div className="bg-muted rounded h-4 mb-2"></div>
                  <div className="bg-muted rounded h-4 w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
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
                  managedBy={property.managed_by}
                  landlordName={property.landlord_name}
                  landlordVerified={property.landlord_verified}
                  agencyName={property.agency_name}
                  agencyVerified={property.agency_verified}
                />
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Management Type Comparison Section */}
      <section className="py-16 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Property Management Options</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose between properties managed by individual landlords or professional agencies. 
              Both options offer unique benefits for different tenant preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Landlord Managed Properties */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                <div className="flex items-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 mr-4">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Managed by Landlords</h3>
                    <p className="text-muted-foreground">{landlordProperties.length} properties available</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Direct communication with property owner
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Often more flexible with terms
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Personal touch and local knowledge
                  </div>
                </div>
              </div>
              
              {/* Sample Landlord Properties */}
              <div className="p-6">
                <h4 className="font-semibold mb-4">Featured Landlord Properties</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {landlordProperties.slice(0, 4).map((property) => (
                    <div key={property.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{property.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {property.landlord_name}
                          {property.landlord_verified && (
                            <CheckCircle className="h-3 w-3 text-green-600 inline ml-1" />
                          )}
                        </p>
                        <p className="text-xs font-semibold text-primary">
                          KSh {property.price.toLocaleString()}/month
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Agency Managed Properties */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 p-6">
                <div className="flex items-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20 mr-4">
                    <Building2 className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Managed by Agencies</h3>
                    <p className="text-muted-foreground">{agencyProperties.length} properties available</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Professional property management
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Standardized processes and contracts
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    24/7 support and maintenance
                  </div>
                </div>
              </div>
              
              {/* Sample Agency Properties */}
              <div className="p-6">
                <h4 className="font-semibold mb-4">Featured Agency Properties</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {agencyProperties.slice(0, 4).map((property) => (
                    <div key={property.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{property.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {property.agency_name}
                          {property.agency_verified && (
                            <Shield className="h-3 w-3 text-blue-600 inline ml-1" />
                          )}
                        </p>
                        <p className="text-xs font-semibold text-primary">
                          KSh {property.price.toLocaleString()}/month
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Management Type Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 mx-auto mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{landlordProperties.length}</h3>
              <p className="text-muted-foreground">Landlord Managed</p>
            </Card>
            
            <Card className="text-center p-6 bg-gradient-to-br from-secondary/5 to-secondary/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20 mx-auto mb-4">
                <Building2 className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{agencyProperties.length}</h3>
              <p className="text-muted-foreground">Agency Managed</p>
            </Card>
            
            <Card className="text-center p-6 bg-gradient-to-br from-green-500/5 to-green-500/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20 mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {properties.filter(p => p.landlord_verified || p.agency_verified).length}
              </h3>
              <p className="text-muted-foreground">Verified Properties</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rentals;
