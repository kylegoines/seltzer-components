// fix type makes some opinionated decisions about the data you ment to pass to the component

function isNumeric(str) {
    return (
        !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
    ) // ...and ensure strings of whitespace fail
}

function isBoolean(str) {
    if (str.toLowerCase() === 'true' || str.toLowerCase() === 'false') {
        return true
    } else {
        return false
    }
}

const fixType = (primitive) => {
    if (isBoolean(primitive)) {
        if (primitive.toLowerCase() === 'true') {
            return true
        } else {
            return false
        }
        // if looks like a boolean return as bool
    } else if (isNumeric(primitive)) {
        // if looks like a number
        return parseFloat(primitive)
    } else {
        // if not any above they probably ment to return a string
        return primitive
    }
}

export default fixType
