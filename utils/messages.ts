const MESSAGES = {
    ACCOUNT_BLOCKED: 'Account has been blocked by some reson contact administrator',
    USERNAME_EXISTS: 'Username already exists',
    USERNAME_ALREADY_SET: "Username already set",
    USER_NOT_EXISTS: 'User does not exist',
    APRS_NOT_EXISTS: 'APRS does not exist',
    USER_ALREADY_EXISTS: 'User with the given username or email or phone already exists',
    VENDOR_ALREADY_EXISTS: 'Vendor with the given name already exists',
    PRODUCT_ALREADY_EXISTS: 'Product with the given name already exists',
    VENDOR_NOT_EXISTS: 'Vendor does not exists',
    PRODUCT_NOT_EXISTS: 'Product does not exists',
    USER_PHONE_ALREADY_EXISTS: 'User with the given phone already exists',
    APRS_ALREADY_EXISTS: 'APRS with the given name already exists',
    USER_EMAIL_ALREADY_EXISTS: 'User with the given email already exists',
    USER_PROFILE_PICTURE_ADDED: 'File uploaded successfully',
    USER_PROFILE_PICTURE_DELETED: 'File deleted successfully',
    LOGIN_ERROR_USER_ACCOUNT_DEACTIVATED: 'Sorry, your account is deactivated. Please contact administrator for more details',
    LOGIN_ERROR_USER_EMAIL_NOT_FOUND: 'Sorry, this email is not associated with us. Please enter a valid email address',
    LOGIN_ERROR_USER_SESSION_OVERRIDE: 'Sorry, your current session is expired as you are logged in on another device',
    LOGIN_ERROR_USER_ACCESS_TOKEN_INVALID: 'Sorry, you are not authorised. Please login again to continue',
    ROLE_NOT_EXISTS: 'Role does not exist',
    ROLE_DELETE_SUCCESS: 'Role deleted successfully',
    APRS_DELETE_SUCCESS: 'Privilege deleted successfully',
    USER_ATTACHED_TO_ROLE_ALREADY: 'There are users attached to this privilege. Please disassociate the users before deleting this role',
    USER_ATTACHED_TO_APRS_ALREADY: 'There are users attached to this privilege. Please disassociate the users before deleting this attachable PRS',
    ROLE_HIERARCHY_PRESENT: 'This role cannot be deleted. This role is parent entity of other roles.',
    ROLE_ALREADY_EXISTS: 'Role with the given name already exists',
    TEMPLATE_NOT_EXISTS: 'Template does not exist',
    TEMPLATE_ALREADY_EXISTS: 'Template with the given name already exists',
    RESOURCE_ALREADY_EXISTS: 'Resource with the given name already exists',
    FORGOT_PASSWORD_SUCCESS: 'A temporary password is sent to your email address',
    RESEND_INVITATION_SUCCESS: 'Invitation sent successfully',
    FORGOT_PASSWORD_FAILURE_ACCOUNT_LOCKED: 'Sorry, your account is deactivated. Please contact administrator for more details',
    SET_PASSWORD_SUCCESS: 'Password has been changed successfully',
    RESET_PASSWORD_SUCCESS: 'Password has been reset successfully',
    CHANGE_PASSWORD_SUCCESS: 'Password has been changed successfully',
    HANDLE_EXISTS: 'Handle with the given name already exists',
    NOT_ADMIN: "You are not admin",
    SESSION_NOT_FOUND : "Session not found"
};

export default MESSAGES;