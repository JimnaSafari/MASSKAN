/*
  # Create reviews and ratings tables

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `property_id` (uuid, references properties, nullable)
      - `marketplace_item_id` (uuid, references marketplace_items, nullable)
      - `moving_service_id` (uuid, references moving_services, nullable)
      - `rating` (integer, 1-5)
      - `comment` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on reviews table
    - Add policies for user access
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  marketplace_item_id uuid REFERENCES marketplace_items(id) ON DELETE CASCADE,
  moving_service_id uuid REFERENCES moving_services(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  -- Ensure only one item is reviewed
  CONSTRAINT single_review_target CHECK (
    (property_id IS NOT NULL AND marketplace_item_id IS NULL AND moving_service_id IS NULL) OR
    (property_id IS NULL AND marketplace_item_id IS NOT NULL AND moving_service_id IS NULL) OR
    (property_id IS NULL AND marketplace_item_id IS NULL AND moving_service_id IS NOT NULL)
  )
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Users can view all reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews
  FOR SELECT
  TO public
  USING (true);

-- Users can create their own reviews
CREATE POLICY "Users can create own reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_property_id ON reviews(property_id);
CREATE INDEX IF NOT EXISTS idx_reviews_marketplace_item_id ON reviews(marketplace_item_id);
CREATE INDEX IF NOT EXISTS idx_reviews_moving_service_id ON reviews(moving_service_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Create function to update average ratings
CREATE OR REPLACE FUNCTION update_property_rating()
RETURNS trigger AS $$
BEGIN
  UPDATE properties 
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews 
      WHERE property_id = COALESCE(NEW.property_id, OLD.property_id)
    ),
    reviews = (
      SELECT COUNT(*)
      FROM reviews 
      WHERE property_id = COALESCE(NEW.property_id, OLD.property_id)
    )
  WHERE id = COALESCE(NEW.property_id, OLD.property_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create function to update moving service ratings
CREATE OR REPLACE FUNCTION update_moving_service_rating()
RETURNS trigger AS $$
BEGIN
  UPDATE moving_services 
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews 
      WHERE moving_service_id = COALESCE(NEW.moving_service_id, OLD.moving_service_id)
    ),
    reviews = (
      SELECT COUNT(*)
      FROM reviews 
      WHERE moving_service_id = COALESCE(NEW.moving_service_id, OLD.moving_service_id)
    )
  WHERE id = COALESCE(NEW.moving_service_id, OLD.moving_service_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE OR REPLACE TRIGGER update_property_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE PROCEDURE update_property_rating();

CREATE OR REPLACE TRIGGER update_moving_service_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE PROCEDURE update_moving_service_rating();

