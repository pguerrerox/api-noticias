'use strict'

const sites = [
  {
    "site": "diariolibre",
    "baseUrl": "https://www.diariolibre.com/cronologia/ver/meta/",
    "param": ["politica","deportes","cultura"],
    "selector": "body"
  },
  {
    "site": "listindiario",
    "baseUrl": "https://www.listindiario.com/buscar?find=",
    "param": ["politica","deportes","cultura"],
    "selector": "body"
  }
]

module.exports = sites;