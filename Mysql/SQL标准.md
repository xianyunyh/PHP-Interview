**SQL 分类：**

**SQL 语句主要可以划分为以下 4 个类别。**

**DDL（Data Definition Languages）语句：**数据定义语言，这些语句定义了不同的数据段、数据库、表、列、索引等数据库对象的定义。常用的语句关键字主要包括 create、drop、alter等。

```sql
CREATE <![TEMPORARY|TEMP]> TABLE [IF NOT EXISTS] tbl_name (
        column type
        [ NULL | NOT NULL ] [ UNIQUE ] [ DEFAULT value ]
        [column_constraint_clause | PRIMARY KEY } [ ... ] ]
        [, PRIMARY KEY ( column [, ...] ) ]
        [, CHECK ( condition ) ]
        [, table constraint ]
      )

DROP [TEMPORARY] TABLE [IF EXISTS]
    tbl_name [, tbl_name] ...
    [RESTRICT | CASCADE]

ALTER TABLE table [ * ]
        ADD [<!COLUMN>] column type
ALTER TABLE table [ * ]
        DROP [ COLUMN ] column
ALTER TABLE table [ * ]
        MODIFY [<!COLUMN>] column { <!SET> DEFAULT value | DROP DEFAULT }
ALTER TABLE table [ * ]
        MODIFY [<!COLUMN>] column column_constraint
ALTER TABLE table [ * ]
        RENAME [<!COLUMN>] column TO newcolumn
ALTER TABLE table
        RENAME TO newtable
ALTER TABLE table
        ADD table_constraint
          ALTER INDEX index_name {VISIBLE | INVISIBLE}
```

**DQL（Data Query Language SELECT ）数据查询语言，select语句。**

```sql
SELECT
    [ALL | DISTINCT | DISTINCTROW ]
      [HIGH_PRIORITY]
      [STRAIGHT_JOIN]
      [SQL_SMALL_RESULT] [SQL_BIG_RESULT] [SQL_BUFFER_RESULT]
      [SQL_CACHE | SQL_NO_CACHE] [SQL_CALC_FOUND_ROWS]
    select_expr [, select_expr ...]
    [FROM table_references
      [PARTITION partition_list]
    [WHERE where_condition]
    [GROUP BY {col_name | expr | position}
      [ASC | DESC], ... [WITH ROLLUP]]
    [HAVING where_condition]
    [WINDOW window_name AS (window_spec)
        [, window_name AS (window_spec)] ...]
    [ORDER BY {col_name | expr | position}
      [ASC | DESC], ...]
    [LIMIT {[offset,] row_count | row_count OFFSET offset}]
    [INTO OUTFILE 'file_name'
        [CHARACTER SET charset_name]
        export_options
      | INTO DUMPFILE 'file_name'
      | INTO var_name [, var_name]]
    [FOR UPDATE | LOCK IN SHARE MODE]]
    [FOR {UPDATE | SHARE} [OF tbl_name [, tbl_name] ...] [NOWAIT | SKIP LOCKED] 
      | LOCK IN SHARE MODE]]
```

**DML（Data Manipulation Language）语句：**数据操纵语句，用于添加、删除、更新和查询数据库记录，并检查数据完整性，常用的语句关键字主要包括 insert、delete、udpate 。(增添改）

```sql
INSERT INTO tbl_name [ ( column [, ...] ) ]
        { VALUES ( expression [, ...] ) | SELECT query }
//demo
INSERT INTO tbl_name (col1,col2) VALUES(15,col1*2);
```

```sql
DELETE FROM table 
  [ WHERE condition ] 
  [ORDER BY ...]
  [LIMIT row_count]
```

```sql
UPDATE table SET col = expression [,...]
    [ FROM fromlist ]
    [ WHERE condition ]
    [ORDER BY ...]
    [LIMIT row_count]
```

**DCL（Data Control Language）语句：**数据控制语句，用于控制不同数据段直接的许可和访问级别的语句。这些语句定义了数据库、表、字段、用户的访问权限和安全级别。主要的语句关键字包括 grant、revoke 等。

```sql
GRANT
    priv_type [(column_list)]
      [, priv_type [(column_list)]] ...
    ON [object_type] priv_level
    TO user_or_role [, user_or_role] ...
    [WITH GRANT OPTION]

GRANT PROXY ON user_or_role
    TO user_or_role [, user_or_role] ...
    [WITH GRANT OPTION]

GRANT role [, role] ...
    TO user_or_role [, user_or_role] ...
    [WITH ADMIN OPTION]

object_type: {
    TABLE
  | FUNCTION
  | PROCEDURE
}

priv_level: {

  | db_name.*
  | db_name.tbl_name
  | tbl_name
  | db_name.routine_name
}

user_or_role: {
    user
  | role
}
GRANT ALL ON db1.* TO 'jeffrey'@'localhost';
```

参考资料：

SQL92 http://owen.sj.ca.us/rkowen/howto/sql92F.html

MySql文档 https://dev.mysql.com/doc/refman/8.0/en/sql-syntax.html
