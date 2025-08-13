/*
  # Populate initial data

  1. Insert sample properties data
  2. Insert sample marketplace items data
  3. Insert sample moving services data
*/

-- Insert properties data
INSERT INTO properties (title, location, price, price_type, rating, reviews, bedrooms, bathrooms, area, image, type, featured, managed_by, landlord_name, landlord_verified, agency_name, agency_verified) VALUES
-- Rental Properties
('Single Room in South B', 'South B, Nairobi', 15000, 'month', 4.2, 18, 0.5, 1, 200, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', 'rental', false, 'landlord', 'John Kamau', true, null, null),
('Cozy Bedsitter in Kasarani', 'Kasarani, Nairobi', 25000, 'month', 4.3, 22, 0.75, 1, 350, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop', 'rental', false, 'agency', null, null, 'Prime Properties Ltd', true),
('Modern 1BR Apartment in Kileleshwa', 'Kileleshwa, Nairobi', 45000, 'month', 4.6, 31, 1, 1, 500, 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop', 'rental', true, 'landlord', 'Sarah Wanjiku', true, null, null),
('Spacious 2BR in Westlands', 'Westlands, Nairobi', 65000, 'month', 4.7, 28, 2, 2, 800, 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop', 'rental', false, 'agency', null, null, 'Elite Real Estate', true),
('Beautiful 3BR Apartment in Kilimani', 'Kilimani, Nairobi', 95000, 'month', 4.8, 24, 3, 2, 1200, 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=300&fit=crop', 'rental', false, 'landlord', 'David Ochieng', false, null, null),
('Luxury 4BR Family Home in Karen', 'Karen, Nairobi', 180000, 'month', 4.9, 15, 4, 3, 2200, 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop', 'rental', true, 'agency', null, null, 'Luxury Homes Kenya', true),
('Executive 5BR Villa in Runda', 'Runda, Nairobi', 320000, 'month', 4.9, 12, 5, 4, 3500, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop', 'rental', false, 'landlord', 'Grace Muthoni', true, null, null),
('Premium 6BR Mansion in Muthaiga', 'Muthaiga, Nairobi', 450000, 'month', 5.0, 8, 6, 5, 5000, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop', 'rental', false, 'agency', null, null, 'Premium Properties Group', true),

-- Airbnb Properties
('Cozy Studio in Westlands', 'Westlands, Nairobi', 5500, 'night', 4.8, 42, 1, 1, 350, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', 'airbnb', true, null, null, null, null, null),
('Modern Apartment in Kilimani', 'Kilimani, Nairobi', 8000, 'night', 4.9, 38, 2, 2, 600, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop', 'airbnb', false, null, null, null, null, null),
('Luxury Villa in Karen', 'Karen, Nairobi', 25000, 'night', 5.0, 15, 4, 3, 2500, '/lovable-uploads/8db843f4-34b6-4d6b-a426-2c4865fca5eb.png', 'airbnb', true, null, null, null, null, null),
('Mountain View Lodge in Nanyuki', 'Nanyuki, Laikipia', 12000, 'night', 4.7, 28, 3, 2, 1200, 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop', 'airbnb', false, null, null, null, null, null),
('Peaceful Retreat in Nyeri', 'Nyeri Town, Nyeri', 7500, 'night', 4.6, 22, 2, 2, 800, 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=300&fit=crop', 'airbnb', false, null, null, null, null, null),
('Scenic Cottage in Meru', 'Meru Town, Meru', 6000, 'night', 4.5, 19, 2, 1, 650, 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop', 'airbnb', false, null, null, null, null, null),

-- Office Properties
('Modern Co-working Space', 'Westlands, Nairobi', 40000, 'month', 4.6, 21, 0, 2, 600, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', 'office', false, null, null, null, null, null),
('Grade A Office Floor', 'Upper Hill, Nairobi', 250000, 'month', 4.8, 14, 0, 4, 2500, 'https://images.unsplash.com/photo-1507209696998-3c532be9b2b4?w=800&h=600&fit=crop', 'office', true, null, null, null, null, null),
('Private Office Suite', 'Kilimani, Nairobi', 120000, 'month', 4.7, 9, 0, 2, 1200, 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop', 'office', false, null, null, null, null, null);

-- Insert marketplace items data
INSERT INTO marketplace_items (title, price, condition, location, image, category) VALUES
('Modern 3-Seater Sofa', 25000, 'Excellent', 'Westlands, Nairobi', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop', 'Furniture'),
('Samsung 55" Smart TV', 45000, 'Like New', 'Karen, Nairobi', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop', 'Electronics'),
('MacBook Pro 2021', 120000, 'Good', 'Kilimani, Nairobi', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop', 'Electronics'),
('Dining Table Set', 18000, 'Good', 'Kileleshwa, Nairobi', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop', 'Furniture');

-- Insert moving services data
INSERT INTO moving_services (name, rating, reviews, location, services, price_range, verified, image) VALUES
('QuickMove Kenya', 4.8, 156, 'Nairobi, Kenya', '["Local Moving", "Long Distance", "Packing"]', 'KSh 5,000 - 25,000', true, 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop'),
('Reliable Movers Ltd', 4.9, 203, 'Nairobi & Mombasa', '["International", "Storage", "Insurance"]', 'KSh 8,000 - 50,000', true, 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop'),
('Express Movers', 4.7, 98, 'Kisumu, Nakuru', '["Same Day", "Office Moving", "Fragile Items"]', 'KSh 3,000 - 15,000', true, 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop');