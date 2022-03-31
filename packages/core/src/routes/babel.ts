import { NextFunction, Response, Router } from 'express';
import { BabelService } from '../services';
import { CompileRequest, CustomRequest, Sources } from '../types';
import { ApiException } from '../exception';

async function compile(
  req: CustomRequest<CompileRequest>,
  res: Response<Sources | ApiException>,
  next: NextFunction,
): Promise<void> {
  const compiledSources = await BabelService.compileSources(req.body);
  if (compiledSources instanceof ApiException) {
    next(compiledSources);
  } else {
    res.json(compiledSources);
  }
}

function babelRoutes() {
  const router = Router();
  router.post('/', compile);
  return router;
}

export default babelRoutes;
