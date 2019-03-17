module.exports = (connection, Sequelize) => {
    const Store = connection.define('store', {
        store_id: {
            type: Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        manager_staff_id: { type: Sequelize.INTEGER },
        address_id: { type: Sequelize.INTEGER },
    },
    {
        freezeTableName: true,
        timestamps: false,
    })
    return Store
}
