class UsersShoppingListsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async findById(userId, shoppingListId) {
    return this.db.oneOrNone(
      `SELECT * FROM users_shopping_lists
        WHERE user_id=$1 AND shopping_list_id=$2`,
      [userId, shoppingListId]
    );
  }

  async get(shoppingListId) {
    return this.db.manyOrNone(
      `SELECT 
        usl.user_id,
        usl.can_share,
        usl.can_edit,
        usl.can_delete,
        usl.can_change_permissions,
        us.user_name
          FROM users_shopping_lists usl
            LEFT JOIN users us ON us.user_id=usl.user_id
              WHERE shopping_list_id=$1`,
      [shoppingListId]
    );
  }

  async create(
    userId,
    shoppingListId,
    canShare = false,
    canEdit = false,
    canDelete = false,
    canChangePermissions = false
  ) {
    return this.db.oneOrNone(
      `INSERT INTO users_shopping_lists (
        user_id, shopping_list_id, can_share, can_edit, can_delete, can_change_permissions)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        userId,
        shoppingListId,
        canShare,
        canEdit,
        canDelete,
        canChangePermissions,
      ]
    );
  }

  async edit(
    userId,
    shoppingListId,
    canShare,
    canEdit,
    canDelete,
    canChangePermissions
  ) {
    return this.db.oneOrNone(
      `UPDATE users_shopping_lists SET 
        can_share=$3, can_edit=$4, can_delete=$5, can_change_permissions=$6
          WHERE user_id=$1 AND shopping_list_id=$2 RETURNING *`,
      [
        userId,
        shoppingListId,
        canShare,
        canEdit,
        canDelete,
        canChangePermissions,
      ]
    );
  }

  async remove(userId, shoppingListId) {
    return this.db.oneOrNone(
      `DELETE FROM users_shopping_lists
        WHERE user_id=$1 AND shopping_list_id=$2 RETURNING *
      `,
      [userId, shoppingListId]
    );
  }
}

module.exports = UsersShoppingListsRepository;
