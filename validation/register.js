const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	if(!validator.isLength(data.name, { min: 2, max: 30})){
		errors.name = "Name must be btwn 2 and 30 chars";
	}

	if(validator.isEmpty(data.name)){
		errors.name = "Name is required";
	}
	
	if(validator.isEmpty(data.email)){
		errors.email = "email is required";
	}

	if(!validator.isEmail(data.email)){
		errors.email = "Email is invalid";
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
