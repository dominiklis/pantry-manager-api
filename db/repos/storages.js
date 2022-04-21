class StoragesRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async create(userId, storageName, color) {
    return this.db.oneOrNone(
      `INSERT INTO storages(
        owner_id, storage_name, color) 
          VALUES($1, $2, $3) RETURNING *
      `,
      [userId, storageName, color]
    );
  }
}

module.exports = StoragesRepository;
