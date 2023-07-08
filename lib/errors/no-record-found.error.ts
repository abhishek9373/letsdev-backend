import {ERRORS} from './errors';

export class NoRecordFoundError extends Error {
    code : number;
    constructor(message = ERRORS.NO_RECORD_FOUND_ERROR.message) {
        super(message);
        this.name = ERRORS.NO_RECORD_FOUND_ERROR.name;
        this.code = ERRORS.NO_RECORD_FOUND_ERROR.code;
    }
}
