/*
  # Create bookings and reservations tables

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `property_id` (uuid, references properties)
      - `check_in_date` (date)
      - `check_out_date` (date)
      - `total_price` (numeric)
      - `status` (text, 'pending', 'confirmed', 'cancelled', 'completed')
      - `payment_status` (text, 'pending', 'paid', 'refunded')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `moving_bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `service_id` (uuid, references moving_services)
      - `booking_date` (date)
      - `from_address` (text)
      - `to_address` (text)
      - `estimated_price` (numeric)
      - `status` (text, 'pending', 'confirmed', 'cancelled', 'completed')
      - `payment_status` (text, 'pending', 'paid', 'refunded')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for user access
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  check_in_date date NOT NULL,
  check_out_date date NOT NULL,
  total_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (check_out_date > check_in_date)
);

CREATE TABLE IF NOT EXISTS moving_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES moving_services(id) ON DELETE CASCADE,
  booking_date date NOT NULL,
  from_address text NOT NULL,
  to_address text NOT NULL,
  estimated_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE moving_bookings ENABLE ROW LEVEL SECURITY;

-- Booking policies
CREATE POLICY "Users can view own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Moving booking policies
CREATE POLICY "Users can view own moving bookings"
  ON moving_bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own moving bookings"
  ON moving_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own moving bookings"
  ON moving_bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_property_id ON bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_moving_bookings_user_id ON moving_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_moving_bookings_service_id ON moving_bookings(service_id);
CREATE INDEX IF NOT EXISTS idx_moving_bookings_status ON moving_bookings(status);

