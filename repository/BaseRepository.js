import pool from "../boostrap.js"

export async function findAll(tableName){
    const [rows] = await pool.query(`
        SELECT * from ${tableName}
        `)
    return rows
}

export async function findById(id, tableName, pk){
    const [rows] = await pool.query(`
        SELECT * from ${tableName}
        WHERE ${pk} = ?
        `, [id])
    return rows[0]
}

export async function findWithJoin(leftTable, rightTable, leftFieldJoin, rightFieldJoin, searchParam, searchParamValue){
    const [rows] = await pool.query(`
        SELECT a.* FROM ${leftTable} a 
        join ${rightTable} b on 
        (a.${leftFieldJoin} = b.${rightFieldJoin}) where b.${searchParam} = ${searchParamValue};
        `)

    return rows
}

export async function save(user, tableName){
    
    const fields = []
    const values = []
    const signoPregunta = []

    for(const [keys, value] of Object.entries(user)){
        fields.push(keys)
        values.push(value)
        signoPregunta.push("?")
    }

    const [rows] = await pool.query(`
        INSERT INTO ${tableName} (${fields.join(",")})
        VALUES (${[signoPregunta.join(",")]})`, values)
    
    return rows.insertId
}

export async function updateById(id, newUserData, tableName, pk){
    
    const fields = []
    const values = []

    for (const [key, value] of Object.entries(newUserData)) {
        fields.push(`${key} = ?`)
        values.push(value)
    }

    await pool.execute(`UPDATE ${tableName} 
        SET ${[fields]}
        WHERE ${pk} = ?`, [...values, id])
        
}

export async function deleteById(id, tableName, pk){
   await pool.execute(`DELETE FROM ${tableName} WHERE ${pk} = ?`, [id])
}