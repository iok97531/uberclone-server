import Ride from '../../../entities/Ride';
import User from '../../../entities/User';
import { GetRideHistoryResponse } from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';
import { Resolvers } from 'src/types/resolvers';

const resolvers: Resolvers = {
  Query: {
    GetRideHistory: privateResolver(
      async (_, __, { req }): Promise<GetRideHistoryResponse> => {
        const user: User = req.user;
        try {
          const rides = await Ride.find({
            where: {
              passengerId: user.id,
              status: "FINISHED"
            }
          });
          if (rides) {
            return {
              ok: true,
              error: null,
              rides
            };
          } else {
            return {
              ok: false,
              error: "No history",
              rides: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            rides: null
          };
        }
      }
    )
  }
};

export default resolvers;
