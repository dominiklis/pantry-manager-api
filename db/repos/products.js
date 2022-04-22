class ProductsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async findById(userId, productId) {
    return this.db.oneOrNone(
      `SELECT pd.* FROM  products pd
        LEFT JOIN users_storages ust ON pd.storage_id=ust.storage_id
          WHERE pd.product_id=$2 AND (pd.owner_id=$1 OR ust.user_id=$1)`,
      [userId, productId]
    );
  }

  async get(userId) {
    return this.db.manyOrNone(
      `SELECT DISTINCT pd.* FROM  products pd
        LEFT JOIN users_storages ust ON pd.storage_id=ust.storage_id
          WHERE pd.owner_id=$1 OR ust.user_id=$1`,
      [userId]
    );
  }

  async create(userId, productName, expirationDate, quantity, unit, storageId) {
    return this.db.oneOrNone(
      `INSERT INTO products(
        owner_id, product_name, expiration_date, quantity, unit, storage_id) 
          VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      [userId, productName, expirationDate, quantity, unit, storageId]
    );
  }

  async edit(
    productId,
    productName,
    expirationDate,
    quantity,
    unit,
    storageId
  ) {
    return this.db.oneOrNone(
      `UPDATE products SET
        product_name=$2,
        expiration_date=$3,
        quantity=$4,
        unit=$5,
        storage_id=$6
          WHERE product_id=$1 RETURNING *`,
      [productId, productName, expirationDate, quantity, unit, storageId]
    );
  }

  async remove(productId) {
    return this.db.oneOrNone(
      `DELETE FROM products WHERE product_id=$1 RETURNING *`,
      [productId]
    );
  }
}

module.exports = ProductsRepository;
