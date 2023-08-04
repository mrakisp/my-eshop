export interface IAttributes {
  id: number;
  name: string;
  slug: string;
}

export interface IAttributeValues {
  id: number;
  name: string;
  slug: string;
  atr_id: number;
}

export interface IAttributesGrouped {
  attribute_id: number;
  attribute_name: string;
  attribute_values: any;
}
