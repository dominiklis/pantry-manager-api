class StoragesRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async findById(storageId) {
    return this.db.oneOrNone(
      `SELECT * FROM storages
        WHERE storage_id=$1`,
      [storageId]
    );
  }

  async get(userId) {
    return this.db.manyOrNone(
      `SELECT st.*,
        can_share, can_edit, can_delete, can_change_permissions,
        user_name owner_name,
        users_for_storage.users
          FROM users_storages ust
            LEFT JOIN storages st ON st.storage_id=ust.storage_id
            LEFT JOIN users us ON us.user_id=ust.user_id
            LEFT JOIN (
              SELECT stor_usr.storage_id, JSON_AGG(stor_usr.*) users FROM (
                SELECT 
                  st.storage_id, 
                  ust.user_id,
                  ust.can_share,
                  ust.can_edit,
                  ust.can_delete,
                  ust.can_change_permissions,
                  us.user_name
                    FROM storages st
                      LEFT JOIN users_storages ust ON st.storage_id=ust.storage_id
                      LEFT JOIN users us ON ust.user_id = us.user_id
              ) stor_usr GROUP BY stor_usr.storage_id
            ) users_for_storage ON users_for_storage.storage_id=ust.storage_id
          WHERE us.user_id=$1`,
      [userId]
    );
  }

  async create(userId, storageName, color) {
    return this.db.oneOrNone(
      `INSERT INTO storages(
        owner_id, storage_name, color) 
          VALUES($1, $2, $3) RETURNING *`,
      [userId, storageName, color]
    );
  }

  async edit(storageId, storageName, color) {
    return this.db.oneOrNone(
      `UPDATE storages SET
        storage_name=$2, color=$3
          WHERE storage_id=$1  
            RETURNING *`,
      [storageId, storageName, color]
    );
  }

  async remove(storageId) {
    return this.db.oneOrNone(
      `DELETE FROM storages
        WHERE storage_id=$1 RETURNING *`,
      [storageId]
    );
  }
}

module.exports = StoragesRepository;
