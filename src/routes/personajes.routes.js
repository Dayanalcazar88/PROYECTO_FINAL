import {Router} from 'express'
import pool from '../database.js'

const router = Router();

/* ------------------------ ver el formulario a crear ----------------------- */
router.get('/add', (req, res) =>{
    res.render('personajes/add')
});

/* ------------------------------ trae la info del formulario------------------------------ */
router.post('/add', async (req,res)=>{
    try {
        const {name,last_name,gender,species,character_type,characteristics,age} = req.body
        const newPersonajes ={name,last_name,gender,species,character_type,characteristics,age}

        await pool.query('insert into  personajes set ?',[newPersonajes]);
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


router.post('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const {name,last_name,gender,species,character_type,characteristics,age} = req.body
        const editpersonaje={name,last_name,gender,species,character_type,characteristics,age}
        
        await pool.query('update personajes set ? WHERE id = ?', [editpersonaje,id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




export default router;