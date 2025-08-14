import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Bed, Bath, Square, Star } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  priceType: "month" | "night";
  rating: number;
  reviews: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  type: "rental" | "airbnb" | "office";
  featured?: boolean;
  managedBy?: "landlord" | "agency";
  landlordName?: string;
  landlordVerified?: boolean;
  agencyName?: string;
  agencyVerified?: boolean;
}

const PropertyCard = ({ 
  title, 
  location, 
  price, 
  priceType, 
  rating, 
  reviews, 
  bedrooms, 
  bathrooms, 
  area, 
  image, 
  type,
  featured = false,
  managedBy,
  landlordName,
  landlordVerified,
  agencyName,
  agencyVerified
}: PropertyCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:shadow-card hover:-translate-y-2 border-0 bg-card/80 backdrop-blur transform hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        
        {/* Enhanced Overlay with Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Shimmer Effect on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-all duration-700 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`} />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {featured && (
            <Badge className="bg-secondary text-secondary-foreground animate-pulse">
              Featured
            </Badge>
          )}
          <Badge variant="outline" className="bg-white/90 text-foreground border-white/20 backdrop-blur-sm">
            {type === "rental" ? "Rental" : "Airbnb"}
          </Badge>
          {managedBy && (
            <Badge 
              variant="outline" 
              className={`bg-white/90 text-foreground border-white/20 backdrop-blur-sm ${
                managedBy === "landlord" ? "border-green-500/50" : "border-blue-500/50"
              }`}
            >
              {managedBy === "landlord" ? "Landlord" : "Agency"}
            </Badge>
          )}
        </div>
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 hover:bg-white p-0 transform hover:scale-110 transition-all duration-200"
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </Button>
        
        {/* Price Tag */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur rounded-lg px-3 py-1 transform hover:scale-105 transition-all duration-200">
          <span className="font-bold text-primary">
            KSh {price.toLocaleString()}
            <span className="text-sm text-muted-foreground">/{priceType}</span>
          </span>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{title}</h3>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="font-medium text-sm">{rating}</span>
          <span className="text-muted-foreground text-sm ml-1">
            ({reviews} reviews)
          </span>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>
              {bedrooms === 0.5 ? 'Single' : 
               bedrooms === 0.75 ? 'Bedsitter' : 
               `${bedrooms} bed`}
            </span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{area} sqft</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-gradient-primary transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl" size="lg">
          {type === "rental" ? "View Details" : "Book Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;