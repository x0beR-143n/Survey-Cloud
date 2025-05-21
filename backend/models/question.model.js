module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("Question", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    form_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    question_type: {
      type: DataTypes.ENUM('text', 'radio', 'checkbox', 'select', 'date'),
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'questions'
  });

  Question.associate = (models) => {
    Question.belongsTo(models.Form, {
      foreignKey: 'form_id',
      onDelete: 'CASCADE'
    });
    
    Question.hasMany(models.Option, {
      foreignKey: 'question_id',
      onDelete: 'CASCADE'
    });
    
    Question.hasMany(models.Answer, {
      foreignKey: 'question_id',
      onDelete: 'CASCADE'
    });
  };

  return Question;
};