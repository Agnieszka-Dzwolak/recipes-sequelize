const createRecipe = (sequelize, DataTypes) => {
    const Recipe = sequelize.define('recipe', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        ingredients: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false
        },

        img: {
            type: DataTypes.STRING,
            allowNull: false
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        }
    });

    return Recipe;
};

export default createRecipe;
