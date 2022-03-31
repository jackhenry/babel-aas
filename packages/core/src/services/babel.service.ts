import * as babel from '@babel/core';
import { ApiException, CompileError } from '../exception';
import { CompileRequest, Sources } from '../types';

async function compileCode(
  filePath: string,
  code: string,
  presets: string[],
  plugins: string[],
): Promise<string | CompileError> {
  const compileError = new CompileError('Unable to compile', filePath);
  try {
    const result = await babel.transformAsync(code, {
      presets, plugins, highlightCode: false, filename: filePath,
    });
    if (!result || !result?.code) return compileError;
    return result.code;
  } catch (exception: unknown) {
    try {
      compileError.message = (exception as Error).message;
    } catch (conversionError) {
      //
    }
    return compileError;
  }
}

// eslint-disable-next-line import/prefer-default-export
async function compileSources(compileRequest: CompileRequest): Promise<Sources | ApiException> {
  const { sources, presets, plugins } = compileRequest;
  const sourceEntries = Object.entries(sources);

  // const exceptions: ApiException[] = [];
  const newSources: Sources = {};
  try {
    const results = await Promise.all(sourceEntries.map(async ([filePath, source]) => {
      const compiled = await compileCode(filePath, source, presets, plugins);
      if (compiled instanceof ApiException) throw compiled;
      return [filePath, compiled];
    }));

    results.forEach(([filePath, compiled]) => {
      newSources[filePath] = compiled;
    });
  } catch (exception: unknown) {
    if (exception instanceof CompileError) return exception;
    return new CompileError('Error while compiling files', 'unknown');
  }

  return newSources;
}

const BabelService = {
  compileSources,
};

export default BabelService;
