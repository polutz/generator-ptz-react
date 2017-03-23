import React from 'react';

const <%= componentName %> = ({ propNameExample, propFuncNameExample }) => {
    const sayHi = (event) => {
        alert(`Hi ${propNameExample}!`);
    }

    return (
        <div>
            <a href="#" onClick={sayHi}> Say Hi! </a>
        </div>
    );
};

<%= componentName %>.propTypes = {
    propNameExample: React.PropTypes.string.isRequired,
    propFuncNameExample: React.PropTypes.func
};

export default <%= componentName %>;

