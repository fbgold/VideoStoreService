module.exports = (connection, Sequelize) => {
    const Actor = connection.define('actor', {
        actor_id: {
            type: Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        first_name: { type: Sequelize.STRING },
        last_name: { type: Sequelize.STRING },
    },
    {
        freezeTableName: true,
        timestamps: false,
    })
    return Actor
}

