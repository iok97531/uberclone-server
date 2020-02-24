import Ride from '../../../entities/Ride';
import User from '../../../entities/User';
import { GetNearbyRideResponse } from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';
import { Resolvers } from 'src/types/resolvers';
import { Between } from 'typeorm';

const resolvers: Resolvers = {
  Query: {
    GetNearbyRide: privateResolver(
      async (_, __, { req }): Promise<GetNearbyRideResponse> => {
        const user: User = req.user;
        if (user.isDriving) {
          const { lat, lng } = user;
          try {
            const ride = await Ride.findOne(
              {
                status: "REQUESTING",
                pickUpLat: Between(lat - 0.05, lat + 0.05),
                pickUpLng: Between(lng - 0.05, lng + 0.05)
              },
              { relations: ["passenger"] }
            );
            if (ride) {
              return {
                ok: true,
                error: null,
                ride
              };
            } else {
              return {
                ok: true,
                error: null,
                ride: null
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              ride: null
            };
          }
        } else {
          return {
            ok: false,
            error: "You are not a driver",
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;
