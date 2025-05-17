module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define("Form", {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false, // Không sử dụng createdAt/updatedAt mặc định của Sequelize
    tableName: 'forms'
  });

  Form.associate = (models) => {
    Form.hasMany(models.Question, {
      foreignKey: 'form_id',
      onDelete: 'CASCADE'
    });
    
    Form.hasMany(models.Response, {
      foreignKey: 'form_id',
      onDelete: 'CASCADE'
    });
  };

  return Form;
};