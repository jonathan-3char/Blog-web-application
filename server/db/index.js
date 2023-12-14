import pg from "pg";

const pool = new pg.Pool();

const makeTable =
  "CREATE TABLE IF NOT EXISTS \
  blog_accounts \
  (id serial NOT NULL, \
  username varchar(100) NOT NULL, \
  display_name varchar(100) NOT NULL, \
  email varchar(150) NOT NULL, \
  password varchar(100) NOT NULL, \
  PRIMARY KEY (username, id))";

try {
  await pool.query(makeTable);
} catch (err) {
  console.error(err);
}

export const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

export const getClient = () => {
  return pool.connect();
};
