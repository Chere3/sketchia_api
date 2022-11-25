import { supabase } from '../../app';
import {Bucket, StorageError, FileOptions, FileObject, SearchOptions, FetchParameters} from "@supabase/storage-js";
import { AcceptedFiles } from '../../typings';

/**
 * @function create - Crea un nuevo balde de almacenamiento
 * @param {string} bucketName - Nombre del balde
 * @param {boolean} publicRead - Si el balde es publico o no
 * @returns {Promise<void>} - Promesa vacia
 * @throws {Error} - Si el balde ya existe
 * @throws {Error} - Si no se ha podido crear el balde
 * @example
 * await create("bucketName", true)
 * ==> Promise<void>
 */


async function create(bucketName: string, publicRead: boolean = false): Promise<void | StorageError> {
    const { error } = await supabase.storage.createBucket(bucketName, {public: publicRead})

    if (error) throw error;
    return;
}

/**
 * @function get - Obtiene un balde de almacenamiento
 * @param {string} bucketName - Nombre del balde
 * @returns {Promise<any>} - Promesa con el balde
 * @throws {Error} - Si el balde no existe
 * @example
 * await get("bucketName")
 * ==> Promise<any>
 */

async function get(bucketName: string): Promise<Bucket> {
    const { data, error } = await supabase.storage.getBucket(bucketName)

    if (error) throw error;
    return data;
}

/**
 * @function list - Lista todos los baldes de almacenamiento
 * @returns {Promise<any>} - Promesa con los baldes
 * @example
 * await list()
 * ==> Promise<any>
 */

async function list(): Promise<Bucket[] | StorageError> {
    const { data, error } = await supabase.storage.listBuckets()

    if (error) throw error;
    return data;
}

/**
 * @function update - Actualiza un balde de almacenamiento
 * @param {string} bucketName - Nombre del balde
 * @param {boolean} publicRead - Si el balde es publico o no
 * @returns {Promise<void>} - Promesa vacia
 * @throws {Error} - Si el balde no existe
 * @throws {Error} - Si no se ha podido actualizar el balde
 * @example
 * await update("bucketName", true)
 * ==> Promise<void>
 */

async function update(bucketName: string, publicRead: boolean = false): Promise<void | StorageError> {
    const { error } = await supabase.storage.updateBucket(bucketName, {public: publicRead})

    if (error) throw error;
    return;
}

/**
 * @function remove - Elimina un balde de almacenamiento
 * @param {string} bucketName - Nombre del balde
 * @returns {Promise<void>} - Promesa vacia
 * @throws {Error} - Si el balde no existe
 * @throws {Error} - Si no se ha podido eliminar el balde
 * @example
 * await remove("bucketName")
 * ==> Promise<void>
 */

async function delete_(bucketName: string): Promise<void | StorageError> {
    const { error } = await supabase.storage.deleteBucket(bucketName)

    if (error) throw error;
    return;
}

/**
 * @function empty - Vacía un balde de almacenamiento
 * @param {string} bucketName - Nombre del balde
 * @returns {Promise<void>} - Promesa vacia
 * @throws {Error} - Si el balde no existe
 * @throws {Error} - Si no se ha podido vaciar el balde
 * @example
 * await empty("bucketName")
 * ==> Promise<void>
 */

async function empty(bucketName: string): Promise<void | StorageError> {
    const { error } = await supabase.storage.emptyBucket(bucketName)

    if (error) throw error;
    return;
}


/**
 * @function upload - Sube un archivo a un balde de almacenamiento
 * @param {string} bucketName - Nombre del balde
 * @param {string} path - Ruta del archivo
 * @param {File} file - Archivo
 * @param {FileOptions} optionalOptions - Opciones opcionales
 * @returns {Promise<void>} - Promesa vacia
 * @throws {Error} - Si el balde no existe
 * @throws {Error} - Si no se ha podido subir el archivo
 * @example
 * await upload("bucketName", "path/to/file", file)
 * ==> Promise<void>
 */

