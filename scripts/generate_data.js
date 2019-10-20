const fs = require('fs');
const json = require('./locations.json');
const countries = new Map();
const locations = new Map();

json.data.locations.forEach(location => {
  countries.set(location.country.id, location.country.value);
  locations.set(location.id, { country: location.country.id, title: location.name });
});

const ws = fs.createWriteStream('data.sql');

countries.forEach((name, id) => {
  ws.write(`INSERT INTO country(id, title) VALUES('${id}', '${name}');\n`);
});

ws.write('----------------------------------------------\n');
locations.forEach((location, id) => {
  ws.write(`INSERT INTO location(id, country_id, title) VALUES('${id}', '${location.country}', '${location.title}');\n`);
});

ws.write('----------------------------------------------\n');
locations.forEach((location, locationId) => {
    ws.write(`INSERT INTO offer (location_id, offer_type, price, qty) VALUES ('${locationId}', 'Dorm', 10, 3);\n`);
    ws.write(`INSERT INTO offer (location_id, offer_type, price, qty) VALUES ('${locationId}', 'Private', 20, 3);\n`);
    ws.write(`INSERT INTO offer (location_id, offer_type, price, qty) VALUES ('${locationId}', 'Deluxe', 30, 3);\n`);
});
ws.end();
