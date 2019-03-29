exports.seed = function(knex, Promise) {
  return knex("actions").insert([
    {
      description: "Watch react hooks videos",
      notes: "Watch YouTube video and then do assignments",
      is_completed: false,
      project_id: 1
    },
    {
      description: "Read hooks docs",
      notes: "React hooks documents are great.",
      is_completed: false,
      project_id: 1
    },
    {
      description: "Watch graphql videos",
      notes: "Watch YouTube video and work on a project.",
      is_completed: false,
      project_id: 2
    },
    {
      description: "Read graphql docs",
      notes: "Graphql docs are awesome.",
      is_completed: false,
      project_id: 2
    }
  ]);
};
