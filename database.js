const connection = require('./connection'),
    validator = require('validator'),
    cascadeDelete = require('bookshelf-cascade-delete');

let knex = require('knex')({
    client: 'pg',
    connection: connection
});

const bookshelf = require('bookshelf')(knex);

validator.isRequired = val => {
    return val !== null;
};

validator.isNumber = val => {
    return typeof val === 'number';
};

validator.isDate = val => {
    return !isNaN(Date.parse(val));
};

validator.isString = val => {
    return typeof val === 'string';
};

bookshelf.plugin(['bookshelf-validate', cascadeDelete], {
    validator: validator,
    validateOnSave: true
});

module.exports = bookshelf;