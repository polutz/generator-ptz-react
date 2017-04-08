import React from 'react';
import { Component } from 'react';
import { IComponent } from './IComponent';

type IErrorsComponent = ({ errors }) => void;

const Errors: IComponent<any> & IErrorsComponent = ({ errors }) => {
    const errorsList = errors
        ? errors.map(error => <li key={error}>{error}</li>)
        : [];

    return (
        <ul className="errors">
            {errorsList}
        </ul>
    );
};

Errors.propTypes = {
    errors: React.PropTypes.array
};

export default Errors;
