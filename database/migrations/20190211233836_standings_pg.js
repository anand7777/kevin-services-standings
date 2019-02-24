
exports.up = function(knex, Promise) {
  return knex.schema.createTable('standings', t => {
   t.increments().primary()
   t.string('team_name').notNullable()
   t.string('division').notNullable()
   t.integer('wins').notNullable()
   t.integer('losses').notNullable()
   t.integer('tie').notNullable()
   t.float('percentage').notNullable()
   t.integer('points_for').notNullable()
   t.integer('points_against').notNullable()
   t.string('team_logo').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('standings')
};
