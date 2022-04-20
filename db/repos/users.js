class UsersRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async create(userName, email, password) {
    return this.db.oneOrNone(
      "INSERT INTO users(user_name, email, password) VALUES($1, $2, $3) RETURNING user_id, user_name, email",
      [userName, email, password]
    );
  }

  async findByUserNameOrEmail(userName, email) {
    return this.db.oneOrNone(
      "SELECT * FROM users WHERE user_name=$1 OR email=$2;",
      [userName, email]
    );
  }

  async findById(userId) {
    return this.db.oneOrNone("SELECT * FROM users WHERE user_id=$1;", [userId]);
  }
}

module.exports = UsersRepository;
