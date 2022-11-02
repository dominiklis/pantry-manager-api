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

  async edit(settingsId, defaultNumberOfDaysForWarning, language, theme) {
    return this.db.oneOrNone(
      `UPDATE settings SET
        default_number_of_days_for_warning=$2,
        language=$3,
        theme=$4
          WHERE owner_id=$1 RETURNING *`,
      [settingsId, defaultNumberOfDaysForWarning, language, theme]
    );
  }

  async getLanguages() {
    return this.db.manyOrNone(`SELECT unnest(enum_range(NULL::languages));`);
  }

  async getThemes() {
    return this.db.manyOrNone(`SELECT unnest(enum_range(NULL::themes));`);
  }

  async getColors() {
    return this.db.manyOrNone(`SELECT unnest(enum_range(NULL::colors));`);
  }
}

module.exports = SettingsRepository;
