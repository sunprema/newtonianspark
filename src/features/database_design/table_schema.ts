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


const TableDDLSchema = z.object({
  tables:z
  .array(

    z.object({
    table_name: z.string().describe("SQL Table name"),
    description:z.string().describe("Short description of the purpose this table, under 200 characters"),
    columns:z
    .array(
      z.object({
        name:z.string().describe("Column name"),
        type:z.string().describe("SQL data type"),
        primary_key:z.boolean().optional().describe("If this is a primary key"),
        foreign_key:z.object(
          { 
            table_name:z.string().describe('table used for foreign key reference'),
            column:z.string().describe('column in the foreign table')
          }
        ).optional().describe("Foreign Key")

      }
      )
    ).describe("List of columns for the table")
  
    })
  ).describe("List of database tables required for the User query")
})
    


export {ColumnSchema, IndexSchema, ConstraintSchema}
export {TableDDLSchema}