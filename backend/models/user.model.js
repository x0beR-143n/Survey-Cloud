module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,      // Khóa chính
      autoIncrement: true,   // Tự động tăng
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    timestamps: false, // Tắt createdAt, updatedAt
  });
};
