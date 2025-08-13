/*
  # Create properties table

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `location` (text)
      - `price` (numeric)
      - `price_type` (text, 'month' or 'night')
      - `rating` (numeric)
      - `reviews` (integer)
      - `bedrooms` (numeric)
      - `bathrooms` (numeric)
      - `area` (integer)
      - `image` (text, URL)
      - `type` (text, 'rental', 'airbnb', 'office')
      - `featured` (boolean)
      - `managed_by` (text, 'landlord' or 'agency')
      - `landlord_name` (text)
      - `landlord_verified` (boolean)
      - `agency_name` (text)
      - `agency_verified` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `properties` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL,
  price numeric NOT NULL,
  price_type text NOT NULL CHECK (price_type IN ('month', 'night')),
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  reviews integer DEFAULT 0,
  bedrooms numeric DEFAULT 0,
  bathrooms numeric DEFAULT 0,
  area integer DEFAULT 0,
  image text NOT NULL,
  type text NOT NULL CHECK (type IN ('rental', 'airbnb', 'office')),
  featured boolean DEFAULT false,
  managed_by text CHECK (managed_by IN ('landlord', 'agency')),
  landlord_name text,
  landlord_verified boolean DEFAULT false,
  agency_name text,
  agency_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Properties are viewable by everyone"
  ON properties
  FOR SELECT
  TO public
  USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);