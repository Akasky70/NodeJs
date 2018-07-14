/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('todos')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('todos').insert([
          {
            updated_at:'2018-07-10',
            title: 'Assignment 1',
            description: 'Stdy Nodejs Folder structures',
            user_id:1,
            is_completed:'0'
          },
          {
            updated_at:'2018-07-10',
            title: 'Assignment 2',
            description: 'Stdy ReactJs Folder structures',
            user_id:2,
            is_completed:'0'
          }
        ])
      ]);
    });
}
