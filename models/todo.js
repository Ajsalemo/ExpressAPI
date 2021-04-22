const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {}
  Todo.init(
    {
      name: DataTypes.STRING,
      completed: DataTypes.BOOLEAN,
      dateTime: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
