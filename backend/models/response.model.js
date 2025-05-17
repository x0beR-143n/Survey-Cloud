module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define("Response", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    form_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    submitted_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    tableName: 'responses'
  });

  Response.associate = (models) => {
    Response.belongsTo(models.Form, {
      foreignKey: 'form_id',
      onDelete: 'CASCADE'
    });
    
    Response.hasMany(models.Answer, {
      foreignKey: 'response_id',
      onDelete: 'CASCADE'
    });
  };

  return Response;
};