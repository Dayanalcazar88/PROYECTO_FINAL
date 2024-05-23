/* -------------------------- importar dependencias ------------------------- */
import express, { urlencoded } from 'express'
import morgan from 'morgan'

import {join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import {engine} from 'express-handlebars';





/* ----------------------------- inicialization ----------------------------- */
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

/* --------------------------------- setting -------------------------------- */
app.set('port', process.env.PORT || 3000)

app.set('views',join(__dirname, 'views'))
app.engine('.hbs' ,engine({
    defaultLayout:'main',
    layoutsDir:join(app.get('views'),'layouts'),
    partialsDir: join(app.get('views'),'partials'),
    extname:'.hbs'

}));
app.set('view engine', '.hbs');


/* ------------------------------- middlewares ------------------------------ */
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))
app.use(express.json());

/* --------------------------------- routes --------------------------------- */
app.get('/',(re, res) => {
    res.json({"message":"hola mundo"})
});

/* ------------------------------ public files ------------------------------ */
app.use(express.static(join(__dirname, 'public')))

/* ------------------------------- run server ------------------------------- */
app.listen(app.get('port'), () =>{
    console.log('server listening on port', app.get('port'));
});
