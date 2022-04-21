const pgPromise = require("pg-promise");
const { Users, Products, Storages, UsersStorages } = require("./repos");

const camelizeColumns = (data) => {
  const tmp = data[0];
  for (const prop in tmp) {
    const camel = pgp.utils.camelize(prop);
    if (!(camel in tmp)) {
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
};

const initOptions = {
  extend(obj, dc) {
    obj.users = new Users(obj, pgp);
    obj.products = new Products(obj, pgp);
    obj.storages = new Storages(obj, pgp);
    obj.usersStorages = new UsersStorages(obj, pgp);
  },

  receive(data, result, e) {
    camelizeColumns(data);
  },
};

const pgp = pgPromise(initOptions);

const config = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const db = pgp(config);

module.exports = {
  db,
  helpers: pgp.helpers,
};
