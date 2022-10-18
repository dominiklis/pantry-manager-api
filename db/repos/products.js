class ProductsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async findById(productId) {
    return this.db.oneOrNone(`SELECT * FROM  products WHERE product_id=$1;`, [
      productId,
    ]);
  }

  async get(userId) {
    return this.db.manyOrNone(
      `SELECT products.*, selected_labels.labels FROM users_storages
        LEFT JOIN storages ON users_storages.storage_id=storages.storage_id
        LEFT JOIN products ON storages.storage_id=products.storage_id
        LEFT JOIN (
          SELECT labels_for_this_product.product_id, ARRAY_AGG(labels_for_this_product.label_id) labels FROM (
            SELECT labels.label_id, products_labels.product_id FROM labels
              LEFT JOIN products_labels ON products_labels.label_id=labels.label_id 
            WHERE labels.owner_id=$1
          ) AS labels_for_this_product GROUP BY labels_for_this_product.product_id
        ) AS selected_labels ON products.product_id=selected_labels.product_id
      WHERE users_storages.user_id=$1;`,
      [userId]
    );
  }

  async create(productName, expirationDate, amount, storageId) {
    return this.db.oneOrNone(
      `INSERT INTO products(product_name, expiration_date, amount, storage_id) 
          VALUES($1, $2, $3, $4) RETURNING *`,
      [productName, expirationDate, amount, storageId]
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
