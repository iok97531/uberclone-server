import User from '../../../entities/User';
import { withFilter } from 'graphql-yoga';

const resolvers = {
    Subscription: {
        DriversSubscription: {
            subscribe: withFilter((_, __, {pubSub}) => pubSub.asyncIterator("driverUpdate"), (payload, _, {context})=> {
                const user:User = context.currentUser;
                const { DriversSubscription : { lat: driverLat, lng:driverLng} } = payload;
                const {lat: userLat, lng: userLng} = user;
                return (
                    driverLat >= userLat - 0.05 &&
                    driverLat <= userLat + 0.05 &&
                    driverLng >= userLng - 0.05 &&
                    driverLng <= userLng + 0.05
                );
            })
        }
    }
};

export default resolvers;