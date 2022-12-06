
Babel as a Service (baas)
====

Instead of running babel transpilations locally, run them in the cloud.

This is the monorepo for baas. It contains the following packages:

1. `core` - The core baas transpilation microservice. Runs as an express api. Not designed to be accessible to external clients.
2. `gateway` - FastAPI microservice which receives and relays transpilation requests from clients. When it receives a request from a client, it forwards it to the `core` service.
3. `webpack-plugin` - A sample webpack plugin/loader. Sends transpilation requests to the backend services during webpack compilation.
4. `demo` - A simple demo which sends source code from a browser-based editor to the baas service.

Setup
====

```
git clone https://github.com/jackhenry/babel-aas.git
cd babel-aas
yarn install
yarn gateway deps
```

Running Demo Locally

```
yarn gateway dev
yarn core dev
yarn demo dev
```

`core` listens on `http://localhost:9002`
  - This can be changed in `package.json`
  - If you change this, update `$BAAS_SERVICE_URL` when running `gateway`
  
`gateway` listens on `http://localhost:9001`
  - This can be change in `main.py`
