import { z } from 'zod';


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