import React from 'react';
import Relay from 'react-relay';
import Footer from './Footer';
import Header from './Header';

class Main extends React.Component<any, any> {
    render() {
        const { viewer, children } = this.props;

        return (
            <div>
                <Header app={viewer.app} menu={viewer.menu} />
                <main>
                    {children}
                </main>
                <Footer />
            </div>);
    }
}


export default Relay.createContainer(Main, {
    initialVariables: {
        limit: 20
    },
    fragments: {
        viewer: () => Relay.QL`
        fragment on Viewer{
            id,
            app{
                ${Header.getFragment('app')}
            },
            menu{
                ${Header.getFragment('menu')}
            }
        }
       `
    }
});
