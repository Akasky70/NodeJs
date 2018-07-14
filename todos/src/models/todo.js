import bookshelf from '../db';
import Categories from './category';

const TABLE_NAME = 'todos';

/**
 * User model.
 */
class Todos extends bookshelf.Model {
 
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  hasCategory() {
    return this.belongsToMany(Categories);
  }
}

export default Todos;
