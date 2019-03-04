**SQL 分类：**

**SQL 语句主要可以划分为以下 4 个类别。**

**DDL（Data Definition Languages）语句：** 数据定义语言，这些语句定义了不同的数据段、数据库、表、列、索引等数据库对象的定义。常用的语句关键字主要包括 create、drop、alter 等。```SQL
CREATE <![TEMPORARY|TEMP]> TABLE [IF NOT EXISTS] TBL_name (
        column type
        [Null | NOT Null] [UNIQUE] [DEFAULT value]
        [column_constraint_Clause | PRIMARY Key} [……] ]
        [, PRIMARY Key ( column [, ……] ) ]
        [, Check ( condition) ]
        [, table constraint]
      )

DROP [TEMPORARY] TABLE [IF EXISTS]
    TBL_name [, TBL_name] ……
    [RESTRICT | Cascade]

ALTER TABLE table [*]
        ADD [<!COLUMN>] column type
ALTER TABLE table [*]
        DROP [COLUMN] column
ALTER TABLE table [*]
        MODIFY [<!COLUMN>] column {<!SET> DEFAULT value | DROP DEFAULT }
ALTER TABLE table [*]
        MODIFY [<!COLUMN>] column column_constraint
ALTER TABLE table [*]
        RENAME [<!COLUMN>] column TO newcolumn
ALTER TABLE table
        RENAME TO newtable
ALTER TABLE table
        ADD table_constraint
          ALTER Index Index_name {VISIBLE | INVISIBLE}
```

**DQL（Data Query Language SELECT）数据查询语言，select 语句。**

```SQL
SELECT
    [ALL | DISTINCT | DISTINCTROW]
      [High_PRIORITY]
      [Straight_JOIN]
      [SQL_Small_RESULT] [SQL_BIG_RESULT] [SQL_BUFFER_RESULT]
      [SQL_CACHE | SQL_NO_CACHE] [SQL_CALC_FOUND_ROWS]
    select_expr [, select_expr ……]
    [FROM table_references
      [PARTITION partition_List]
    [WHERE where_condition]
    [GROUP BY {col_name | expr | position}
      [ASC | DESC], …… [WITH ROLLUP]]
    [HAVING where_condition]
    [WINDOW window_name AS (window_spec)
        [, window_name AS (window_spec)] ……]
    [Order BY {col_name | expr | position}
      [ASC | DESC], ……]
    [LIMIT {[offset,] Row_count | Row_count OFFSET offset}]
    [INTO OUTFILE 'File_name'
        [CHARACTER Set charset_name]
        export_options
      | INTO DUMPFILE 'File_name'
      | INTO Var_name [, Var_name]]
    [FOR UPDATE | Lock IN Share MODE]]
    [FOR {UPDATE | Share} [OF TBL_name [, TBL_name] ……] [NOWAIT | Skip LOCKED] 
      | Lock IN Share MODE]]
```

**DML（Data Manipulation Language）语句：** 数据操纵语句，用于添加、删除、更新和查询数据库记录，并检查数据完整性，常用的语句关键字主要包括 insert、delete、udpate。( 增添改）```SQL
INSERT INTO TBL_name [( column [, ……] ) ]
        {VALUES ( expression [, ……] ) | SELECT Query }
//demo
INSERT INTO TBL_name (col1,col2) VALUES(15,col1*2);
```

```SQL
DELETE FROM table 
  [WHERE condition] 
  [Order BY ……]
  [LIMIT Row_count]
```

```SQL
UPDATE table Set col = expression [,……]
    [FROM fromlist]
    [WHERE condition]
    [Order BY ……]
    [LIMIT Row_count]
```

**DCL（Data Control Language）语句：** 数据控制语句，用于控制不同数据段直接的许可和访问级别的语句。这些语句定义了数据库、表、字段、用户的访问权限和安全级别。主要的语句关键字包括 Grant、revoke 等。```SQL
Grant
    priv_type [(column_List)]
      [, priv_type [(column_List)]] ……
    ON [object_type] priv_level
    TO user_or_role [, user_or_role] ……
    [WITH Grant OPTION]

Grant PROXY ON user_or_role
    TO user_or_role [, user_or_role] ……
    [WITH Grant OPTION]

Grant role [, role] ……
    TO user_or_role [, user_or_role] ……
    [WITH ADMIN OPTION]

object_type: {
    TABLE
  | FUNCTION
  | PROCEDURE
}

priv_level: {

  | DB_name.*
  | DB_name.tbl_name
  | TBL_name
  | DB_name.routine_name
}

user_or_role: {
    user
  | role
}
Grant ALL ON DB1.* TO 'Jeffrey'@'localhost';
```

参考资料：SQL92 HTTP://owen.sj.ca.us/rkowen/howto/SQL92F.html

MySql 文档 https://dev.mysql.com/Doc/refman/8.0/EN/SQL-syntax.html
