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

  async removeForProduct(userId, productId) {
    return this.db.manyOrNone(
      `DELETE FROM products_labels USING labels WHERE owner_id=$1 AND product_id=$2 RETURNING *`,
      [userId, productId]
    );
  }
}

module.exports = ProductsLabelsRepository;
