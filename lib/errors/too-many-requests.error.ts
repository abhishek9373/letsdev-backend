import {ERRORS} from './errors';

export class TooManyRequestsError extends Error {
    code : number;
    constructor(message = ERRORS.TOO_MANY_REQUESTS_ERROR.message) {
        super(message);
        this.name = ERRORS.TOO_MANY_REQUESTS_ERROR.name;
        this.code = ERRORS.TOO_MANY_REQUESTS_ERROR.code;
    }
}
