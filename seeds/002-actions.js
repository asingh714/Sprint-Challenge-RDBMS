
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {id: 1, description: 'Description 1', notes: "Notes 1", completed: false, project_id: 1},
        {id: 2, description: 'Description 2', notes: "Notes 2", completed: false, project_id: 2},
        {id: 3, description: 'Description 3', notes: "Notes 3", completed: false, project_id: 3}
      ]);
    });
};
