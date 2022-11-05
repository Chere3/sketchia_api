import { supabase } from '../../app';


/**
 * @function get - obtiene los datos de la base de datos de supabase.
 * @param {string} table - nombre de la tabla de la base de datos.
 * @param {any} columns - columnas a seleccionar de la base de datos.
 * @return {Promise<any[]>} - retorna un arreglo de objetos con los datos de la base de datos.
 * @throws {Error} - lanza un error si no se pudo obtener los datos de la base de datos.
 * @example
 * get('users', {id: 1})
 * // => [{id: 1, name: 'John', age: 20}]
 */

async function get(table: string, columns: any) {
    if (!columns) {
        const {data, error} = await supabase.from(table).select();
        if (!error) return data;
        throw error;
    } else {
        const {data, error} = await supabase.from(table).select().eq(Object.keys(columns)[0], Object.values(columns)[0]);
        if (!error) return data;
        throw error;
    }
}

/**
 * @function post - inserta datos en la base de datos de supabase.
 * @param {string} table - nombre de la tabla de la base de datos.
 * @param {any} data - datos a insertar en la base de datos.
 * @return {Promise<any[]>} - retorna un arreglo de objetos con los datos de la base de datos.
 * @throws {Error} - retorna un error si no se pudo insertar los datos.
 * @example
 * post('users', {name: 'John', age: 20})
 * // => void
 */

async function post(table: string, data: any) {
    const {error} = await supabase.from(table).insert(data);
    if (!error) return;
    throw error;
}

/**
 * @function patch - actualiza datos en la base de datos de supabase.
 * @param {string} table - nombre de la tabla de la base de datos.
 * @param {any} data - datos a actualizar en la base de datos.
 * @param {any} columns - columnas a seleccionar de la base de datos.
 * @return {Promise<any[]>} - retorna un arreglo de objetos con los datos de la base de datos.
 * @throws {Error} - retorna un error si no se pudo actualizar los datos.
 * @example
 * patch('users', {name: 'John', age: 20}, {id: 1})
 * // => void
 */

async function patch(table: string, data: any, columns: any) {
    const {error} = await supabase.from(table).update(data).eq(Object.keys(columns)[0], Object.values(columns)[0]);
    if (!error) return;
    throw error;
}

/**
 * @function delete - elimina datos en la base de datos de supabase.
 * @param {string} table - nombre de la tabla de la base de datos.
 * @param {any} columns - columnas a seleccionar de la base de datos.
 * @return {Promise<any[]>} - retorna un arreglo de objetos con los datos de la base de datos.
 * @throws {Error} - retorna un error si no se pudo eliminar los datos.
 * @example
 * delete('users', {id: 1})
 * // => void
 */

async function delete_ (table: string, columns: any) {
    const {error} = await supabase.from(table).delete().eq(Object.keys(columns)[0], Object.values(columns)[0]);
    if (!error) return;
    throw error;
}

/**
 * @function postAndGet - inserta datos en la base de datos de supabase y obtiene los datos de la base de datos.
 * @param {string} table - nombre de la tabla de la base de datos.
 * @param {any} columns - columnas a seleccionar de la base de datos.
 * @param {any} data - datos a insertar en la base de datos.
 * @return {Promise<any[]>} - retorna un arreglo de objetos con los datos de la base de datos.
 * @throws {Error} - retorna un error si no se pudo insertar los datos o si no se pudo obtener los datos.
 * @example
 * postAndGet('users', {id: 1}, {name: 'John', age: 20})
 * // => [{id: 1, name: 'John', age: 20}]
 */

async function postAndGet(table: string, columns: any, data: any) {
    await post(table, data);
    return await get(table, columns);
}

/**
 * @function patchAndGet - actualiza datos en la base de datos de supabase y obtiene los datos de la base de datos.
 * @param {string} table - nombre de la tabla de la base de datos.
 * @param {any} columns - columnas a seleccionar de la base de datos.
 * @param {any} data - datos a actualizar en la base de datos.
 * @return {Promise<any[]>} - retorna un arreglo de objetos con los datos de la base de datos.
 * @throws {Error} - retorna un error si no se pudo actualizar los datos o si no se pudo obtener los datos.
 * @example
 * patchAndGet('users', {id: 1}, {age: 20})
 * // => [{id: 1, name: 'John', age: 20}]
 */

async function patchAndGet(table: string, columns: any, data: any) {
    await patch(table, data, columns);
    return await get(table, columns);
}

/**
 * @function getAndPatch - obtiene datos en la base de datos de supabase y actualiza los datos de la base de datos.
 * @param {string} table - nombre de la tabla de la base de datos.
 * @param {any} columns - columnas a seleccionar de la base de datos.
 * @param {any} data - datos a actualizar en la base de datos.
 * @return {Promise<any[]>} - retorna un arreglo de objetos con los datos de la base de datos.
 * @throws {Error} - retorna un error si no se pudo obtener los datos o si no se pudo actualizar los datos.
 * @example
 * getAndPatch('users', {id: 1}, {age: 20})
 * // => [{id: 1, name: 'John', age: 19}]
 */

async function getAndPatch(table: string, columns: any, data: any) {
    const result = await get(table, columns);
    await patch(table, data, columns);
    return result;
}

/**
 * @function getAndDelete - obtiene datos en la base de datos de supabase y elimina los datos de la base de datos.
 * @param {string} table - nombre de la tabla de la base de datos.
 * @param {any} columns - columnas a seleccionar de la base de datos.
 * @return {Promise<any[]>} - retorna un arreglo de objetos con los datos de la base de datos.
 * @throws {Error} - retorna un error si no se pudo obtener los datos o si no se pudo eliminar los datos.
 * @example
 * getAndDelete('users', {id: 1})
 * // => [{id: 1, name: 'John', age: 20}]
 */

async function getAndDelete(table: string, columns: any) {
    const result = await get(table, columns);
    await delete_(table, columns);
    return result;
}

export const database = {
    get,
    post,
    patch,
    delete: delete_,
    postAndGet,
    patchAndGet,
    getAndPatch,
    getAndDelete,
}

