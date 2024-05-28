import {Router} from 'express'
import pool from '../database.js'
import multer from 'multer';
import path from 'path'

const router = Router();
/* ------------------------------- conf de img ------------------------------- */
const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req, file, cb) => {                          //Mayor o = 0 y Menor que 1
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({storage})

/* ------------------------ ver el formulario a crear ----------------------- */
router.get('/add', (req, res) =>{
    res.render('personajes/add')
});


/* ------------------------------ trae la info del formulario------------------------------ */
router.post('/add', upload.single('file'), async (req, res) => {
    try {
        const {name,last_name,gender,species,character_type,characteristics,age} = req.body
        let newPersonaje = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            newPersonaje ={name,last_name,gender,species,character_type,characteristics,age,imagen}

        }else{
            newPersonaje ={
                name,last_name,gender,species,character_type,characteristics,age
            }

        }  
        await pool.query('INSERT into  personajes set ?',[newPersonaje]);
        res.redirect('/list');     
        }catch(error) {
        res.status(500).json({message:error.message});
        }
});


router.get('/list', async(req, res) => { 
    try {
     const [result] = await pool.query('SELECT * FROM personajes');
        res.render('personajes/list', {personajes: result})      
    }catch(error) {
    res.status(500).json({message:error.message});
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM personajes WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [personaje] = await pool.query('SELECT * FROM personajes WHERE id = ?', [id]);
        const personajeEdit = personaje[0]
        res.render('personajes/edit', { personaje: personajeEdit })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/edit/:id',  upload.single('file'), async (req, res) => {
    try {
        const { id } = req.params
        const {name,last_name,gender,species,character_type,characteristics,age} = req.body
        let editPersonaje = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            editPersonaje = {name,last_name,gender,species,character_type,characteristics,age,imagen}
        }else{
            editPersonaje = {name,last_name,gender,species,character_type,characteristics,age}
        }
        await pool.query('UPDATE personajes SET ? WHERE id = ?', [editPersonaje, id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




export default router;