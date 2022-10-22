class ShoppingListsItemsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async findById(shoppingListItemId) {
    return this.db.oneOrNone(
      `SELECT * FROM  shopping_list_items WHERE shopping_list_item_id=$1;`,
      [shoppingListItemId]
    );
  }

  async get(userId) {
    return this.db.manyOrNone(
      `SELECT shopping_list_items.* FROM users_shopping_lists
        LEFT JOIN shopping_lists ON shopping_lists.shopping_list_id=users_shopping_lists.shopping_list_id
        LEFT JOIN shopping_list_items ON shopping_list_items.shopping_list_id=shopping_lists.shopping_list_id
      WHERE users_shopping_lists.user_id=$1;`,
      [userId]
    );
  }

  async create(shoppingListItemName, amount, selected, shoppingListId) {
    return this.db.oneOrNone(
      `INSERT INTO shopping_list_items(
        shopping_list_item_name, amount, selected, shopping_list_id)
          VALUES($1, $2, $3, $4) RETURNING *`,
      [shoppingListItemName, amount, selected, shoppingListId]
    );
  }

  async edit(
    shoppingListItemId,
    shoppingListItemName,
    amount,
    selected,
    shoppingListId
  ) {
    return this.db.oneOrNone(
      `UPDATE shopping_list_items SET
        shopping_list_item_name=$2,
        amount=$3,
        selected=$4,
        shopping_list_id=$5
          WHERE shopping_list_item_id=$1 RETURNING *`,
      [
        shoppingListItemId,
        shoppingListItemName,
        amount,
        selected,
        shoppingListId,
      ]
    );
  }

  async remove(shoppingListItemId) {
    return this.db.oneOrNone(
      `DELETE FROM shopping_list_items WHERE shopping_list_item_id=$1 RETURNING *`,
      [shoppingListItemId]
    );
  }

  async removeItemsOnList(shoppingListId) {
    return this.db.none(
      `DELETE FROM shopping_list_items WHERE shopping_list_id=$1;`,
      [shoppingListId]
    );
  }
}

module.exports = ShoppingListsItemsRepository;
