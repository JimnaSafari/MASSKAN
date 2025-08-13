/*
  # Create marketplace items table

  1. New Tables
    - `marketplace_items`
      - `id` (uuid, primary key)
      - `title` (text)
      - `price` (numeric)
      - `condition` (text)
      - `location` (text)
      - `image` (text, URL)
      - `category` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `marketplace_items` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS marketplace_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  price numeric NOT NULL,
  condition text NOT NULL,
  location text NOT NULL,
  image text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Marketplace items are viewable by everyone"
  ON marketplace_items
  FOR SELECT
  TO public
  USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_marketplace_items_category ON marketplace_items(category);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_location ON marketplace_items(location);