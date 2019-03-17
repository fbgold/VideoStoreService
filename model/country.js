module.exports = (connection, Sequelize) => {
    const Country = connection.define('country', {
        country_id: {
            type: Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        country: { type: Sequelize.STRING },
    },
    {
        freezeTableName: true,
        timestamps: false,
    })
    return Country
}
