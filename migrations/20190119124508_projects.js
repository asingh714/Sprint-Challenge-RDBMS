
exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", function(table) {
      table.increments("id")
      table.string("name", 100).notNullable()
      table.string("description", 500).notNullable()
      table.boolean("completed").notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects")
};
