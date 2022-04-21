class ProductsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async create(userId, productName, expirationDate, quantity, unit, storageId) {
    return this.db.oneOrNone(
      `INSERT INTO products(
        owner_id, product_name, expiration_date, quantity, unit, storage_id) 
          VALUES($1, $2, $3, $4, $5, $6) RETURNING *
      `,
      [userId, productName, expirationDate, quantity, unit, storageId]
    );
  }
}

module.exports = ProductsRepository;
