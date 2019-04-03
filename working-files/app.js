'use strict';

const { sequelize, models } = require('./db');

// Get references to our models.
const { Person, Movie } = models;

// Define variables for the people and movies.
// NOTE: We'll use these variables to assist with the creation
// of our related data after we've defined the relationships
// (or associations) between our models.
let bradBird;
let vinDiesel;
let eliMarienthal;
let craigTNelson;
let hollyHunter;
let theIronGiant;
let theIncredibles;

console.log('Testing the connection to the database...');

// Test the connection to the database.
sequelize
  .authenticate()
  .then(() => {
    console.log('Synchronizing the models with the database...');

    return sequelize.sync();
  })
  .then(() => {
    console.info('Adding people to the database...');

    return Promise.all([
      Person.create({
        firstName: 'Brad',
        lastName: 'Bird',
      }),
      Person.create({
        firstName: 'Vin',
        lastName: 'Diesel',
      }),
      Person.create({
        firstName: 'Eli',
        lastName: 'Marienthal',
      }),
      Person.create({
        firstName: 'Craig T.',
        lastName: 'Nelson',
      }),
      Person.create({
        firstName: 'Holly',
        lastName: 'Hunter',
      }),
    ]);
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));

    // Update the global variables for the people instances.
    [bradBird, vinDiesel, eliMarienthal, craigTNelson, hollyHunter] = data;

    console.log('Adding movies to the database...');

    // TODO Include the related person who directed each movie.

    return Promise.all([
      Movie.create({
        title: 'The Iron Giant',
        releaseYear: 1999,
        directorPersonId: bradBird.id,
      }),
      Movie.create({
        title: 'The Incredibles',
        releaseYear: 2004,
        directorPersonId: bradBird.id,
      }),
    ]);
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));

    // Update the global variables for the movie instances.
    [theIronGiant, theIncredibles] = data;

    // TODO Create the data for each movie's actors.

    return Promise.resolve();
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));

    // TODO Update this query to include any related data.

    return Movie.findAll({
      include: [
        {
          model: Person,
          as: 'director',
        },
      ],
    });
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));

    return Person.findAll({
      include: [
        {
          model: Movie,
          as: 'director',
        },
      ],
    });
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));

    process.exit();
  })
  .catch(err => console.error(err));
