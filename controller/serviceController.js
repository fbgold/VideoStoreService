var express = require('express');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const Actor = db.actor;
const Movie = db.movie;
const Category = db.category;
const Store = db.store;
const Address = db.address;
const City = db.city;
const Country = db.country;
const Staff = db.staff;

const router = express.Router();

router.get("/countries/",(req,res) =>{
	let filter ={
		
		attributes: ['country_id','country'],
		order: [[ 'country','ASC' ]]
	}
	Country.findAll(filter)
	.then(country=>{
		res.send(200, country);
	})
})

router.get("/states/:countryId",(req,res) =>{
	if (isNaN(countryId = checkId(req.params.countryId))) {
		res.send("id must be a valid number");
		return;
	}

	let getStatesQuery = db.rawQuery.getStates;

	db.connection.query(getStatesQuery,{replacements:{countryCode: countryId}, type: db.connection.QueryTypes.SELECT})
	.then(result=>{
		console.log(result);
		res.send(result);

	})

});

router.get("/cities/:stateName",(req,res) =>{
	state = req.params.stateName;
	let getCitiesQuery = db.rawQuery.getCities;
	db.connection.query(getCitiesQuery,{replacements:{stateName: state}, type: db.connection.QueryTypes.SELECT})
	.then(result=>{
		console.log(result);
		res.send(result);
	})

});

/*
router.get("/cities/:countryId",(req,res) =>{
	const countryId = parseInt(req.params.countryId);
	if (countryId > 0) 
		whereClause = {country_id: countryId}
	else
		whereClause = null ;

	let filter ={
		
		attributes: ['city_id','city'],
		include:[{
			model: Country, as: 'Country',
			where : whereClause,
			attributes: ['country_id','country'],
		}],
		order: [[ 'Country', 'country','ASC' ]]
	}

	City.findAll(filter)
	.then(city=>{
		res.send(city);
	})

})

*/

/*****************get stores ***********************/
router.get('/store/:id', (req, res) => {
	let storeId
	if (isNaN(storeId = checkId(req.params.id))) {
		res.send("id must be a valid number");
		return;
	}

	let whereClause;
	if (storeId > 0) 
		whereClause = {store_id: storeId}
	else
		whereClause = null ;

	let filter ={
		where: whereClause,
		attributes: ['store_id'],
		include: [
			{
				model: Address, as: 'Address',
				attributes: ['address', 'district','postal_code', 'phone'],
				include: [{
					model: City, as: 'City',
					attributes: ['city_id','city'],
					include:[{
						model: Country, as: 'Country',
						attributes: ['country_id','country'],

					}]
				}]
			},
		]
	}

	Store.findAll(filter)
	.then(stores => {
		if (stores.length > 0)
			res.send(stores);
		else
			res.send(404);

		console.log("** Got Addresses");
	})
	/*
	.then(stores => {
		res.send(stores);
		console.log("** Got Addresses");
	});
	*/

})


/********************* get all videos ***********************************/
router.get('/:id', (req, res) => {
	let movieId
	if (isNaN(movieId = checkId(req.params.id))) {
		res.send("id must be a valid number");
		return;
	}

	let whereClause;
	if (movieId > 0) 
		whereClause = {film_id: movieId}
	else
		whereClause = null ;

	let filter ={
		where: whereClause,
		attributes: ['film_id', 'title', 'description'],
		include: [{
			model: Actor, as: 'Actors',
			attributes: ['first_name', 'last_name'],
		}, {
			model: Category, as: 'Category',
			attributes: ['name'],
		}]
	}

	Movie.findAll(filter).then(movies => {
		res.send(movies);
		console.log("** Got Movies");
	});
})


/*********************update stores **************************/
router.post('/updateStore', (req, res) => {
	let storeInfo = req.body.storeInfo;
	let storeId = parseInt(storeInfo.Id);
	let filter = {
		where:{store_id:storeId },
		include:[{
			model:  Address, as: 'Address',
			include: [{
				model: City, as: 'City',
			}]
		}]
	}
	console.log(storeInfo.address + ',' + storeInfo.city + ',' + storeInfo.zip + ',' + storeInfo.phone); 

	let storeToUpdate = {
		Address : {
			address: storeInfo.address,
			phone: storeInfo.phone,
			postal_code: storeInfo.zip
		}
	}
	Store.findOne(filter)
	.then((store)=>{
		console.log("Address id:" + store.address_id);
		Address.findById(store.address_id)
		.then((address)=>{
			address.update({
				address: storeInfo.address,
				district: storeInfo.city,
				phone: storeInfo.phone,
				postal_code: storeInfo.zip

			})
			.then((result)=>{
				res.send(200,result);

			})
		})
	});

});

/*****************************************************************/
function checkId(id) {
	let i;
	if (/^(-|\+)?(\d+|Infinity)$/.test(id))
		i = Number(id);
	return i;
}

module.exports = router;