import User from '../../../entities/User';
import { GetMyPlaceResponse } from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';
import { Resolvers } from 'src/types/resolvers';

const resolvers:Resolvers = {
    Query: {
        GetMyPlaces: privateResolver(async(_,__,{req}): Promise<GetMyPlaceResponse> => {
            try {
                const user = await User.findOne({id: req.user.id}, {relations:["places"]});
                if(user) {
                    return {
                        ok: true,
                        error: null,
                        places: user.places
                    };
                } else {
                    return {
                        ok: false,
                        error: "User not found",
                        places: null
                    };
                }
                
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    places: null
                };
            }
        })
    }
}

export default resolvers;