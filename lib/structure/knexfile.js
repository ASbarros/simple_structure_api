module.exports = {
    //TODO: your configurations 
    client: '',
    connection: {
      host: '',
      database: '',
      user: '',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  
  };