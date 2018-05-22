Node Shapeways 2018 (shapeways-alva)
==============

[![CodeFactor](https://www.codefactor.io/repository/github/yazeenj/shapeways-alva/badge/master)](https://www.codefactor.io/repository/github/yazeenj/shapeways-alva/overview/master)
![license](https://img.shields.io/github/license/mashape/apistatus.svg)
![npm](https://img.shields.io/badge/npm-v.5.6.0-blue.svg)
![node](https://img.shields.io/badge/node-v8.9.4-brightgreen.svg)

Custom node.js module for accessing the [Shapeways](http://www.shapeways.com) api using oAuth 2.
By Project alva.<br/>
![Shapewayslogo](https://www.shapeways.com/rrstatic/img/sw-logo-dark-blue.svg)

## Installation
### NPM
```bash
npm install shapeways-alva
```

## Documentation
### API CALLS

- authorize(params,callback)
- getModels(callback)
- getMaterials(callback)
- getCategories(callback)
- getPrinters(callback)
- getCart(callback)
- getModelInfo(modelId, callback)
- addToCart(params, callback)
- addModel(params, callback)
- deleteModel(modelId, callback)
- updateModelInfo(modelId, params, callback)
- getModelFile(modelId, fileVersion, callback)
- addModelPhoto(modelId, params, callback)

### Checkout API (REQUIRES PERMISSION TO USE)

- getOrders(callback)
- getOrderInfo(orderId, callback)
- createOrder(parmas, callback)

### HTTP Request Handling

- getReq(url, callback)
- postReq(url, params, callback)
- putReq(url, params, callback)
- deleteReq(url, callback)

## Example

*(See /testing folder in github-repo for more examples)*

Import module

```js

const shapeways = require('shapeways-alva');

```

Performing a 'GET' request

```js

shapeways.getModels(function(err,resp){
  if(err){
    console.log(err);
  }
  console.log(resp);
});

```

Performing a 'POST' request

```js

var params = {
  modelId: 1234567,
  materialId: 4, //4: Transparent Acrylic
  quantity: 1
};

shapeways.addToCart(params, function(err,resp){
  if(err){
    console.log(err);
  }
  console.log(resp);
});

```
> **NOTE:** `resp` and `err` is a JSON objects, tip: JSON.stringify().

## License
  ```
  The MIT License (MIT) Copyright (c) 2014 Brett Langdon <brett@blangdon.com>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights to
  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
  of the Software, and to permit persons to whom the Software is furnished to do
  so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
  OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  ```
