
const jsxCode = "import React from 'react';\nimport ReactDOM from 'react-dom'\n\n" +
  'export default function() {\n\treturn (\n \t<div>\n \t<span>Hi Arna</span>\n </div>\n )\n}';

const defaultCode = 'import axios from "axios";\n\n/**\n * \n * @param {string} url ' +
  '- url of baas server\n * @param {object} body - json body\n * @returns \n */\nasync function ' +
  'post(url, body) {\n const response = await axios.post(url, body);\n return response.data;\n}\n\n' +
  'export default {\n post,\n};';

export {
  jsxCode,
  defaultCode,
};