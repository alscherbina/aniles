DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS offer;
DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS country;

CREATE TABLE country (
  id char(2) PRIMARY KEY,
  title VARCHAR(128)
);
CREATE TABLE location (
  id UUID PRIMARY KEY,
  country_id char(2) NOT NULL,
  title VARCHAR(256),
  CONSTRAINT fk_location_country FOREIGN KEY (country_id) REFERENCES country(id) ON DELETE RESTRICT
);
CREATE TABLE offer (
  id SERIAL PRIMARY KEY,
  location_id UUID NOT NULL,
  offer_type VARCHAR(64),
  price MONEY,
  qty INTEGER NOT NULL,
  CONSTRAINT fk_offer_location FOREIGN KEY (location_id) REFERENCES location(id) ON DELETE RESTRICT,
  CONSTRAINT unique_location_offer_type UNIQUE(location_id, offer_type)
);
CREATE TABLE booking (
  id SERIAL PRIMARY KEY,
  offer_id INTEGER NOT NULL,
  start_date DATE,
  end_date DATE,
  CONSTRAINT valid_time_period CHECK (start_date < end_date),
  CONSTRAINT fk_booking_offer FOREIGN KEY (offer_id) REFERENCES offer(id) ON DELETE RESTRICT
);

CREATE INDEX booking_offer_id ON booking ( offer_id );
CREATE INDEX booking_start_date ON booking ( start_date );
CREATE INDEX booking_end_date ON booking ( end_date );
