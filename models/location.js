import { Sequelize } from 'sequelize';
import sequelize from '../db.js';

const location = sequelize.define('location', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_province: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

await location.sync({ force: false });
export default location;