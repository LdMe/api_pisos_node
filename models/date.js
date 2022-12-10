import { Sequelize } from 'sequelize';
import sequelize from '../db.js';

const Date = sequelize.define('date', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

await Date.sync({ force: false });
export default Date;