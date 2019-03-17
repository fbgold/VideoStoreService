module.exports = (connection, Sequelize) => {
    const Rental = connection.define('rental', {
        rental_id: {
            type: Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        rental_date: { type: Sequelize.DATE },
        inventory_id: { type: Sequelize.INTEGER },
        customer_id: { type: Sequelize.INTEGER },
        return_date: { type: Sequelize.DATE },
        staff_id: { type: Sequelize.INTEGER },
    },
    {
        freezeTableName: true,
        timestamps: false,
    })
    return Rental
}
