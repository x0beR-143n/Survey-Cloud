module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define("Option", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    option_text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'options'
  });

  Option.associate = (models) => {
    Option.belongsTo(models.Question, {
      foreignKey: 'question_id',
      onDelete: 'CASCADE'
    });
  };

  return Option;
};