import logger from "../winstonLogs.js";

const baseRepository = {
  findAll: async (paramTable, where = {}) => {
    console.log({ where });
    return await paramTable.findAll({ where });
  },
  findByPk: async (paramTable, pk) => {
    const row = await paramTable.findByPk(pk);
    return row ? row.dataValues : null;
  },
  findOne: async (paramTable, filters) => {
    const row = await paramTable.findOne({ where: filters });
    return row ? row.dataValues : null;
  },
  findWithJoin: async (
    LeftModel,
    RightModel,
    rightModelKey,
    rightModelKeyValue,
  ) => {
    try {
      const rows = await LeftModel.findAll({
        include: {
          model: RightModel,
          where: { [rightModelKey]: rightModelKeyValue },
          attributes: [],
        },
      });

      const plainRows = rows.map((r) => r.get({ plain: true }));

      return plainRows;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  },
  create: async (paramTable, data) => paramTable.create(data),
  update: async (paramTable, newData, idKey, idValue) => {
    try {
      await paramTable.update(newData, {
        where: {
          [idKey]: idValue,
        },
      });
    } catch (err) {
      logger.error(err);
    }
  },
  destroy: async (paramTable, idKey, idValue) => {
    await paramTable.destroy({
      where: {
        [idKey]: idValue,
      },
    });
  },
};
export default baseRepository;
