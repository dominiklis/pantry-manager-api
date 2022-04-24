class ProductsLabelsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async create(productId, labelId) {
    return this.db.oneOrNone(
      `INSERT INTO products_labels(product_id, label_id) VALUES($1, $2) RETURNING *`,
      [productId, labelId]
    );
  }

  async removeForProduct(productId) {
    return this.db.manyOrNone(
      `DELETE FROM products_labels WHERE product_id=$1 RETURNING *`,
      [productId]
    );
  }
}

module.exports = ProductsLabelsRepository;
