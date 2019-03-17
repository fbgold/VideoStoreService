module.exports = (connection, Sequelize) => {
    const Staff = connection.define('staff', {
        staff_id: {
            type: Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        first_name: { type: Sequelize.STRING },
        last_name: { type: Sequelize.STRING },
        address_id: { type: Sequelize.INTEGER },
        email: { type: Sequelize.STRING },
        store_id: { type: Sequelize.INTEGER },
        active: { type: Sequelize.INTEGER },
        username: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },

    },
    {
        freezeTableName: true,
        timestamps: false,
    })
    return Staff
}
