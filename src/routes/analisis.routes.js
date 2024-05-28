import express, { urlencoded } from 'express'

const app = express();
const router = express.Router();


router.get('/analisis', (req, res) =>{
    res.render('analisis/info')
});
export default router;