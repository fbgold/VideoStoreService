var express = require('express');
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

router.get('/store/:id', (req, res) => {
	let storeId
	if (isNaN(storeId = checkId(req.params.id))) {
		res.send("id must be a valid number");
		return;
	}
	if (storeId > 0) {
		Store.findAll({
			where: {
				store_id: storeId
			},

			attributes: ['store_id'],
			include: [
				{
					model: Address, as: 'Address',
					attributes: ['address', 'district','postal_code', 'phone'],
					include: [{
						model: City, as: 'City',
						attributes: ['city'],
						include:[{
							model: Country, as: 'Country',
							attributes: ['country'],

						}]
					}]
				},
				{
					model: Staff, as: 'Manager',
					attributes: ['first_name', 'last_name'],
					include: [{
						model: Address, as: 'Address',
						attributes: ['address', 'district','postal_code', 'phone'],
						include: [{
							model: City, as: 'City',
							attributes: ['city'],
							include:[{
								model: Country, as: 'Country',
								attributes: ['country'],
							}]
						}]
	
					}],
				}

			]

		}).then(stores => {
			if (stores.length > 0)
				res.send(stores);
			else
			res.send(404);

			console.log("** Got Addresses");
		});

	}
	else {
		Store.findAll({
			attributes: ['store_id'],
			include: [
				{
					model: Address, as: 'Address',
					attributes: ['address', 'district','postal_code', 'phone'],
					include: [{
						model: City, as: 'City',
						attributes: ['city'],
						include:[{
							model: Country, as: 'Country',
							attributes: ['country'],
						}]
					}]
				},
				{
					model: Staff, as: 'Manager',
					attributes: ['first_name', 'last_name'],
					include: [{
						model: Address, as: 'Address',
						attributes: ['address', 'district','postal_code', 'phone'],
						include: [{
							model: City, as: 'City',
							attributes: ['city'],
							include:[{
								model: Country, as: 'Country',
								attributes: ['country'],
							}]
						}]
					}],
				}

			]

		}).then(stores => {
			res.send(stores);
			console.log("** Got Addresses");
		});
	}
})

router.get('/:id', (req, res) => {
	let movieId
	if (isNaN(movieId = checkId(req.params.id))) {
		res.send("id must be a valid number");
		return;
	}

	if (movieId > 0) {
		Movie.findAll({
			where: {
				film_id: movieId
			},
			attributes: ['film_id', 'title', 'description'],
			include: [{
				model: Actor, as: 'Actors',
				attributes: ['first_name', 'last_name'],
			}, {
				model: Category, as: 'Category',
				attributes: ['name'],
			}]
		}).then(movies => {
			res.send(movies);
			console.log("** Got Movies");
		});

	} else {
		Movie.findAll({
			attributes: ['film_id', 'title', 'description'],
			include: [{
				model: Actor, as: 'Actors',
				attributes: ['first_name', 'last_name'],
			}, {
				model: Category, as: 'Category',
				attributes: ['name'],
			}]
		}).then(movies => {
			res.send(movies);
			console.log("** Got Movies");
		});
	}
})

/*
router.post('/test', (req,res)=>{
	console.log("got test");
})
*/



router.post('/updateStore', (req, res) => {
	let storeInfo = req.body;
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
				phone: storeInfo.phone,
				postal_code: storeInfo.zip

			})
			.then((result)=>{
				res.send(200,result);

			})
		})
	});

});


function checkId(id) {
	let i;
	if (/^(-|\+)?(\d+|Infinity)$/.test(id))
		i = Number(id);
	return i;
}

module.exports = router;