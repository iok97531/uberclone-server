import User from '../../../entities/User';
import privateResolver from '../../../utils/privateResolver';
import { Resolvers } from 'src/types/resolvers';

const resolvers: Resolvers = {
    Query: {
        GetMyProfile: privateResolver (async(_, __, {req}) => {
            const user:User = req.user;
            return {
                ok: true,
                error: null,
                user
            };
        })
    }
}

export default resolvers