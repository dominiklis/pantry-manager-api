class ProductsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async findById(userId, productId) {
    return this.db.oneOrNone(
      `SELECT DISTINCT pd.* FROM  products pd
        LEFT JOIN users_storages ust ON pd.storage_id=ust.storage_id
          WHERE pd.product_id=$2 AND (pd.owner_id=$1 OR ust.user_id=$1)`,
      [userId, productId]
    );
  }

  async get(userId) {
    return this.db.manyOrNone(
      `SELECT DISTINCT pd.*, selected_labels.labels FROM products pd
        LEFT JOIN users_storages ust ON pd.storage_id=ust.storage_id
        LEFT JOIN (
          SELECT lbls.product_id, ARRAY_AGG(lbls.label_id) AS labels FROM (
            SELECT ls.label_id, pl.product_id FROM labels ls
              LEFT JOIN products_labels pl ON pl.label_id=ls.label_id 
                WHERE ls.owner_id=$1
          ) AS lbls GROUP BY lbls.product_id
        ) AS selected_labels ON pd.product_id=selected_labels.product_id
          WHERE pd.owner_id=$1 OR ust.user_id=$1;`,
      [userId]
    );
  }

  async create(userId, productName, expirationDate, amount, storageId) {
    return this.db.oneOrNone(
      `INSERT INTO products(
        owner_id, product_name, expiration_date, amount, storage_id) 
          VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [userId, productName, expirationDate, amount, storageId]
    );
  }

  async edit(productId, productName, expirationDate, amount, storageId) {
    return this.db.oneOrNone(
      `UPDATE products SET
        product_name=$2,
        expiration_date=$3,
        amount=$4,
        storage_id=$5
          WHERE product_id=$1 RETURNING *`,
      [productId, productName, expirationDate, amount, storageId]
    );
  }

  async remove(productId) {
    return this.db.oneOrNone(
      `DELETE FROM products WHERE product_id=$1 RETURNING *`,
      [productId]
    );
  }

  async removeProductsInStorage(storageId) {
    return this.db.none(`DELETE FROM products WHERE storage_id=$1`, [
      storageId,
    ]);
  }
}

module.exports = ProductsRepository;
