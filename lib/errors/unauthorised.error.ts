import {ERRORS} from './errors';

export class UnauthorisedError extends Error {
    code : number;
    constructor(message = ERRORS.UNAUTHORISED_ERROR.message) {
        super(message);
        this.name = ERRORS.UNAUTHORISED_ERROR.name;
        this.code = ERRORS.UNAUTHORISED_ERROR.code;
    }
}

module.exports = UnauthorisedError;