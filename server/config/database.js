import pg from "pg";

const pool = new pg.Pool();

const makeTable =
  "CREATE TABLE IF NOT EXISTS blog_accounts \
  (id SERIAL NOT NULL, \
  username VARCHAR(100) NOT NULL, \
  display_name VARCHAR(100) NOT NULL, \
  email VARCHAR(150) NOT NULL, \
  password VARCHAR(100) NOT NULL, \
  PRIMARY KEY (username, id))";

try {
  await pool.query(makeTable);
} catch (err) {
  console.error(err);
}

export const query = async (text, params, callback) => {
  return pool.query(text, params, callback);
};

export const getClient = () => {
  return pool.connect();
};
