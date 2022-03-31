import { Request } from 'express';

type BabelPreset = string;
type BabelPlugin = string;
type FilePath = string;
type FileSource = string;

export type Sources = {
  [name: FilePath]: FileSource
};

export type CompileRequest = {
  sources: Sources,
  presets: BabelPreset[],
  plugins: BabelPlugin[],
}

export interface CustomRequest<T> extends Request {
  body: T
}
