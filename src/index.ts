import express, {Request, Response} from 'express'

const port = 8080
const app = express();
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello, World!');
})

const main = async () => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
}

void main()