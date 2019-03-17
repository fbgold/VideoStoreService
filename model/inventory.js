module.exports = (connection, Sequelize) => {
    const Country = connection.define('country', {
        inventory_id: {
            type: Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        film_id: { type: Sequelize.INTEGER },
        store_id: { type: Sequelize.INTEGER },
    },
    {
        freezeTableName: true,
        timestamps: false,
    })
    return Country
}
