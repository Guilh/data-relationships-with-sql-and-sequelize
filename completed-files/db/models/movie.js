'use strict';

module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Movie.associate = (models) => {
    /**
     * By default, when defining a one-to-many relationship,
     * Sequelize will name the foreign key property
     * using the pattern `[ModelName][PrimaryKeyName]`,
     * so the foreign key property for the movie's director
     * would be named `personId`.
     *
     * We can configure the model name portion using the `as` options property:
     *
     * `Movie.belongsTo(models.Person, { as: 'directorPerson' });`
     *
     * Or we can use the `foreignKey` options property:
     *
     * `Movie.belongsTo(models.Person, { foreignKey: 'directorPersonId' });`
     *
     * The `foreignKey` options property can also accept
     * an object, giving you more control over the definition
     * of the foreign key property:
     *
     * ```javascript
     * Movie.belongsTo(models.Person, {
     *   foreignKey: {
     *     field: 'directorPersonId',
     *     allowNull: false,
     *   },
     * });
     * ```
     *
     * The above configuration configures the `directorPersonId`
     * property to not allow nulls.
     */

    Movie.belongsTo(models.Person, {
      as: 'director',
      foreignKey: {
        fieldName: 'directorPersonId',
        field: 'directorPersonId',
        allowNull: false,
      },
      /**
       * Adding this option configures the database
       * to delete any rows in the Movies table when
       * a referenced row in the People table is deleted.
       */
      onDelete: 'cascade',
    });

    /**
     * When defining a many-to-many relationship,
     * we can use the `through` options property to
     * specify the name of the link or bridge table.
     */

    Movie.belongsToMany(models.Person, {
      as: 'actors',
      through: 'MovieActors',
      foreignKey: 'movieId',
      otherKey: 'personId',
    });
  };

  return Movie;
};
