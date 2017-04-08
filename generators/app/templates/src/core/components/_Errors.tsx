import React from 'react';
import { Component } from 'react';

interface IErrorsProps {
    errors: string[];
}

const Errors: React.StatelessComponent<IErrorsProps> = ({ errors }) => {
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
