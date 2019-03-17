module.exports = (connection, Sequelize) => {
    const Movie = connection.define('film', {
        film_id: {
            type: Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        title: { type: Sequelize.TEXT },
        description: { type: Sequelize.TEXT },
        rating: { type: Sequelize.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17') },
    },
    {
        freezeTableName: true,
        timestamps: false,
    })
	return Movie;

}


