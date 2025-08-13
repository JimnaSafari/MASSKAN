/*
  # Create moving services table

  1. New Tables
    - `moving_services`
      - `id` (uuid, primary key)
      - `name` (text)
      - `rating` (numeric)
      - `reviews` (integer)
      - `location` (text)
      - `services` (jsonb, array of service types)
      - `price_range` (text)
      - `verified` (boolean)
      - `image` (text, URL)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `moving_services` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS moving_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  reviews integer DEFAULT 0,
  location text NOT NULL,
  services jsonb NOT NULL DEFAULT '[]'::jsonb,
  price_range text NOT NULL,
  verified boolean DEFAULT false,
  image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE moving_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Moving services are viewable by everyone"
  ON moving_services
  FOR SELECT
  TO public
  USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_moving_services_verified ON moving_services(verified);
CREATE INDEX IF NOT EXISTS idx_moving_services_location ON moving_services(location);