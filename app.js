'use strict';

const { sequelize, models } = require('./db');

// Get references to our models.
const { Person, Movie } = models;

// Define variables for the people and movies.
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

    // return Person.bulkCreate([
    //   {
    //     firstName: 'Brad',
    //     lastName: 'Bird',
    //   },
    //   {
    //     firstName: 'Vin',
    //     lastName: 'Diesel',
    //   },
    //   {
    //     firstName: 'Eli',
    //     lastName: 'Marienthal',
    //   },
    //   {
    //     firstName: 'Craig T.',
    //     lastName: 'Nelson',
    //   },
    //   {
    //     firstName: 'Holly',
    //     lastName: 'Hunter',
    //   },
    // ]);

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

    // NOTE: If the instances for the `actors` association are new
    // then we can add them at the same time as we add the
    // movie, but since our actors have already been inserted
    // into the database, we need to use the following approach.

    // Instance methods added to manage the many-to-many relationship.

    console.log(theIronGiant.addActor);
    console.log(theIronGiant.addActors);

    // console.log(theIronGiant.countActor);
    console.log(theIronGiant.countActors);

    console.log(theIronGiant.createActor);
    // console.log(theIronGiant.createActors);

    // console.log(theIronGiant.getActor);
    console.log(theIronGiant.getActors);

    console.log(theIronGiant.hasActor);
    console.log(theIronGiant.hasActors);

    console.log(theIronGiant.removeActor);
    console.log(theIronGiant.removeActors);

    // console.log(theIronGiant.setActor);
    console.log(theIronGiant.setActors);

    // const p1a = theIronGiant.addActor(vinDiesel);
    // const p1b = theIronGiant.addActor(eliMarienthal);

    const p1c = theIronGiant.addActors([vinDiesel, eliMarienthal]);

    // const p1 = theIronGiant.setActors([
    //   vinDiesel,
    //   eliMarienthal,
    // ]);

    const p2 = theIncredibles.setActors([
      craigTNelson,
      hollyHunter,
    ]);

    return Promise.all([
      p1c,
      p2,
    ]);
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));

    return Movie.findAll({
      // attributes: ['id', 'title', 'releaseYear'],
      include: [
        {
          model: Person,
          as: 'director',
        },
        {
          model: Person,
          as: 'actors',
          // attributes: ['firstName', 'lastName'],
          through: {
            // this removes the through model properties from being included
            attributes: [],
          },
        },
      ],
    });
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));

    return Person.findAll({
      // attributes: ['id', 'firstName', 'lastName'],
      include: [
        {
          model: Movie,
          as: 'director',
          attributes: ['id', 'title', 'releaseYear'],
        },
        {
          model: Movie,
          as: 'actor',
          attributes: ['id', 'title', 'releaseYear'],
          through: {
            // this removes the through model properties from being included
            attributes: [],
          },
        },
      ],
    });
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));

    process.exit();
  })
  .catch(err => console.error(err));
