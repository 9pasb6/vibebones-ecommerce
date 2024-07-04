import { Optional } from "sequelize";
declare const Model: any;
interface UserAttributes {
    id: number;
    userType: 'ADMIN' | 'USER' | 'LOCATION';
    email: string;
    commerceName: string;
    password: string;
    confirmPassword?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    status: boolean;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
}
declare class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id: number;
    userType: 'ADMIN' | 'USER' | 'LOCATION';
    email: string;
    commerceName: string;
    password: string;
    confirmPassword?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    status: boolean;
    set confirmPasswordSetter(value: string);
}
export default User;
export type { UserAttributes, UserCreationAttributes };
