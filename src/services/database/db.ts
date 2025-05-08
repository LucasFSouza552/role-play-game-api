import knex from 'knex';
import knexConfig from '../../config/knexfile';

const db = knex(knexConfig);

db.raw('SELECT 1+1 AS result')
  .then((result) => {
    console.log('Conexão bem-sucedida!', result);
  })
  .catch((err) => {
    console.error('Erro na conexão:', err);
  });

export default db;
