const CODE_NOT_FOUND = "NOT_FOUND"

function NotFound(message) {
    const error = new Error(message);
    error.code = CODE_NOT_FOUND;
    return error;
}

NotFound.prototype = Object.create(Error.prototype);

exports.NotFound = NotFound
exports.CODE_NOT_FOUND = CODE_NOT_FOUND