export interface Column {
    name: string;
    type: string;
    length?: number;
    primary_key?: boolean;
    foreign_key?: {
      table_name: string;
      column: string;
    };
    default?: any;
  }
  
 export interface Index {
    name: string;
    columns: string[];
  }
  
  export interface Constraint {
    name: string;
    check?: string;
  }
  
 export interface Table {
    table_name: string;
    description:string;
    columns: Column[];
    indexes?: Index[];
    constraints?: Constraint[];
  }

 export type ColumnType = 'integer'
  | 'bigint'
  | 'decimal'
  | 'numeric'
  | 'real'
  | 'double precision'
  | 'smallserial'
  | 'serial'
  | 'bigserial'
  | 'character'
  | 'varchar'
  | 'text'
  | 'bytea'
  | 'date'
  | 'time'
  | 'timestamp'
  | 'timestamp with time zone'
  | 'interval'
  | 'boolean'
  | 'enum'
  | 'point'
  | 'line'
  | 'lseg'
  | 'box'
  | 'path'
  | 'polygon'
  | 'circle'
  | 'inet'
  | 'cidr'
  | 'macaddr'
  | 'macaddr8'
  | 'bit'
  | 'bit varying'
  | 'tsvector'
  | 'tsquery'
  | 'uuid'
  | 'json'
  | 'jsonb'
  | 'array'
  | 'int4range'
  | 'int8range'
  | 'numrange'
  | 'tsrange'
  | 'tstzrange'
  | 'daterange'
  | 'any'
  | 'anyelement'
  | 'void';

