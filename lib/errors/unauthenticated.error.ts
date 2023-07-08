import {ERRORS} from './errors';

export class UnauthenticatedError extends Error {
    code : number;
    constructor(message = ERRORS.UNAUTHENTICATED_ERROR.message) {
        super(message);
        this.name = ERRORS.UNAUTHENTICATED_ERROR.name;
        this.code = ERRORS.UNAUTHENTICATED_ERROR.code;
    }
}
