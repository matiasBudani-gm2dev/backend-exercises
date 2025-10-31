import { pool, sequelize} from "../boostrap.js"

const baseRepository = {
    findAll: async (paramTable)=>await paramTable.findAll(),
    findByPk: async (paramTable, pk)=>await paramTable.findByPk(pk),
    findOne: async (paramTable, filters)=>await paramTable.findOne({
        where : filters
    })
}





export async function findByField(fieldName, tableName, field){
    try{
        const [rows] = await pool.query(`
            SELECT * from ${tableName}
            WHERE ${field} = ?
        `, [fieldName])

        return rows[0]

    }catch(err){
        console.error(err)
    }
    
}

export async function findWithJoin(LeftModel, RightModel, rightModelKey, rightModelKeyValue){
    try {
        const rows = await LeftModel.findAll({
        include: [
            {
            model: RightModel,
            required: true,  
            where: {
                [rightModelKey]: rightModelKeyValue
            },
            attributes: []
            }
        ],
            attributes: { exclude: [] } 
        });

        return rows

    }catch(err){
        console.error(err);
        throw err;
    }
} 

export async function save(user, tableName){
    try{
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
            VALUES (${signoPregunta.join(",")})`, values
        )

        

        return rows.insertId
    }catch (err) {
        console.error(err)
    }
}

export async function updateById(id, newUserData, tableName, pk){
    try{
        const fields = []
        const values = []

        for (const [key, value] of Object.entries(newUserData)) {
            fields.push(`${key} = ?`)
            values.push(value)
        }

        await pool.execute(`UPDATE ${tableName} 
            SET ${[fields]}
            WHERE ${pk} = ?`, [...values, id])
            
    }catch(err){
        console.error(err)
    }
}

export async function deleteById(id, tableName, pk){
    try{
        await pool.execute(`DELETE FROM ${tableName} WHERE ${pk} = ?`, [id])
    }catch(err){
        console.error(err)
    }
}

export default baseRepository 