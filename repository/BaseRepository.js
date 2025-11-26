import logger from "../winstonLogs.js";

const baseRepository = {
  findAll: async (paramTable, where = {}, options = {}) => {
    return await paramTable.findAll({ where, ...options });
  },

  findByPk: async (paramTable, pk, options = {}) =>
    await paramTable.findByPk(pk, options),

  findOne: async (paramTable, filters, options = {}) =>
    await paramTable.findOne({
      where: filters,
      ...options,
    }),

  findWithJoin: async (
    LeftModel,
    RightModel,
    rightModelKey,
    rightModelKeyValue,
    options = {},
  ) => {
    try {
      const rows = await LeftModel.findAll({
        include: {
          model: RightModel,
          where: { [rightModelKey]: rightModelKeyValue },
          attributes: [],
        },
        ...options,
      });

      return rows.map((r) => r.get({ plain: true }));
    } catch (err) {
      logger.error(err);
      throw err;
    }
  },

  create: async (paramTable, data, options = {}) =>
    await paramTable.create(data, options),

  update: async (paramTable, newData, idKey, idValue, options = {}) => {
    try {
      await paramTable.update(newData, {
        where: { [idKey]: idValue },
        ...options,
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  },

  updateWhereKeys: async (
    paramTable,
    newData,
    whereKeys = {},
    options = {},
  ) => {
    try {
      await paramTable.update(newData, {
        where: whereKeys,
        ...options,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  destroy: async (paramTable, idKey, idValue, options = {}) =>
    await paramTable.destroy({
      where: { [idKey]: idValue },
      ...options,
    }),
};

export default baseRepository;
