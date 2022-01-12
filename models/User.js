const {Model, DataTypes} = require('sequelize');
const sequelize = require("../config/connection");

//create our user model
class User extends Model {}

//define the table columns and configurations
User.init(
    {
        //table column definitions go here
        id: {
            type: DataTypes.INTEGER, //makes the ID column have data type integer
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail:true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        //table configuration options go here

        //pass in the imported sequalize connection
        sequelize, //creates the connection
        timestamps: false, //makes it so timestamps dont appear
        freezeTableName: true, //prevents system from pluralizing tables
        underscored:true, //makes the table names look like comment_text instead of commentText
        modelName: 'user' //make it so our model name stays lowercase in the database
    }
);

module.exports = User;
