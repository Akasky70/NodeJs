import Boom from 'boom';
import Todo from '../models/todo';
import Categories from '../models/category';

/**
 * Get all users.
 *
 * @param {Object} query 
 * @param {Object} headers 
 * @return {Promise}
 */
export function getAllTodos( query, headers ) {

    if(query.title){

        return Todo.query(qb => { 
            
            qb.whereRaw('title ILIKE ?', ['%' + query.title + '%'] );
        })
        .fetchAll();
        
    } else if( query.page && query.perpage) {

        const offset = (query.page - 1) * query.perpage;

        return Todo.forge()
        .query(function(qb){

            qb.offset(offset).limit(query.perpage);
        })
        .where({ user_id: headers.user_id })
        .orderBy(query.sortfrom, query.sortby)
        .fetchAll().then(todo => {
            if (!todo) {
                throw new Boom.notFound('Todo not found');
            }
            return { page: query.page, perpage : query.perpage, data: todo };
        })
        
    } else if (query.category_name) {

        // GET TODO BY CATEGORIES
        return Categories
            .forge({ name: query.category_name })
            .fetch({ withRelated :'hasTodo'})
            .then(todo =>{
       
                if(!todo){
                    throw new Boom.notFound('item not found');
                }
            return todo;
        })
        
    } else {

        // return Todo.fetchAll();
        return new Todo().query(function(qb){
            qb.where({ user_id: headers.user_id })
            qb.orderBy('title','ASC'); 
        })
        .fetchAll();
    }

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
        is_completed: todo.is_completed,
        is_active:todo.is_active
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
        is_completed: todo.is_completed,
        is_active:todo.is_active
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