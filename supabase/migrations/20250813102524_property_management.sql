/*
  # Create property ownership and management tables

  1. New Tables
    - `property_owners`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `owner_id` (uuid, references user_profiles)
      - `ownership_type` (text, 'owner', 'agent')
      - `commission_rate` (numeric, for agents)
      - `created_at` (timestamp)

    - `property_images`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `image_url` (text)
      - `is_primary` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for user access
*/

CREATE TABLE IF NOT EXISTS property_owners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  owner_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  ownership_type text NOT NULL CHECK (ownership_type IN ('owner', 'agent')),
  commission_rate numeric CHECK (commission_rate >= 0 AND commission_rate <= 100),
  created_at timestamptz DEFAULT now(),
  UNIQUE(property_id, owner_id)
);

CREATE TABLE IF NOT EXISTS property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE property_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

-- Property owners policies
CREATE POLICY "Property owners are viewable by everyone"
  ON property_owners
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Property owners can manage their properties"
  ON property_owners
  FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

-- Property images policies
CREATE POLICY "Property images are viewable by everyone"
  ON property_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Property owners can manage their property images"
  ON property_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM property_owners 
      WHERE property_id = property_images.property_id 
      AND owner_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_property_owners_property_id ON property_owners(property_id);
CREATE INDEX IF NOT EXISTS idx_property_owners_owner_id ON property_owners(owner_id);
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_property_images_primary ON property_images(is_primary);

-- Function to ensure only one primary image per property
CREATE OR REPLACE FUNCTION ensure_single_primary_image()
RETURNS trigger AS $$
BEGIN
  IF NEW.is_primary = true THEN
    UPDATE property_images 
    SET is_primary = false 
    WHERE property_id = NEW.property_id AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to ensure single primary image
CREATE OR REPLACE TRIGGER ensure_single_primary_image_trigger
  BEFORE INSERT OR UPDATE ON property_images
  FOR EACH ROW EXECUTE PROCEDURE ensure_single_primary_image();

