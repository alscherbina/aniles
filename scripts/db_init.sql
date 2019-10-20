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
  CONSTRAINT fk_booking_offer FOREIGN KEY (offer_id) REFERENCES offer(id) ON DELETE RESTRICT
);

CREATE INDEX booking_offer_id ON booking ( offer_id );
CREATE INDEX booking_start_date ON booking ( start_date );
CREATE INDEX booking_end_date ON booking ( end_date );
/*
CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  type VARCHAR(24) NOT NULL,
  url VARCHAR(512) NOT NULL UNIQUE,
  schedule VARCHAR(32) NOT NULL,
  title VARCHAR(256),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  creation_date TIMESTAMPTZ DEFAULT NOW(TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE journal (
    task_id INTEGER NOT NULL,
    execution_date TIMESTAMPTZ DEFAULT NOW(),
    result VARCHAR(256),
    CONSTRAINT unique_journal_record UNIQUE(task_id, execution_date),
    CONSTRAINT fk_journal_task FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE
  )
  INSERT INTO
    public.task (
      type,
      url,
      schedule,
      title
    )
  VALUES(
      'rozetka',
      'https://hard.rozetka.com.ua/dell_210_anvr/p41964776/',
      '0 0/5 * 1/1 * ? *',
      'Монитор 34" Dell P3418HW '
    );
*/