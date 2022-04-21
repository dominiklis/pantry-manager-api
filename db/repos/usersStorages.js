class UsersStoragesRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async findById(userId, storageId) {
    return this.db.oneOrNone(
      `SELECT * FROM users_storages
        WHERE user_id=$1 AND storage_id=$2`,
      [userId, storageId]
    );
  }

  async get(storageId) {
    return this.db.manyOrNone(
      `SELECT 
        ust.user_id,
        ust.can_share,
        ust.can_edit,
        ust.can_delete,
        ust.can_change_permissions,
        us.user_name
          FROM users_storages ust
            LEFT JOIN users us ON us.user_id=ust.user_id
              WHERE storage_id=$1`,
      [storageId]
    );
  }

  async create(
    userId,
    storageId,
    canShare = false,
    canEdit = false,
    canDelete = false,
    canChangePermissions = false
  ) {
    return this.db.oneOrNone(
      `INSERT INTO users_storages (
        user_id, storage_id, can_share, can_edit, can_delete, can_change_permissions)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [userId, storageId, canShare, canEdit, canDelete, canChangePermissions]
    );
  }

  async edit(
    userId,
    storageId,
    canShare,
    canEdit,
    canDelete,
    canChangePermissions
  ) {
    return this.db.oneOrNone(
      `UPDATE users_storages SET 
        can_share=$3, can_edit=$4, can_delete=$5, can_change_permissions=$6
          WHERE user_id=$1 AND storage_id=$2 RETURNING *`,
      [userId, storageId, canShare, canEdit, canDelete, canChangePermissions]
    );
  }

  async remove(userId, storageId) {
    return this.db.oneOrNone(
      `DELETE FROM users_storages
        WHERE user_id=$1 AND storage_id=$2 RETURNING *
      `,
      [userId, storageId]
    );
  }
}

module.exports = UsersStoragesRepository;
