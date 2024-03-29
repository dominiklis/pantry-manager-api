class LabelsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async findById(labelId) {
    return this.db.oneOrNone(`SELECT * FROM labels WHERE label_id=$1`, [
      labelId,
    ]);
  }

  async get(userId) {
    return this.db.manyOrNone(
      `SELECT label_id, label_name FROM labels WHERE owner_id=$1`,
      [userId]
    );
  }

  async create(userId, labelName) {
    return this.db.oneOrNone(
      `INSERT INTO labels(owner_id, label_name) VALUES($1, $2) RETURNING *`,
      [userId, labelName]
    );
  }

  async edit(userId, labelId, labelName) {
    return this.db.oneOrNone(
      `UPDATE labels SET label_name=$3 WHERE owner_id=$1 AND label_id=$2 RETURNING *`,
      [userId, labelId, labelName]
    );
  }

  async remove(labelId) {
    return this.db.oneOrNone(
      `DELETE FROM labels WHERE label_id=$1 RETURNING *`,
      [labelId]
    );
  }
}

module.exports = LabelsRepository;
