//REQUIRED NPM MODULES
const axios = require('axios');
const url = require('url');
const querystring = require('querystring');

//oAuth Options
var client = {
  access_token: '',
  token_type: ''
};

//Api options
var api = {
  rootUrl: 'https://api.shapeways.com',
  version: 'v1'
}

/*
  HTTP REQUEST HANDLING @Axios
*/

//MAKE HTTP REQUEST GET USING @Axios
function getReq(url,callback){

  var axiosConfig = {
    headers: {
      'Authorization': "Bearer " + client.access_token
    }
  };

  if (!client.access_token) {
    return callback("No access token, make sure to call .authorize");
  }

  axios.get(url,axiosConfig)
  .then(response =>{
    callback(null,response.data);
  })
  .catch(error => {
    callback(error.response.data);
  });

};

//MAKE HTTP REQUEST POST USING @Axios
function postReq(url,params,callback){

  var axiosConfig = {
    headers: {
      'Authorization': "Bearer " + client.access_token
    }
  };

  if (!client.access_token) {
    return callback("No access token, make sure to call .authorize");
  }

  axios.post(url,params,axiosConfig)
    .then(response => {
      callback(null,response.data);
    })
    .catch(error => {
      callback(error.response.data);
    });

};

//MAKE HTTP REQUEST PUT USING @Axios
function putReq(url,params,callback){

  var axiosConfig = {
    headers: {
      'Authorization': "Bearer " + client.access_token
    }
  };

  if (!client.access_token) {
    return callback("No access token, make sure to call .authorize");
  }

  axios.put(url,params,axiosConfig)
  .then(response => {
    callback(null,response.data);
  })
  .catch(error => {
    callback(error.response.data);
  });
};

//MAKE HTTP REQUEST DELETE USING @Axios
function deleteReq(url,callback){

  var axiosConfig = {
    headers: {
      'Authorization': "Bearer " + client.access_token
    }
  };

  if (!client.access_token) {
    return callback("No access token, make sure to call .authorize");
  }

  axios.delete(url,axiosConfig)
  .then(response =>{
    callback(null,response.data);
  })
  .catch(error =>{
    callback(error.response.data);
  });

};

/*
  oAuth GET ACCESS TOKEN @oAuth
*/

//[POST] MAKE API CALL "/oauth2/token" TO GET ACCESS TOKEN
function authorize (params,callback){

  axios.post(api.rootUrl +'/oauth2/token', querystring.stringify({
      grant_type: "client_credentials",
      client_id: params.client_id,
      client_secret: params.client_secret
    }))
    .then(response => {
      client.access_token = response.data.access_token;
      client.token_type = response.data.token_type;
      callback(response.data); //Print access token [JSON]
    })
    .catch(error => {
      callback(error.response.data);
    });

};

/*
  API CALLS FUNCTIONS
*/

//[GET] MAKE API CALL "/models/v1" TO GET MODELS
function getModels(callback){
  getReq(api.rootUrl + '/models/' + api.version, callback);
};

//[GET] MAKE API CALL "/printers/v1" TO GET PRINTERS
function getPrinters(callback){
  getReq(api.rootUrl + '/printers/' + api.version, callback);
};

//[GET] MAKE API CALL "/models/{modelId}/info/v1" TO GET MODEL INFO
function getModelInfo(modelId,callback){
  getReq(api.rootUrl + "/models/" + modelId + "/info/" + api.version, callback);
};

//[GET] MAKE API CALL "/orders/cart/v1" TO GET CART
function getCart(callback){
  getReq(api.rootUrl + "/orders/cart/" + api.version, callback);
};

//[POST] MAKE API CALL "/orders/cart/v1" TO ADD MODEL TO CART
function addToCart(params,callback){
  postReq(api.rootUrl + "/orders/cart/" + api.version, params, callback);
};

//[POST] MAKE API CALL "/models/v1" TO ADD UPLOAD MODEL FILE
function addModel(params,callback){
  params.file = new Buffer(params.file).toString("base64");
  postReq(api.rootUrl + "/models/" + api.version, params, callback);
};

//[DELETE] MAKE API CALL "/models/{modelId}/v1" TO DELETE MODEL
function deleteModel(modelId,callback){
  deleteReq(api.rootUrl + "/models/" + modelId + '/' + api.version, callback);
};

//[PUT] MAKE API CALL "/models/{modelId}/info/v1" TO UPDATE MODEL
function updateModelInfo(modelId,params,callback){
  putReq(api.rootUrl + "/models/" + modelId + "/info/" + api.version, params, callback);
};

//[GET] MAKE API CALL "/models/{modelId}/files/{fileVersion}/v1" + PARAM {file} TO GET MODEL FILE
function getModelFile(modelId,fileVersion,callback){
  getReq(api.rootUrl + "/models/" + modelId + "/files/" + fileVersion + "/" + api.version + "?file=1", callback);
};

//[GET] MAKE API CALL "/categories/v1" TO GET CATEGORIES
function getCategories(callback){
  getReq(api.rootUrl + "/categories/" + api.version, callback);
};

//[GET] MAKE API CALL "/materials/v1" TO GET MATERIALS
function getMaterials(callback){
  getReq(api.rootUrl + "/materials/" + api.version, callback);
};

//[POST] MAKE API CALL "models/{modelId}/photos/v1" TO ADD MODEL PHOTO
function addModelPhoto(modelId,params,callback){
  params.file = new Buffer(params.file).toString("base64");
  postReq(api.rootUrl + "/models/" + modelId + "/photos/" + api.version, params ,callback);
};



/*
  ORDER API - (REQUIRES PERMISSION TO USE)
*/

//[GET] MAKE API CALL "/orders/v1" TO GET ORDER
function getOrders(callback){
  getReq(api.rootUrl + "/orders/" + api.version, callback);
}

//[GET] MAKE API CALL "/orders/{orderId}/v1" TO GET ORDERS
function getOrderInfo(orderId,callback){
  getReq(api.rootUrl + "/orders/" + orderId + "/" + api.version, callback);
}

//[POST] MAKE API CALL "/orders/v1" TO CREATE ORDER - WARNING: THIS CALL WILL CREATE A REAL ORDER (LIVE VERSION).
function createOrder(params,callback){
  postReq(api.rootUrl + "/orders/" + api.version, params, callback);
};

//Export Functions
module.exports = {
  authorize: authorize,
  getModels: getModels,
  getPrinters: getPrinters,
  getModelInfo: getModelInfo,
  addModel: addModel,
  addToCart: addToCart,
  getCart: getCart,
  deleteModel: deleteModel,
  updateModelInfo: updateModelInfo,
  getModelFile: getModelFile,
  getOrders: getOrders,
  getCategories: getCategories,
  getMaterials: getMaterials,
  addModelPhoto: addModelPhoto,
  getOrderInfo: getOrderInfo,
  createOrder: createOrder
};
