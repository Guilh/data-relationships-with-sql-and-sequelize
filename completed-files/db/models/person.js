'use strict';

module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Person.associate = (models) => {
    /**
     * This is the "many" side of the movie director one-to-many
     * relationship between the Person and Movie models. Because
     * we gave the foreign key in the Person model a custom name
     * we need to reference our custom name here too so that
     * Sequelize can create the proper association. If we don't
     * do this, Sequelize won't understand the association and
     * will add a `PersonId` column to the `People` table
     * (the table for the `Person` model).
     *
     * Note: In order to control the nullability of the `directorPersonId`
     * property both sides of the association need to have the same
     * configuration, otherwise you could encounter unexpected results.
     */

    Person.hasMany(models.Movie, {
      as: 'director',
      foreignKey: {
        fieldName: 'directorPersonId',
        field: 'directorPersonId',
        allowNull: false,
      },
    });

    /**
     * This is the other side of the actors many-to-many relationship
     * between the Person and Movie models. Both sides of the association
     * are defined in the same way.
     */

    Person.belongsToMany(models.Movie, {
      as: 'actor',
      through: 'MovieActors',
      foreignKey: 'personId',
      otherKey: 'movieId',
    });
  };

  return Person;
};
