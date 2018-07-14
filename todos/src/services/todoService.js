import Boom from 'boom';
import Todo from '../models/todo';
import Categories from '../models/category';

/**
 * Get all users.
 *
 * @param {Object} query
 * @return {Promise}
 */
export function getAllTodos(query) {
    
    let queryLen = Object.keys(query).length;

    if(queryLen === 1){

        // return new Todo({ title: query.title }).fetch().then(todo => {
        //     if (!todo) {
        //         throw new Boom.notFound('Todo not found');
        //     }
        //     return todo;
        // });

        return Todo
        .query(qb => { 
            qb.whereRaw('title ILIKE ?',  ['%' + query.title + '%'] );
            qb.debug(true);
        })
        .fetchAll();
        
    } else if( queryLen >= 2) {

        const offset = (query.page - 1) * query.perpage;

        return Todo.forge()
        .query(function(qb){

            qb.offset(offset).limit(query.perpage);
        })
        .orderBy(query.sortfrom, query.sortby)
        .fetchAll().then(todo => {
            if (!todo) {
                throw new Boom.notFound('Todo not found');
            }
            return { page: query.page, perpage : query.perpage, data: todo };
        })
    } else {

        // return Todo.fetchAll();
        return new Todo().query(function(qb){
            qb.orderBy('title','ASC'); 
        })
        .fetchAll();
    }

}

/**
 * Get a todo with category name
 * 
 * 
 * 
 */
export function getByCategory(query){

    // return Todo.forge({ id: query.id }).fetch({ withRelated :'hasCategory' }).then(todo =>{
       
    //     if(!todo){
    //         throw new Boom.notFound('item not found');
    //     }
    //     return todo;
    // })

    return Categories.forge({ name: query.category_name }).fetch({ withRelated :'hasTodo'}).then(todo =>{
       
        if(!todo){
            throw new Boom.notFound('item not found');
        }
        return todo;
    })
}


/**
 * Get a todo.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getTodo(id) {
    return new Todo({ id }).fetch().then(todo => {
        if (!todo) {
            throw new Boom.notFound('Todo not found');
        }
        return todo;
    });
}

/**
 * Create new todo.
 *
 * @param  {Object}  todo
 * @return {Promise}
 */
export function createTodo(todo) {

    return new Todo({ 
        title: todo.title,
        description: todo.description,
        user_id: todo.user_id,
        is_completed: todo.is_completed
    }).save().then(todo => todo.refresh());
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         todo
 * @return {Promise}
 */
export function updateTodo(id, todo) {
    return new Todo({ id }).save({ 
        title: todo.title,
        description: todo.description,
        user_id: todo.user_id,
        is_completed: todo.is_completed
    }).then(todo => todo.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteTodo(id) {
    return new Todo({ id }).fetch().then(todo => todo.destroy());
  }