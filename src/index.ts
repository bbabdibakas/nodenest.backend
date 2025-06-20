import express from 'express'
import cors from 'cors'
import router from "./router/router";
import errorMiddleware from "./middlewares/errorMiddleware";

const port = 8080
const app = express();
app.use(cors())
app.use(express.json());
app.use('/api/v1', router);
app.use(errorMiddleware);

const main = async () => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
}

void main()