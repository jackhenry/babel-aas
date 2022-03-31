import {
  compile,
  getCompiler,
  getPlugin
} from "./helpers";

jest.setTimeout(30000);

describe("plugin", () => {
  it("should work", async () => {
    const testId = "./index.js";
    const Plugin = getPlugin();
    const compiler = getCompiler(testId, [new Plugin({
      sourceDir: __dirname,
      serverUrl: "http://localhost:9001",
      presets: ["@babel/preset-env"]
    })]);
    await compile(compiler);
  });
});