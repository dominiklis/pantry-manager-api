class ShoppingListsItemsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async findById(userId, shoppingListItemId) {
    return this.db.oneOrNone(
      `SELECT DISTINCT spli.* FROM shopping_list_items spli
        LEFT JOIN users_shopping_lists uspl ON uspl.shopping_list_id=spli.shopping_list_id
          WHERE spli.shopping_list_item_id=$2 AND (spli.owner_id=$1 OR uspl.user_id=$1)`,
      [userId, shoppingListItemId]
    );
  }

  async get(userId) {
    return this.db.manyOrNone(
      `SELECT DISTINCT spli.* FROM shopping_list_items spli
        LEFT JOIN users_shopping_lists uspl 
            ON uspl.shopping_list_id=spli.shopping_list_id
        WHERE spli.owner_id=$1 OR uspl.user_id=$1;`,
      [userId]
    );
  }

  async create(
    userId,
    shoppingListItemName,
    quantity,
    selected,
    shoppingListId
  ) {
    return this.db.oneOrNone(
      `INSERT INTO shopping_list_items(
        owner_id, shopping_list_item_name, quantity, selected, shopping_list_id)
          VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [userId, shoppingListItemName, quantity, selected, shoppingListId]
    );
  }

  async edit(
    shoppingListItemId,
    shoppingListItemName,
    quantity,
    selected,
    shoppingListId
  ) {
    return this.db.oneOrNone(
      `UPDATE shopping_list_items SET
        shopping_list_item_name=$2,
        quantity=$3,
        selected=$4,
        shopping_list_id=$5
          WHERE shopping_list_item_id=$1 RETURNING *`,
      [
        shoppingListItemId,
        shoppingListItemName,
        quantity,
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
