module.exports = (connection, Sequelize) => {
    const Address = connection.define('address', {
        address_id: {
            type: Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        address: { type: Sequelize.STRING },
        city_id: { type: Sequelize.INTEGER },
        district: { type: Sequelize.STRING },
        postal_code: { type: Sequelize.STRING },
        phone: { type: Sequelize.STRING },
    },
    {
        freezeTableName: true,
        timestamps: false,
    })
    return Address
}
