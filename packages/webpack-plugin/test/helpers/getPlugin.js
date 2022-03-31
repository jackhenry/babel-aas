/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import path from "path";


export default () => require(path.resolve(__dirname, "../../src/plugin.js")).default;