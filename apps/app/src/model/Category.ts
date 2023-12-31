import { Model, Q } from "@nozbe/watermelondb";
import { date, lazy, readonly, text } from "@nozbe/watermelondb/decorators";

import { StackType } from "./StackType";
import { Tool } from "./Tool";
import { TableName } from "./schema";

export class Category extends Model {
  static table = TableName.CATEGORIES;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  static associations = {
    [TableName.CATEGORIZATIONS]: {
      type: "has_many" as const,
      foreignKey: "category_id",
    },
    [TableName.PICKS]: {
      type: "has_many" as const,
      foreignKey: "category_id",
    },
    [TableName.STACK_TYPE_CATEGORIES]: {
      type: "has_many" as const,
      foreignKey: "category_id",
    },
  };

  @text("name") name!: string;
  @text("slug") slug!: string;
  @text("icon_name") iconName!: string;
  @text("is_coming_soon") isComingSoon!: boolean;
  @text("number_of_tools") numberOfTools!: number;

  @lazy
  tools = this.collections
    .get<Tool>(TableName.TOOLS)
    .query(Q.on(TableName.CATEGORIZATIONS, "category_id", this.id));

  @lazy
  stackTypes = this.collections
    .get<StackType>(TableName.STACK_TYPES)
    .query(Q.on(TableName.STACK_TYPE_CATEGORIES, "category_id", this.id));
}
