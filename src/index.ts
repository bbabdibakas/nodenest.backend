import express from 'express'
import cors from 'cors'
import {EnvService} from "./services/envService";
const envService = new EnvService()
import router from "./router/router";
import errorMiddleware from "./middlewares/errorMiddleware";

const port = envService.PORT
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