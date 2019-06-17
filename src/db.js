const mongoose = require('mongoose')
const Logger = mongoose.mongo.Logger
const assert = require('assert')

const connectToDB = (url = 'mongodb://localhost:27017/lionesscodet') => {
    let logCount = 0
    Logger.setCurrentLogger((msg, state) => {
        console.log(`MONGO DB REQUEST ${++logCount}: ${msg}`)
    })
    Logger.setLevel('debug')
    Logger.filter('class', ['Cursor'])
    console.log('Connected successfully to server')
    return mongoose.connect(url, { autoIndex: false, useNewUrlParser: true })
}
module.exports = connectToDB

// const { Logger, MongoClient } = require( 'mongodb' );
// const assert = require( 'assert' );
// const url = 'mongodb://localhost:27017';

// const dbName = 'go4itest';

// const db1 = async () => {
// 	const client = await MongoClient.connect( url, { useNewUrlParser: true } );
// 	const db = client.db( dbName );

// 	let logCount = 0;
// 	Logger.setCurrentLogger( ( msg, state ) => {
// 		//console.log( `MONGO DB REQUEST ${ ++logCount }: ${ msg }` );
// 	} );
// 	Logger.setLevel( 'debug' );
// 	Logger.filter( 'class', ['Cursor'] );

// 	console.log( "Connected successfully to server" );

// 	//	console.log(db)
// 	return {
// 		user: db.collection( 'user' ),
// 		party: db.collection( 'party' ),
// 		qbank: db.collection( 'qbank' )
// 	};
// }

// export { db1 as default }
