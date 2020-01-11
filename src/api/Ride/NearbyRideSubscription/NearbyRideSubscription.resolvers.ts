import User from '../../../entities/User';
import { withFilter } from 'graphql-yoga';

const resolvers = {
    Subscription: {
        NearbyRideSubscription: {
            subscribe: withFilter((_, __, {pubSub}) => pubSub.asyncIterator("rideRequest"), (payload, _, {context})=> {
                const user:User = context.currentUser;
                const { NearbyRideSubscription : { pickUpLat, pickUpLng }} = payload;
                const {lat: userLat, lng: userLng} = user;
                return (
                    pickUpLat >= userLat - 0.05 &&
                    pickUpLat <= userLat + 0.05 &&
                    pickUpLng >= userLng - 0.05 &&
                    pickUpLng <= userLng + 0.05
                );
            })
        }
    }
}

export default resolvers;