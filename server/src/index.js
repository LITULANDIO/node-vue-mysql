const app = require('./app')


app.listen(app.get('port'), () => {
    console.log('servidor escoltant al port', app.get('port'))
})