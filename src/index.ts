import express from 'express'
import router from "./router/router";

const port = 8080
const app = express();
app.use(express.json());
app.use('/api/v1', router);

const main = async () => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
}

void main()