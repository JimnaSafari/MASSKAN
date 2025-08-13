import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Home className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Masskan Murima</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/rentals" className="nav-link">
              Rentals
            </Link>
            <Link to="/office" className="nav-link">
              Office Space
            </Link>
            <Link to="/airbnb" className="nav-link">
              Airbnb
            </Link>
            <Link to="/movers" className="nav-link">
              Movers
            </Link>
            <Link to="/marketplace" className="nav-link">
              Marketplace
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/rentals">Find Property</Link>
            </Button>
            <Button asChild>
              <Link to="/marketplace">List Item</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="nav-link py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/rentals"
                className="nav-link py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Rentals
              </Link>
              <Link
                to="/office"
                className="nav-link py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Office Space
              </Link>
              <Link
                to="/airbnb"
                className="nav-link py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Airbnb
              </Link>
              <Link
                to="/movers"
                className="nav-link py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Movers
              </Link>
              <Link
                to="/marketplace"
                className="nav-link py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
                <Button variant="outline" asChild>
                  <Link to="/rentals" onClick={() => setIsMenuOpen(false)}>
                    Find Property
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/marketplace" onClick={() => setIsMenuOpen(false)}>
                    List Item
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;