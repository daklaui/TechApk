
export const isEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


export const isValidationPassword = (password) => {

    /**
     *  (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
        (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
        (?=.*[0-9])	The string must contain at least 1 numeric character
        (?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
        (?=.{8,})	The string must be eight characters or longer
    */
    const chaineValidation=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;
    return chaineValidation.test(password);
}


export const isConfirmePassword = (password,confirmePassword) => {
    return password==confirmePassword;
}



export const isEmpty = (thing) => {
    let empty = false;

    switch (typeof thing) {
        case 'undefined':
            empty = true;
            break;
        case 'string':
            if (thing.trim().length === 0) {
                empty = true;
            }
            break;
        case 'object':
            if (thing === null) {
                empty = true;
            } else if (Object.keys(thing).length === 0) {
                empty = true;
            }
            break;
        default:
            empty = true;
    }

    return empty;
}