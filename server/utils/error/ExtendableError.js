/**
 * @extends Error
 */
export default class ExtendableError extends Error {
    /**
     * @method constructor
     * @param {String} message - Error message
     * @param {Number} status - HTTP status code of error
     * @param {Boolean} isPublic - Determines error message visibility to user
     */
    constructor(message, status, isPublic) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.isPublic = isPublic;
        this.message = message;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor.name);
    }
}
