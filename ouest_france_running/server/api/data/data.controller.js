/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /datas              ->  index
 * POST    /datas              ->  create
 * GET     /datas/:id          ->  show
 * PUT     /datas/:id          ->  update
 * DELETE  /datas/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

//Récupérer les données 
exports.index = function(req, res) {
  res.json([
  {
    // On mettra les données du hyblab aussi
  }
  ]);
};
