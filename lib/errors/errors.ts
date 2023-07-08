export const ERRORS = {
    UNAUTHENTICATED_ERROR: {
        code: 401,
        name: 'UNAUTHENTICATED_ERROR',
        message: 'Unauthenticated'
    },
    UNAUTHORISED_ERROR: {
        code: 403,
        name: 'UNAUTHORISED_ERROR',
        message: 'Permission denied'
    },
    NO_RECORD_FOUND_ERROR: {
        code: 400,
        name: 'NO_RECORD_FOUND_ERROR',
        message: 'Record not found'
    },
    DUPLICATE_RECORD_FOUND_ERROR: {
        code: 400,
        name: 'DUPLICATE_RECORD_FOUND_ERROR',
        message: 'Duplicate record found'
    },
    BAD_REQUEST_PARAMETER_ERROR: {
        code: 400,
        name: 'BAD_REQUEST_PARAMETER_ERROR',
        message: 'Bad request parameter'
    },
    TOO_MANY_REQUESTS_ERROR: {
        code: 429,
        name: 'TOO_MANY_REQUESTS_ERROR',
        message: 'Too many requests'
    },
    EMAIL_ADDRESS_NOT_VERIFIED: {
        code: 403,
        name: 'EMAIL_ADDRESS_NOT_VERIFIED',
        message: 'Email address not verified'
    }
}
