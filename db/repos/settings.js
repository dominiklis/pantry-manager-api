class SettingsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async create(userId) {
    return this.db.oneOrNone(
      "INSERT INTO settings(owner_id) VALUES($1) RETURNING *",
      [userId]
    );
  }

  async findById(settingsId) {
    return this.db.oneOrNone("SELECT * FROM settings WHERE owner_id=$1;", [
      settingsId,
    ]);
  }

  async edit(settingsId, defaultNumberOfDaysForWarning, language) {
    return this.db.oneOrNone(
      `UPDATE settings SET
        default_number_of_days_for_warning=$2,
        language=$3
          WHERE owner_id=$1 RETURNING *`,
      [settingsId, defaultNumberOfDaysForWarning, language]
    );
  }
}

module.exports = SettingsRepository;
