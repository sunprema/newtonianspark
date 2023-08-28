import { z } from 'zod';

interface Columns {
    name:string, 
    type:
  | 'integer'
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

 } 

const ColumnSchema = z.object({
  name: z.string(),
  type: z.string(),
  length: z.number().optional(),
  primary_key: z.boolean().optional(),
  foreign_key: z.object({
    table: z.string(),
    column: z.string(),
  }).optional(),
  default: z.any().optional(),
});

const IndexSchema = z.object({
  name: z.string(),
  columns: z.array(z.string()),
});

const ConstraintSchema = z.object({
  name: z.string(),
  check: z.string().optional(),
});

const TableSchema = z.object({
  table_name: z.string(),
  columns: z.array(ColumnSchema),
  indexes: z.array(IndexSchema).optional(),
  constraints: z.array(ConstraintSchema).optional(),
});

export default TableSchema

export {ColumnSchema, IndexSchema, ConstraintSchema}