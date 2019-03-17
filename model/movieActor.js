module.exports = (connection, Sequelize) => {
    const MovieActor = connection.define('film_actor',{
        film_id:{
            type:Sequelize.INTEGER,
            primaryKey: true
        },
        actor_id:{
            type:Sequelize.INTEGER,
            primaryKey: true
        },
     },
    {
        freezeTableName: true,
        timestamps: false,  
    })
    return MovieActor
}


