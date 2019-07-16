'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const User = app.model.define('user',
        {
            id: { type: INTEGER, primaryKey: true, autoincrement: true },
            username: STRING(30),
            password: STRING(30),
            created_at: DATE,
            updated_at: DATE,
        },
        {
            freezeTableName: true, // Model 对应的表名将与model名相同
            timestamps: false,
        }

    );

    return User;
}