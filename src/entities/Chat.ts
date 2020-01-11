import Message from './Message';
import Ride from './Ride';
import User from './User';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
    } from 'typeorm';

@Entity()
class Chat extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;

    @OneToMany(type => Message, message => message.chat)
    messages: Message[];

    @Column({nullable: true})
    passengerId: number;

    @Column({nullable: true})
    driverId: number;

    @ManyToOne(type => User, user => user.chatsAsPassenger)
    passenger: User;

    @ManyToOne(type => User, user => user.chatsAsDriver)
    driver: User;

    @Column({nullable:true})
    rideId: number;

    @OneToOne(type => Ride, ride => ride.chat)
    ride: Ride;


    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Chat;