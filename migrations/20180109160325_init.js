exports.up = function (knex, Promise) {
    return knex.schema.createTable('gender', tbl => {
        tbl.increments('id').unsigned().primary();
        tbl.string('name');
    })
        .then(() => {
            return knex.schema.createTable('patients', tbl => {
                tbl.increments('id').unsigned().primary();
                tbl.string('first_name');
                tbl.string('last_name');
                tbl.string('mid_name');
                tbl.date('birth_date');
                tbl.integer('gender_id').unsigned().index().references('id').inTable('gender');
                tbl.string('country');
                tbl.string('city');
                tbl.string('sub').unique();
                tbl.float('weight');
                tbl.float('height');
                tbl.string('chronic_diseases', 2048);
                tbl.string('allergies', 2048);
            })
        })
        .then(() => {
            return knex.schema.createTable('doctors', tbl => {
                tbl.increments('id').unsigned().primary();
                tbl.string('first_name');
                tbl.string('last_name');
                tbl.string('mid_name');
                tbl.date('birth_date');
                tbl.integer('gender_id').unsigned().index().references('id').inTable('gender');
                tbl.string('country');
                tbl.string('city');
                tbl.string('sub').unique();
            })
        })
        .then(() => {
            return knex.schema.createTable('educations', tbl => {
                tbl.increments('id').unsigned().primary();
                tbl.string('name');
                tbl.string('country_city');
                tbl.string('faculty');
                tbl.date('graduated');
                tbl.string('profession');
                tbl.integer('doctor_id').unsigned().index().references('id').inTable('doctors');
            })
        })
        .then(() => {
            return knex.schema.createTable('works', tbl => {
                tbl.increments('id').unsigned().primary();
                tbl.string('name');
                tbl.string('country_city');
                tbl.date('start_date');
                tbl.string('experience');
                tbl.string('position');
                tbl.string('recommender');
                tbl.integer('doctor_id').unsigned().index().references('id').inTable('doctors');
            })
        });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('works')
        .then(() => {
            return knex.schema.dropTable('educations');
        })
        .then(() => {
            return knex.schema.dropTable('doctors');
        })
        .then(() => {
            return knex.schema.dropTable('patients');
        })
        .then(() => {
            return knex.schema.dropTable('gender');
        });
};
