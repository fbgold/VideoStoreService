const env = {
  database: 'sakila',
  username: 'root',
  password: '1Plokijuh',
  host: 'sakila.cu2ri2zgi9gr.us-west-1.rds.amazonaws.com',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;