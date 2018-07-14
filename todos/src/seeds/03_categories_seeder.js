/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('categories')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('categories').insert([
          {
            is_active: '1',
            name: 'assignment',
            updated_at: new Date()
          },
          {
            is_active: '1',
            name: 'home task',
            updated_at: new Date()
          }
        ])
      ]);
    });
}
