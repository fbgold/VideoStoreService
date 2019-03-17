const env = require('./env.js');

const Sequelize = require('sequelize');
const connection = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.connection = connection;

db.actor = require('../model/actor.js')(connection, Sequelize);
db.address = require('../model/address.js')(connection, Sequelize);
db.category = require('../model/category')(connection, Sequelize);
db.city = require('../model/city.js')(connection, Sequelize);
db.country = require('../model/country.js')(connection, Sequelize);
db.inventory = require('../model/inventory.js')(connection, Sequelize);
db.movie = require('../model/movie.js')(connection, Sequelize);
db.MovieActor   = require('../model/movieActor')(connection, Sequelize);
db.MovieCategory = require('../model/MovieCategory')(connection, Sequelize);
db.payment = require('../model/payment.js')(connection, Sequelize);
db.rental = require('../model/rental.js')(connection, Sequelize);
db.staff = require('../model/staff.js')(connection, Sequelize);
db.store = require('../model/store.js')(connection, Sequelize);

/*    Associations    */
db.movie.belongsToMany(db.actor,{as: 'Actors', through: db.MovieActor, foreignKey: 'film_id', otherKey: 'actor_id'});
db.movie.belongsToMany(db.category,{as: 'Category', through: db.MovieCategory, foreignKey: 'film_id', otherKey: 'category_id'});

db.store.belongsTo(db.address,{as: 'Address', foreignKey: 'address_id'});
db.store.belongsTo(db.staff,{as: 'Manager', foreignKey: 'manager_staff_id'});

db.staff.belongsTo(db.address, {as: 'Address', foreignKey: 'address_id'});

db.address.belongsTo(db.city, {as: 'City', foreignKey: 'city_id'});
db.city.belongsTo(db.country, {as: 'Country', foreignKey: 'country_id'});
db.rawQuery = {
              getStates: "select distinct adr.district from address adr " +
              "join city cit " +
              "on cit.city_id = adr.city_id " +
              "where cit.country_id= :countryCode " +
              "order by adr.district asc",

              getCities: "select adr.city_id,cit.city from address adr " +
              "join city cit " +
              "on adr.city_id = cit.city_id " +
              "where adr.district = :stateName;"
}

module.exports = db;