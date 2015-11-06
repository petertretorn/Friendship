var Profile = require('./models/profiles.js');

function createNewProfile() {
	console.log('before');

	var profile = new Profile({ username: 'newUser.username' });

	console.log('after');

	profile.save(function(err){

		if (err) return res.json({ message : 'failure setting up new profile!'})

		//return res.json({ username : user.username })
		console.log('saved succesfully!');
	});

}

createNewProfile();

