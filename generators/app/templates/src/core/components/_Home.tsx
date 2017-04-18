import React from 'react';

const Home: React.StatelessComponent<any> = () => {
    return (
        <section className="welcome">
            <p>Welcome to Polutz!</p>
            <ul>
                <li>React</li>
                <li>Relay</li>
                <li>GraphQL</li>
                <li>Nodejs</li>
                <li>Typescript</li>
                <li>MongoDB</li>
            </ul>
        </section>
    );
};

export default Home;
