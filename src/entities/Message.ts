import Chat from './Chat';
import User from './User';
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
class Message extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;

    @Column({type: "text"})
    text: string;

    @ManyToOne(type => Chat, chat => chat.messages)
    chat: Chat;

    @ManyToOne(type => User, user => user.messages)
    user: User;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Message;