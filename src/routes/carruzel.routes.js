import express, { urlencoded } from 'express'

const app = express();
const router = express.Router();


router.get('/carruzel', (req, res) =>{
    res.render('carruzel/imagenes')
});
export default router;