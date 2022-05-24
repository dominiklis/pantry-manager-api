const pgPromise = require("pg-promise");
const { changeColorToCamelCase } = require("../utils");
const {
  Users,
  Products,
  ProductsLabels,
  Storages,
  UsersStorages,
  Labels,
  ShoppingLists,
  UsersShoppingLists,
  ShoppingListsItems,
} = require("./repos");

const replacePropertiesWithCamelized = (camelCaseName, originalName, data) => {
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    d[camelCaseName] = d[originalName];
    delete d[originalName];
  }

  return data;
};

const camelizeColorValues = (data) => {
  for (let i = 0; i < data.length; i++) {
    data[i]["color"] = changeColorToCamelCase(data[i]["color"]);
  }

  return data;
};

const camelizeColumns = (data) => {
  const tmp = data?.[0];

  if (tmp && typeof tmp === "object") {
    for (const prop in tmp) {
      if (prop === "color") camelizeColorValues(data);

      if (Array.isArray(tmp[prop])) {
        for (let i = 0; i < data.length; i++) {
          camelizeColumns(data[i][prop]);
        }
      }

      const camel = pgPromise.utils.camelize(prop);
      if (!(camel in tmp)) {
        replacePropertiesWithCamelized(camel, prop, data);
      }
    }
  }
};

const initOptions = {
  extend(obj, dc) {
    obj.users = new Users(obj, pgp);
    obj.products = new Products(obj, pgp);
    obj.labels = new Labels(obj, pgp);
    obj.productsLabels = new ProductsLabels(obj, pgp);
    obj.storages = new Storages(obj, pgp);
    obj.usersStorages = new UsersStorages(obj, pgp);
    obj.shoppingLists = new ShoppingLists(obj, pgp);
    obj.usersShoppingLists = new UsersShoppingLists(obj, pgp);
    obj.shoppingListItems = new ShoppingListsItems(obj, pgp);
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
