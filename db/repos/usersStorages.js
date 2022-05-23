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
        us.user_name
          FROM users_storages ust
            LEFT JOIN users us ON us.user_id=ust.user_id
              WHERE storage_id=$1`,
      [storageId]
    );
  }

  async create(userId, storageId, canShare = false) {
    return this.db.oneOrNone(
      `INSERT INTO users_storages (
        user_id, storage_id, can_share)
          VALUES ($1, $2, $3) RETURNING *`,
      [userId, storageId, canShare]
    );
  }

  async edit(userId, storageId, canShare) {
    return this.db.oneOrNone(
      `UPDATE users_storages SET 
        can_share=$3
          WHERE user_id=$1 AND storage_id=$2 RETURNING *`,
      [userId, storageId, canShare]
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
