class ShoppingListsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async findById(shoppingListId) {
    return this.db.oneOrNone(
      `SELECT * FROM shopping_lists WHERE shopping_list_id=$1`,
      [shoppingListId]
    );
  }

  async get(userId) {
    return this.db.manyOrNone(
      `SELECT * FROM shopping_lists WHERE owner_id=$1`,
      [userId]
    );
  }

  async create(userId, shoppingListName) {
    return this.db.oneOrNone(
      `INSERT INTO shopping_lists(owner_id, shopping_list_name) VALUES($1, $2) RETURNING *`,
      [userId, shoppingListName]
    );
  }

  async edit(shoppingListId, shoppingListName) {
    return this.db.oneOrNone(
      `UPDATE shopping_lists SET
        shopping_list_name=$2
          WHERE shopping_list_id=$1  
            RETURNING *`,
      [shoppingListId, shoppingListName]
    );
  }

  async remove(shoppingListId) {
    return this.db.oneOrNone(
      `DELETE FROM shopping_lists WHERE shopping_list_id=$1 RETURNING *`,
      [shoppingListId]
    );
  }
}

module.exports = ShoppingListsRepository;
