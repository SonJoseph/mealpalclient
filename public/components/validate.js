/**
 * Created by yunchu on 3/25/17.
 */
import React from 'react';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined

const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined

exports.validateLogIn = (values) => {
    const errors = {}
    const requiredFields = [ 'email','password' ]
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors;
}
exports.validateSignUp = (values) => {
    // var errors = {};
    // var hasErrors = false;
    //
    // if (!values.name || values.name.trim() === '') {
    //   errors.name = 'Enter a name';
    //   hasErrors = true;
    // }
    // if (!values.username || values.username.trim() === '') {
    //   errors.username = 'Enter username';
    //   hasErrors = true;
    // }
    // if (!values.email || values.email.trim() === '') {
    //   errors.email = 'Enter email';
    //   hasErrors = true;
    // }
    // if (!values.password || values.password.trim() === '') {
    //   errors.password = 'Enter password';
    //   hasErrors = true;
    // }
    // if (!values.confirmPassword || values.confirmPassword.trim() === '') {
    //   errors.confirmPassword = 'Enter Confirm Password';
    //   hasErrors = true;
    // }
    //
    // if (values.confirmPassword && values.confirmPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmPassword) {
    //   errors.password = 'Password And Confirm Password don\'t match';
    //   errors.password = 'Password And Confirm Password don\'t match';
    //   hasErrors = true;
    // }
    const errors = {}
    const requiredFields = [ 'firstname', 'lastname', 'email', 'username', 'password','confirmpassword' ]
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors;
    // return hasErrors && errors;
}

exports.required = value => value ? undefined : 'Required'
exports.maxLength = maxLength
exports.maxLength15 = maxLength(15)
exports.number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
exports.minValue = minValue
exports.minValue18 = minValue(18)
exports.tooOld = value =>
    value && value > 65 ? 'You might be too old for this' : undefined
exports.aol = value =>
    value && /.+@aol\.com/.test(value) ?
        'Really? You still use AOL for your email?' : undefined

exports.renderField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
               {...input}
               {...custom}
    />
    // <div>
    //   <label>{label}</label>
    //   <div>
    //     <input id={idval} {...input} placeholder={label} type={type} value={value}/>
    //       {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    //   </div>
    // </div>
)