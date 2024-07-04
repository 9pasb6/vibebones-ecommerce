import { Model, Optional } from 'sequelize';
interface CategoryAttributes {
    id: number;
    name: string;
}
interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {
}
declare class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    id: number;
    name: string;
}
export default Category;
export type { CategoryAttributes, CategoryCreationAttributes };
