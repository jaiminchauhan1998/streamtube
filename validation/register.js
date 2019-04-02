const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	data.username = !isEmpty(data.username) ? data.username : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	if(!validator.isLength(data.username, { min: 2, max: 30})){
		errors.username = "Name must be btwn 2 and 30 chars";
	}

	if(validator.isEmpty(data.username)){
		errors.name = "Name is required";
	}

	if(validator.isEmpty(data.password)){
		errors.password = "password is required";
	}

	if(!validator.isLength(data.password, {min: 6, max: 30})){
		errors.password = "Password is must be betwn 6 and 30";
	}

	if(validator.isEmpty(data.password2)){
		errors.password2 = "password2 is required";
	}

	if(!validator.equals(data.password, data.password2)){
		errors.password2 = "password don't match";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
};
