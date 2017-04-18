import classNames from 'classnames';
import React from 'react';
import Errors from './Errors';
import { IReactRef } from './IReactRef';

interface ITextInputProps {
    onChange?: () => any;
    possibleErrors?: string[];
    errors?: string[];
    label: string;
    placeholder?: string;
    type?: string;
    defaultValue?: any;
}

// tslint:disable-next-line:max-line-length
class TextInput extends React.Component<ITextInputProps, any> implements IReactRef { // eslint-disable-line react/prefer-stateless-function

    field: HTMLInputElement;
    props: ITextInputProps;

    getValue(): string {
        return this.field.value;
    }

    setValue(val: any): void {
        if (val == null)
            val = '';

        this.field.value = val;
    }

    render() {
        const { defaultValue, possibleErrors, errors, label } = this.props;
        var { placeholder, type } = this.props;

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