async function uploadFile(bucketName: string, path: string, file: AcceptedFiles, optionalOptions?: FileOptions): Promise<void | StorageError> {
    const { error } = await supabase.storage.from(bucketName).upload(path, file, optionalOptions)

    if (error) throw error;
    return;
}

/**
 * @function download - Descarga un archivo de un balde de almacenamiento
 * @param {string} bucketName - Nombre del balde
 * @param {string} path - Ruta del archivo
 * @returns {Promise<any>} - Promesa con el archivo
 * @throws {Error} - Si el balde no existe
 * @throws {Error} - Si el archivo no existe
 * @throws {Error} - Si no se ha podido descargar el archivo
 * @example
 * await download("bucketName", "path/to/file")
 */

async function downloadFile(bucketName: string, path: string): Promise<Blob | StorageError> {
    const { data, error } = await supabase.storage.from(bucketName).download(path)

    if (error) throw error;
    return data;
}

/**
 * @function listFiles - Lista todos los archivos de un balde de almacenamiento
 * @param {string} bucketName - Nombre del balde
 * @param {string} folder - Carpeta
 * @param {SearchOptions} optionalOptions - Opciones opcionales
 * @param {FetchParameters} fetchOptions - Opciones de fetch
 * @returns {Promise<any>} - Promesa con los archivos
 * @throws {Error} - Si el balde no existe
 * @throws {Error} - Si no se ha podido listar los archivos
 * @thorws {Error} - Si la carpeta no existe
 * @example
 * await listFiles("bucketName", "imagenes", {limit: 10})
 * ==> Promise<Blob[]>
 */

async function listFiles(bucketName: string, folder: string, optionalOptions?: SearchOptions, fetchOptions?: FetchParameters): Promise<FileObject[] | StorageError> {
    const { data, error } = await supabase.storage.from(bucketName).list(folder, optionalOptions, fetchOptions)

    if (error) throw error;
    return data;
}

/**
 * @function updateFile - Actualiza un archivo de un balde de almacenamiento
 * @param {string} bucketName - Nombre del balde
 * @param {string} path - Ruta del archivo
 * @param {AcceptedFiles} file - Archivo
 * @param {FileOptions} optionalOptions - Opciones opcionales
 * @returns {Promise<{path: string}>} - Promesa con la ruta del archivo
 * @throws {Error} - Si el balde no existe
 * @throws {Error} - Si el archivo no existe
 * @throws {Error} - Si no se ha podido actualizar el archivo
 * @example
 * await updateFile("bucketName", "path/to/file", file)
 * ==> Promise<void>
 */

async function updateFile(bucketName: string, path: string, file: AcceptedFiles, optionalOptions?: FileOptions): Promise<{path: string} | StorageError> {
    const { error, data } = await supabase.storage.from(bucketName).update(path, file, optionalOptions)

    if (error) throw error;
    return data
}

/**
 * @function moveFile - Mueve un archivo de un balde de almacenamiento
 * @param {string} bucketName - Nombre del balde
 * @param {string} path - Ruta del archivo
 * @param {string} newPath - Nueva ruta del archivo
 * @returns {Promise<{message: string}>} - Promesa con el mensaje.
 * @throws {Error} - Si el balde no existe
 * @throws {Error} - Si el archivo no existe
 * @throws {Error} - Si no se ha podido mover el archivo
 * @example
 * await moveFile("bucketName", "path/to/file", "new/path/to/file")
 * ==> Promise<void>
 */

async function moveFile(bucketName: string, path: string, newPath: string): Promise<{message: string} | StorageError> {
    const { error, data } = await supabase.storage.from(bucketName).move(path, newPath)

    if (error) throw error;
    return data
}

/**
 * @function copyFile - Copia un archivo de un balde de almacenamiento
 * @param {string} bucketName - Nombre del balde
 * @param {string} path - Ruta del archivo
 * @param {string} newPath - Nueva ruta del archivo
 * @returns {Promise<{path: string}>} - Promesa con el mensaje.
 * @throws {Error} - Si el balde no existe
 * @throws {Error} - Si el archivo no existe
 * @throws {Error} - Si no se ha podido copiar el archivo
 * @example
 * await copyFile("bucketName", "path/to/file", "new/path/to/file")
 * ==> Promise<void>
 */

