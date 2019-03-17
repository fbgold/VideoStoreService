module.exports = (connection, Sequelize) => {
    const City = connection.define('city', {
        city_id: {
            type: Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        city: { type: Sequelize.STRING },
        country_id: { type: Sequelize.INTEGER },
    },
    {
        freezeTableName: true,
        timestamps: false,
    })
    return City
}
