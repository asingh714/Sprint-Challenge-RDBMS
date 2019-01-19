
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'Project 1', description: 'Description 1', completed: false},
        {id: 2, name: 'Project 2', description: 'Description 2', completed: false},
        {id: 3, name: 'Project 3', description: 'Description 3', completed: false},
      ]);
    });
};
