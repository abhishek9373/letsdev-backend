import {ERRORS} from './errors';

export class BadRequestParameterError extends Error {
    code : number;
    constructor(message = ERRORS.BAD_REQUEST_PARAMETER_ERROR.message) {
        super(message);
        this.name = ERRORS.BAD_REQUEST_PARAMETER_ERROR.name;
        this.code = ERRORS.BAD_REQUEST_PARAMETER_ERROR.code;
    }
}
