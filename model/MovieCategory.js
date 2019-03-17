module.exports = (connection, Sequelize) => {
    const MovieCategory = connection.define('film_category',{
        film_id:{
            type:Sequelize.INTEGER,
            primaryKey: true
        },
        category_id:{
            type:Sequelize.INTEGER,
            primaryKey: true
        },
     },
    {
        freezeTableName: true,
        timestamps: false,  
    })
    return MovieCategory
}

