import pg from "pg";

const pool = new pg.Pool();

const makeTable =
  "CREATE TABLE IF NOT EXISTS blog_accounts \
  (id SERIAL NOT NULL UNIQUE, \
  username VARCHAR(100) NOT NULL UNIQUE, \
  display_name VARCHAR(100) NOT NULL, \
  email VARCHAR(150) NOT NULL, \
  password VARCHAR(100) NOT NULL, \
  PRIMARY KEY (username, id))";
const makeBlogTable =
  "CREATE TABLE IF NOT EXISTS blogs \
  (id VARCHAR(22) NOT NULL, \
  author VARCHAR(100) NOT NULL, \
  title VARCHAR(100) NOT NULL, \
  content TEXT NOT NULL, \
  PRIMARY KEY (id), \
  CONSTRAINT fk_author \
  FOREIGN KEY(author) \
  REFERENCES blog_accounts(username))";

try {
  await pool.query(makeTable);
  await pool.query(makeBlogTable);
} catch (err) {
  console.error(err);
}

export const query = async (text, params, callback) => {
  return pool.query(text, params, callback);
};

export const getClient = () => {
  return pool.connect();
};
