import {ERRORS} from './errors';

export class DuplicateRecordFoundError extends Error {
    code : number;
    constructor(message = ERRORS.DUPLICATE_RECORD_FOUND_ERROR.message) {
        super(message);
        this.message = message;
        this.name = ERRORS.DUPLICATE_RECORD_FOUND_ERROR.name;
        this.code = ERRORS.DUPLICATE_RECORD_FOUND_ERROR.code;
    }
}
