exports.seed = function(knex, Promise) {
  return knex("projects").insert([
    {
      name: "React Hookz",
      description: "Learn react hooks",
      is_completed: false
    },
    { name: "GraphQL", description: "Learn graphql", is_completed: false }
  ]);
};
