import express from 'express';
import { Worker } from 'worker_threads';

const app = express();
const port = 3000;

app.use(express.static('src'));

app.listen(port, ()=> {
   console.log(`connect succesfully ${port}`);
})

var request = require('request');

request('https://www.gnu.org/licenses/gpl-3.0.txt', function (error: Error, response: any, body: string) {
  if (!error && response.statusCode == 200) {
        let textObj = {}; 
        const worker = new Worker('./build/worker.js', {
          workerData: {
            value: body,
            path: './worker.ts'
          }
        });
        worker.on('message', (result) => {
          textObj = result;
          console.log(textObj);
          app.get('/text', (req,res)=> {
            res.json({text: textObj});
        })
        });
        
        
  }
});


