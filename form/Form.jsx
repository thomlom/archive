import React, {Component} from 'react';

import FieldGroup from './FieldGroup';

import {validator} from './validator';

class Form extends Component {
    constructor(props) {
        super(props);

        /**
         * [{name: 'username', type: 'text', ...}, {name: 'password', ...}] => {username: '', password: '', errors: []}
         */
        this.state = Object.assign(...this.props.fields.map(field => ({
            [field.name]: ''
        })), {errors: {}});

        this.handleChange = this
            .handleChange
            .bind(this);

        this.handleSubmitClick = this
            .handleSubmitClick
            .bind(this);

        this.isValid = this
            .isValid
            .bind(this);
    }

    handleChange(e, rule, element) {
        const {name, value} = e.target;
        rule = rule[0];
        const {validationRule, error} = validator(rule);
        if (!validationRule(value)) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    [element]: error
                }
            }));
        } else {
            this.setState(prevState => {
                let oldErrors = prevState.errors;
                let newErrorsObject = Object.assign({}, Object.keys(oldErrors).reduce((result, key) => {
                    if (key != element) {
                        result[key] = oldErrors[key];
                    }
                    return result;
                }, {}));
                return {errors: newErrorsObject}
            });

        }
        this.setState({[name]: value});
    }

    handleSubmitClick() {
        if (this.isValid()) {
            this
                .props
                .triggerSubmitFunction(this.state);
        }
    }

    isValid() {
        const errors = this.state.errors;
        return Object
            .keys(errors)
            .length === 0 && errors.constructor === Object
    }

    render() {
        return (
            <form>
                {this
                    .props
                    .fields
                    .map((field, i) => {
                        return (<FieldGroup
                            key={i}
                            type={field.type}
                            text={field.text}
                            name={field.name}
                            placeholder={field.placeholder}
                            error={this.state.errors[field.name]}
                            rules={field.rules}
                            handleChange={this.handleChange}/>)
                    })}
                <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={this.handleSubmitClick}>Envoyer</button>
            </form>
        )
    }
}

export default Form;
