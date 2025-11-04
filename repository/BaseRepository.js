import logger from "../winstonLogs";

const baseRepository = {
    findAll: async (paramTable)=>await paramTable.findAll(),
    findByPk: async (paramTable, pk)=>await paramTable.findByPk(pk),
    findOne: async (paramTable, filters)=>await paramTable.findOne({
        where : filters
    }),
    findWithJoin: async (LeftModel, RightModel, rightModelKey, rightModelKeyValue)=>{
        try {
            const rows = await LeftModel.findAll({
            include: {
                model: RightModel,
                where : {[rightModelKey] : rightModelKeyValue},
                attributes: []
            }
        })

        const plainRows = rows.map(r => r.get({ plain: true }));

        return plainRows

        }catch(err){
            logger.error(err);
            throw err;
        }
    },
    create: async(paramTable, data)=> paramTable.create(data),
    update : async (paramTable, newData, idKey, idValue) =>{
        try{
            await paramTable.update(
                newData,
                {
                    where: 
                    {
                        [idKey]: idValue
                    },
                },
            )
        }catch(err){
            logger.error(err)
        }
    },
    destroy: async (paramTable, idKey, idValue)=>{
        await paramTable.destroy({
            where : {
                [idKey] :idValue
            }
        })
    }
} 
export default baseRepository 