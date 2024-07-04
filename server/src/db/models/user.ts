// src/db/models/user.ts

import { Optional } from "sequelize";
const { DataTypes, Model }  = require ('sequelize');
const bcrypt = require ('bcrypt');
const sequelize = require("../../config/database"); // Asegúrate de que esta importación esté correcta
const AppError = require ('../../utils/appError');

// Interface de atributos para User
interface UserAttributes {
  id: number;
  userType: 'ADMIN' | 'USER' | 'LOCATION';
  email: string;
  commerceName: string;
  password: string;
  confirmPassword?: string; // Virtual attribute
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  status: boolean;
}

// Atributos que se pueden establecer al crear una nueva instancia de User
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Modelo de User
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public userType!: 'ADMIN' | 'USER' | 'LOCATION';
  public email!: string;
  public commerceName!: string;
  public password!: string;
  public confirmPassword?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date | null;
  public status!: boolean;

  // Virtual attribute setter for confirmPassword
  public set confirmPasswordSetter(value: string) {
    if (this.password.length < 8 || this.password.length > 100) {
      throw new AppError('Password must be between 8 and 100 characters long', 400);
    }
    if (value === this.password) {
      const hashPassword = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hashPassword);
    } else {
      throw new AppError('Password confirmation does not match password', 400);
    }
  }
}

// Inicializa el modelo User con atributos y opciones
User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM('ADMIN', 'USER', 'LOCATION'),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User type cannot be null',
        },
        notEmpty: {
          msg: 'User type cannot be empty',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email cannot be null',
        },
        notEmpty: {
          msg: 'Email cannot be empty',
        },
        isEmail: {
          msg: 'Email must be a valid email address',
        },
      },
    },
    commerceName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Commerce name cannot be null',
        },
        notEmpty: {
          msg: 'Commerce name cannot be empty',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot be null',
        },
        notEmpty: {
          msg: 'Password cannot be empty',
        },
      },
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(this: User, value: string) {
        this.confirmPasswordSetter = value; // Usa el setter de atributo virtual definido arriba
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: 'users', // Ajusta el nombre del modelo según tu preferencia
    timestamps: true,
  }
);

// Exporta el modelo User y los tipos por separado
export default User;
export type { UserAttributes, UserCreationAttributes };
