const { MemcachedCache } = require('apollo-server-memcached')
import express from 'express'
import compression from 'compression'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import { crunch } from 'graphql-crunch'
import url from 'url'
import querystring from 'querystring'
const gqlServerConfig = require('./api')

require('./db')()

import multer from 'multer'
import path from 'path'

var upload = multer({
    // dest: config.misUploadLocation
    dest: path.join(__dirname, '../../uploads'),
})

const server = new GraphQLServer(gqlServerConfig)

const serverOptions = {
    port: 11002,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/playground',
    tracing: true,

    debug: true,
    persistedQueries: {
        cache: new MemcachedCache(
            ['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
            { retries: 10, retry: 10000 } // Options
        ),
    },
}

server.express.use('/qbank', upload.single('docxFile'), (req, res) => {
    const qbank1 = Qbank(req, res)

    res.send(qbank1)
})
server.express.use(compression({ filter: shouldCompress }))

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}

// var xlsx = require('xlsx');
// const wb = xlsx.readFile(path.join(__dirname, '../../uploads/sample.xlsx').replace(/_/g, "/").replace(/-/g, "+"), { type: 'base64' });

// const ws = wb.Sheets[wb.SheetNames[0]];

// const data = xlsx.utils.sheet_to_json(ws)
// console.log(data)

var mammoth = require('mammoth')

var options = {
    convertImage: mammoth.images.imgElement(function(image) {
        return image.read('base64').then(function(imageBuffer) {
            return {
                src: 'data:' + image.contentType + ';base64,' + imageBuffer,
            }
        })
    }),
}

// mammoth
//     .convertToHtml({ path: path.join(__dirname, '../../uploads/1558315001761qbank.docx') }, options)
//     .then(function(result) {
//         var html = result.value // The generated HTML
//         var messages = result.messages // Any messages, such as warnings during conversion
//         console.log(html)
//     })
//     .done()

//var XLSX = require('xlsx-extract').XLSX;

// var fs = require('fs')
// var unzip = require('unzip')
// fs.createReadStream('../uploads/sample.xlsx').pipe(unzip.Extract({ path: '../uploads' }));

// var parseString = require('xml2js').parseString;

// parseString(path.join(__dirname, '../../uploads/xl/worksheets/sheet1.xml'), function (err, result) {
// 	console.log(result)
// 	const jsonTextFromXML = JSON.stringify(result)
// 	console.log(result, jsonTextFromXML);
// });

// var parser = require('fast-xml-parser');
// var he = require('he');
// const xmlData = path.join(__dirname, '../../uploads/[Content_Types].xml')

// var options = {
// 	attributeNamePrefix: "@_",
// 	attrNodeName: "attr", //default is 'false'
// 	textNodeName: "#text",
// 	ignoreAttributes: true,
// 	ignoreNameSpace: false,
// 	allowBooleanAttributes: false,
// 	parseNodeValue: true,
// 	parseAttributeValue: false,
// 	trimValues: true,
// 	cdataTagName: "__cdata", //default is 'false'
// 	cdataPositionChar: "\\c",
// 	localeRange: "", //To support non english character in tag/attribute values.
// 	parseTrueNumberOnly: false,
// 	attrValueProcessor: a => he.decode(a, { isAttributeValue: true }),//default is a=>a
// 	tagValueProcessor: a => he.decode(a) //default is a=>a
// };

// if (parser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
// 	var jsonObj = parser.parse(xmlData, options);
// }

// // Intermediate obj
// var tObj = parser.getTraversalObj(xmlData, options);
// var jsonObj = parser.convertToJson(tObj, options);
// console.log(jsonObj)

server.express.use('/static', express.static(path.join(__dirname, '../../uploads')))

server.start(serverOptions, ({ port }) => console.log(`Server on port ${port}`))
