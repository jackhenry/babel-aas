import bodyParser from 'body-parser';
import express from 'express';
import { errorMiddleware } from './middleware';

import { babelRoutes } from './routes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddleware() {
    this.app.use(bodyParser.json());
  }

  private initializeRoutes() {
    this.app.use(babelRoutes());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
