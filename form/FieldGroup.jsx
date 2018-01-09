import React, {Component} from 'react';
import PropTypes from 'prop-types';

class FieldGroup extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleChange(e, this.props.rules, this.props.name);
    }

    render() {
        const {
            text,
            type,
            name,
            placeholder,
            error,
            rules,
            handleChange
        } = this.props;
        
        return (
            <div className="form-group">
                <label>{text}</label>
                <input
                    type={type}
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    onChange={this.handleChange}/>
                    <small>{error}</small>
            </div>
        );
    }
}

FieldGroup.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func
};

export default FieldGroup;