INSERT INTO booking(offer_id, start_date, end_date) VALUES(1, '20191101', '20191120');
INSERT INTO booking(offer_id, start_date, end_date) VALUES(1, '20191110', '20191115');
INSERT INTO booking(offer_id, start_date, end_date) VALUES(1, '20191105', '20191120');
INSERT INTO booking(offer_id, start_date, end_date) VALUES(1, '20191102', '20191109');
INSERT INTO booking(offer_id, start_date, end_date) VALUES(1, '20191106', '20191122');
INSERT INTO booking(offer_id, start_date, end_date) VALUES(1, '20191101', '20191110');
INSERT INTO booking(offer_id, start_date, end_date) VALUES(1, '20191110', '20191123');
INSERT INTO booking(offer_id, start_date, end_date) VALUES(1, '20191104', '20191108');
INSERT INTO booking(offer_id, start_date, end_date) VALUES(1, '20191109', '20191110');
INSERT INTO booking(offer_id, start_date, end_date) VALUES(1, '20191114', '20191119');
INSERT INTO booking(offer_id, start_date, end_date) VALUES(1, '20191111', '20191125');
INSERT INTO booking(offer_id, start_date, end_date) VALUES(1, '20191117', '20191124');

INSERT INTO booking(offer_id, start_date, end_date) VALUES(2, '20191101', '20191120');


--------------------------------------------------
-- Availability
--------------------------------------------------
   SELECT offer.offer_type, offer.qty - count(booking.offer_id) AS available
     FROM offer
LEFT JOIN booking  ON booking.offer_id = offer.id
                  AND booking.start_date <= '20191112'
                  AND booking.end_date >= '20191101'
    WHERE offer.location_id = '5f3543ae-3958-4966-b465-64715a8d0faf'
 GROUP BY offer.offer_type, offer.qty
   HAVING offer.qty - count(booking.offer_id) > 0


--------------------------------------------------
-- Booking
-- offer_id = 1
--------------------------------------------------

   -- Lock offer
   SELECT 1
     FROM offer
    WHERE id = 1
      FOR UPDATE

   -- Check availability
   SELECT offer.qty - count(booking.offer_id) AS numb
     FROM offer
LEFT JOIN booking  ON booking.offer_id = offer.id
                  AND booking.start_date <= '20191111'
                  AND booking.end_date >= '20191110'
    WHERE offer.id = 3
 GROUP BY offer.qty
   HAVING offer.qty - count(booking.offer_id) > 0

    -- Book
   INSERT INTO booking(offer_id, start_date, end_date) VALUES(1, '20191117', '20191124');

    -- Commit
   COMMIT