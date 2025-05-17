module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define("Answer", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    response_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'answers'
  });

  Answer.associate = (models) => {
    Answer.belongsTo(models.Response, {
      foreignKey: 'response_id',
      onDelete: 'CASCADE'
    });
    
    Answer.belongsTo(models.Question, {
      foreignKey: 'question_id',
      onDelete: 'CASCADE'
    });
  };

  return Answer;
};