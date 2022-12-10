
import { Sequelize } from 'sequelize';
import sequelize from '../db.js';

var attributes = sequelize.define('attributes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    surface: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    restrooms: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    terrace: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    elevator: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    floor: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

await attributes.sync({ force: false });
export default attributes;