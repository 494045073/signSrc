/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tag', {
    tid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tagName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tagVal: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createTime: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    updateTime: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tag'
  });

  Model.associate = function() {

  }

  return Model;
};
