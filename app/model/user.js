/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('user', {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    openID: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    session_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createTime: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sex: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    identity: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    studentID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    realName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    school: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    department: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    class: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'user'
  });

  Model.associate = function() {

  }

  return Model;
};
