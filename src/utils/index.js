export const debounce = function (func, wait = 100) {
    let timeout
    function debounceFunc(...args) {
        if (args[0] && args[0].persist) {
            args[0].persist()
        }
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            timeout = null
            func.apply(this, args)
        }, wait);
    }
    debounceFunc.cancel = function () {
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }
    }
    return debounceFunc
}