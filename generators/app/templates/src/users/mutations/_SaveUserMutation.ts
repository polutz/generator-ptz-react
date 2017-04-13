import Relay from 'react-relay';
import { IUser } from 'ptz-user-domain';

interface SaveUserMutationProps {
    user: IUser;
    store: any;
}

class SaveUserMutation extends Relay.Mutation<SaveUserMutationProps, any>{

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
                store { userConnection }
            }
        `;
    }

    getConfigs() {
        return [{
            type: 'RANGE_ADD',
            parentName: 'store',
            parentID: this.props.store.id,
            connectionName: 'userConnection',
            edgeName: 'userEdge',
            rangeBehaviors: {
                '': 'prepend'
            }
        }];
    }
}

export default SaveUserMutation;
