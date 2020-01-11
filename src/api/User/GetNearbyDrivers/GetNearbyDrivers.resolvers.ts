import User from '../../../entities/User';
import { GetNearbyDriversResponse } from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';
import { Resolvers } from 'src/types/resolvers';
import { Between } from 'typeorm';
const resolvers: Resolvers = {
    Query: {
        GetNearbyDrivers: privateResolver(async(_, __, {req}):Promise<GetNearbyDriversResponse> => {
            const user: User = req.user;
            const {lat, lng} = user;
            try {
                const drivers: User[] = await User.find({
                    isDriving: true,
                    lat: Between(lat - 0.05, lat + 0.05),
                    lng: Between(lng - 0.05, lng + 0.05)
                });    
                return {
                    ok: true,
                    error: null,
                    drivers 
                };
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    drivers: null
                };
            }
        })
    }
}

export default resolvers;