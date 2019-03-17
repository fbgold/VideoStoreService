module.exports = (connection, Sequelize) => {
    const Category = connection.define('category', {
        category_id: {
            type: Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        name: { type: Sequelize.TEXT },
    },
    {
        freezeTableName: true,
        timestamps: false,
    })
	return Category;
}
