class errorHandler extends Error {
    /**
     * 
     * @param {'Bad Request from client side'} message Error msg to be showed. Ex.: Unauthorized to access
     * @param {400} status HTTP status. Ex.: 401
     */
    constructor(message, status = 400) {
        super()
        this.message = message
        this.status = status
    }
}

module.exports = {errorHandler}

