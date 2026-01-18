-- Wedding website database schema

-- Guests table for RSVP information
CREATE TABLE guests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    rsvp_status VARCHAR(20) DEFAULT 'pending' CHECK (rsvp_status IN ('pending', 'attending', 'not_attending')),
    plus_one_count INTEGER DEFAULT 0,
    dietary_restrictions TEXT,
    special_requests TEXT,
    table_assignment INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wedding details table for dynamic content
CREATE TABLE wedding_details (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default wedding details
INSERT INTO wedding_details (key, value) VALUES 
('ceremony', '{"date": "2026-06-15", "time": "4:00 PM", "venue": "Beautiful Garden Venue", "address": "123 Wedding Street, City, State 12345"}'),
('reception', '{"date": "2026-06-15", "time": "6:00 PM", "venue": "Beautiful Garden Venue", "address": "123 Wedding Street, City, State 12345"}');

-- Create indexes for better performance
CREATE INDEX idx_guests_email ON guests(email);
CREATE INDEX idx_guests_rsvp_status ON guests(rsvp_status);
CREATE INDEX idx_wedding_details_key ON wedding_details(key);