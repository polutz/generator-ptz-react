import { IUser } from 'ptz-user-domain';
import Relay from 'react-relay';

interface ISaveUserMutationProps {
    user: IUser;
    viewer: any;
}

class SaveUserMutation extends Relay.Mutation<ISaveUserMutationProps, any> {

    getMutation() {
        console.log('SaveUserMutation getMutation');

        return Relay.QL`
            mutation {saveUser}
        `;
    }

    getVariables() {
        return this.props.user;
    }

    getFatQuery() {
        return Relay.QL`
            fragment on SaveUserPayload{
                userEdge,
                viewer { userConnection }
            }
        `;
    }

    getConfigs() {
        return [{
            type: 'RANGE_ADD',
            parentName: 'viewer',
            parentID: this.props.viewer.id,
            connectionName: 'userConnection',
            edgeName: 'userEdge',
            rangeBehaviors: {
                '': 'prepend'
            }
        }];
    }
}

export default SaveUserMutation;
