/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  let bcrypt = require('bcrypt-nodejs');
  return knex('users')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert([
          {
            name: 'Saugat Acharya',
            email: 'akasky70@gmail.com',
            password: bcrypt.hashSync("password"),
            is_active:'1',
            updated_at: new Date()
          },
          {
            name: 'John Doe',
            email: 'akasky72@gmail.com',
            password: bcrypt.hashSync("password"),
            is_active:'1',
            updated_at: new Date()
          }
        ])
      ]);
    });
}
