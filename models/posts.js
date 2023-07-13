'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        static associate(models) {
            // define association here
        }
    }
    Posts.init(
        {
            title: DataTypes.STRING,
            content: DataTypes.STRING,
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('NOW()')
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('NOW()'),
                onUpdate: sequelize.literal('NOW()')
            }
        },
        {
            sequelize,
            modelName: 'Posts',
        }
    );
    return Posts;
};
