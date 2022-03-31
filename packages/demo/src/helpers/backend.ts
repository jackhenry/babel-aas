import { updateOutputText } from '../reducers/editorSlice';
import { AppDispatch, RootState } from "../store";

declare var env: any;

type BodySources = {
  [fileName: string]: string
}

type CompileRequestBody = {
  sources: BodySources,
  presets: string[],
  plugins: string[],
}

type CompileErrorResponseBody = {
  status: string,
  filePath: string,
  message: string
}

type CompileResponse = {
  results: BodySources | CompileErrorResponseBody
}

const isError = (x: any): x is CompileErrorResponseBody => {
  if (!x) return false;
  if ("message" in x) return true;
  return false
}

class Backend {
  private static DEFAULT_FILENAME = 'baas.js'

  private static async sendRequest(code: string, presets: string[], plugins: string[]): Promise<CompileResponse> {
    // Construct body
    const body: CompileRequestBody = { sources: {}, presets: [], plugins: [] }
    body.sources[Backend.DEFAULT_FILENAME] = code;
    body.presets = presets;
    body.plugins = plugins;
    // Execute the POST request
    const url = process.env.BAAS_SERVICE_URL;
    if (!url) throw new Error('BAAS_SERVICE_URL not set. No service to communicate with.');
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const json = await response.json();
      return json as CompileResponse
    } catch (exception: unknown) {
      console.error(exception);
      let message = "Unknown error";
      if (exception instanceof Error) {
        message = exception.message;
      }
      return {
        results: {
          status: 'unknown',
          filePath: Backend.DEFAULT_FILENAME,
          message
        }
      }
    }
  }

  public static async compileRequest(dispatch: AppDispatch, getState: () => RootState) {
    const state = getState();
    const inputText = state.editor.inputText;
    const presets = state.controls.presets;
    const plugins = state.controls.plugins;

    const response = await Backend.sendRequest(inputText, presets, plugins);

    if (!response.results) {
      return;
    }

    if (isError(response.results)) {
      dispatch(updateOutputText(response.results.message))
      return;
    }

    const { results } = response;
    dispatch(updateOutputText(Object.values(results)[0]))
  }
}

export default Backend;