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
      `SELECT sl.*,
        can_share, can_edit, can_delete, can_change_permissions,
        user_name owner_name,
        users_for_list.users
          FROM users_shopping_lists usl
            LEFT JOIN shopping_lists sl ON sl.shopping_list_id=usl.shopping_list_id
            LEFT JOIN users us ON us.user_id=usl.user_id
            LEFT JOIN (
              SELECT list_usr.shopping_list_id, JSON_AGG(list_usr.*) users FROM (
                SELECT 
                  sl.shopping_list_id, 
                  usl.user_id,
                  usl.can_share,
                  usl.can_edit,
                  usl.can_delete,
                  usl.can_change_permissions,
                  us.user_name
                    FROM shopping_lists sl
                      LEFT JOIN users_shopping_lists usl ON sl.shopping_list_id=usl.shopping_list_id
                      LEFT JOIN users us ON usl.user_id = us.user_id
              ) list_usr GROUP BY list_usr.shopping_list_id
            ) users_for_list ON users_for_list.shopping_list_id=usl.shopping_list_id
          WHERE us.user_id=$1`,
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
