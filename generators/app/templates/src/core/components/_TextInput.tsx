import React from 'react';
import Errors from './Errors';
import classNames from 'classnames';

interface ITextInputProps {
    onChange?: () => any;
    possibleErrors?: string[];
    errors?: string[];
    label: string
    placeholder?: string;
    type?: string;
    defaultValue?: any;
}

class TextInput extends React.Component<ITextInputProps, any> { // eslint-disable-line react/prefer-stateless-function

    field: HTMLInputElement;
    props: ITextInputProps;

    value(val) {
        if (val != null)
            this.field.value = val;

        return this.field.value;
    }

    render() {
        var { defaultValue, possibleErrors, errors, label, placeholder, type } = this.props;

        const localErrors = errors && errors.length > 0 && possibleErrors && possibleErrors.length > 0
            ? errors.filter(error => possibleErrors.indexOf(error) >= 0)
            : [];

        const hasError = localErrors.length > 0;

        type = type ? type : 'text';
        placeholder = placeholder ? placeholder : label;

        return (
            <div className={classNames('form-group', { 'has-error': hasError })}>
                <label>{label}</label>
                <input
                    defaultValue={defaultValue}
                    type={type}
                    className="form-control"
                    placeholder={placeholder}
                    ref={(f) => { this.field = f; }}
                />
                <Errors errors={localErrors} />
            </div>
        );
    }
}

export default TextInput;
