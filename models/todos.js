const todo = (sequelize, DataTypes) => {
  const Todo = sequelize.define("todo", {
    item: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Todo;
};

module.exports = todo;
