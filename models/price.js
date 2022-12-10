import { Sequelize } from 'sequelize';
import sequelize from '../db.js';
import attributes from './attributes.js';
import Date from './date.js';
import location from './location.js';


const Price = sequelize.define('price', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lower: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    middle: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    upper: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    attributes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
            model: attributes,
            key: 'id'
        }
    },
    date: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
            model: Date,
            key: 'id',
        }

    },
    location: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
            model: location,
            key: 'id'
        }
    }
});


await Price.sync({ force: false });

export default Price;
