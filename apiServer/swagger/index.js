(function () {


    var info = require('./info.json')
    const modules = require('./modules/index')
    //footer section
    const footer = require('./footer.json')

    let swaggerPayload = {
        ...info,
        ...modules,
        ...footer
    }
    module.exports = swaggerPayload
})()
