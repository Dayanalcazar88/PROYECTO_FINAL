
import {createPool} from 'mysql2/promise';

const pool = createPool({
    host:'localhost',
    port:'3306',
    user:'dayana',
    password:'justindayana',
    database:'video_game'

});

export default pool;