async function copyFile(bucketName: string, path: string, newPath: string): Promise<{path: string} | StorageError> {
    const { error, data } = await supabase.storage.from(bucketName).copy(path, newPath)

    if (error) throw error;
    return data
}

/**
 * @function deleteFile - Elimina un archivo de un balde de almacenamiento
 * @param {string} bucketName - Nombre del balde
 * @param {string[]} paths - Rutas de los archivos
 * @returns {Promise<FileObject[] | StorageError>} - Promesa con el mensaje.
 * @throws {Error} - Si el balde no existe
 * @throws {Error} - Si el archivo no existe
 * @throws {Error} - Si no se ha podido eliminar el archivo
 * @example
 * await deleteFile("bucketName", ["path/to/file", "path/to/other/file"])
 * ==> Promise<void>
 */

async function deleteFile(bucketName: string, paths: string[]): Promise<FileObject[] | StorageError> {
    const { error, data } = await supabase.storage.from(bucketName).remove(paths)

    if (error) throw error;
    return data
}

/**
 * @function getPublicUrl - Obtiene la url pública de un archivo
 * @param {string} bucketName - Nombre del balde
 * @param {string} path - Ruta del archivo
 * @returns {Promise<string>} - Promesa con la url pública del archivo
 * @throws {Error} - Si el balde no existe
 * @throws {Error} - Si el archivo no existe
 * @throws {Error} - Si no se ha podido obtener la url pública del archivo
 * @example
 * await getPublicUrl("bucketName", "path/to/file")
 * ==> Promise<string>
 */

async function getPublicUrl(bucketName: string, path: string): Promise<{publicUrl: string}> {
    const { data } = await supabase.storage.from(bucketName).getPublicUrl(path)

    return data
}

/**
 * @function getSignedUrl - Obtiene la url firmada de un archivo
 * @param {string} bucketName - Nombre del balde
 * @param {string} path - Ruta del archivo
 * @param {number} expiry - Tiempo de expiración de la url
 * @returns {Promise<string>} - Promesa con la url firmada del archivo
 * @throws {Error} - Si el balde no existe
 * @throws {Error} - Si el archivo no existe
 * @throws {Error} - Si no se ha podido obtener la url firmada del archivo
 * @example
 * await getSignedUrl("bucketName", "path/to/file", 60)
 * ==> Promise<string>
 */

async function getSignedUrl(bucketName: string, path: string, expiry: number): Promise<{signedUrl: string} | StorageError> {
    const { data, error } = await supabase.storage.from(bucketName).createSignedUrl(path, expiry)

    if (error) throw error;
    return data
}

/**
 * @function createSignedUrls - Obtiene las url firmadas de un archivo
 * @param {string} bucketName - Nombre del balde
 * @param {string[]} paths - Rutas de los archivos
 * @param {number} expiry - Tiempo de expiración de la url
 * @returns {Promise<string[]>} - Promesa con las url firmadas de los archivos
 * @throws {Error} - Si el balde no existe
 * @throws {Error} - Si el archivo no existe
 * @throws {Error} - Si no se ha podido obtener las url firmadas de los archivos
 * @example
 * await createSignedUrls("bucketName", ["path/to/file", "path/to/other/file"], 60)
 * ==> Promise<string[]>
 */

async function createSignedUrls(bucketName: string, paths: string[], expiry: number): Promise<{signedUrl: string | null, path: string | null, error: string | null}[] | StorageError> {
    const { data, error } = await supabase.storage.from(bucketName).createSignedUrls(paths, expiry)

    if (error) throw error;
    return data
}

export const storage = {
    create,
    get,
    list,
    update,
    empty,
    delete: delete_,
    uploadFile,
    downloadFile,
    updateFile,
    listFiles,
    moveFile,
    copyFile,
    deleteFile,
    getPublicUrl,
    getSignedUrl,
    createSignedUrls
}