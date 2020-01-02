import User from './User';
import { rideStatus } from '../types/types';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
    } from 'typeorm';

@Entity()
class Ride extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;

    @Column({type: "text"})
    name: string;

    @Column({type: "text", enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"]})
    status: rideStatus;

    @Column({type: "double precision", default: 0})
    pickUpLat: number;

    @Column({type: "double precision", default: 0})
    pickUpLng: number;

    @Column({type: "text"})
    pickUpAddress: string;

    @Column({type: "double precision", default: 0})
    dropOffLat: number;

    @Column({type: "double precision", default: 0})
    dropOffLng: number;

    @Column({type: "text"})
    dropOffAddress: string;

    @Column({type: "double precision", default: 0})
    price: number;

    @Column({type: "text"})
    distance: string;

    @Column({type: "text"})
    duration: string;

    @Column({type: "boolean", default: false})
    isFav: boolean;

    @ManyToOne(type => User, user=>user.rideAsPassenger)
    passenger: User;

    @ManyToOne(type => User, user=>user.rideAsDriver)
    driver: User;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Ride;