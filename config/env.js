const env = {
  database: 'sakila',
  username: 'root',
  password: '1Plokijuh',
  //host: 'localhost',
  host: 'sakila.cu2ri2zgi9gr.us-west-1.rds.amazonaws.com',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 1,
    //acquire: 30000,
    acquire: 300000,
    //idle: 10000
    idle: 100000
  }
};

module.exports = env;