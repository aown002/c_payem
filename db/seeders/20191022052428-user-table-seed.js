'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('C_USER', [
      {
        "row_id" : 1,
        "login" : "cadmin",
        "slt_pwd" : "cb07b86a-bcb5-4bb7-a00b-e42e9d64e87d",
        "hash_pwd" : "$2a$12$PLqFyg8obcrA2BiQ2IyKj.EUazkHXicfNeg09stNcJK67o7ui7dAy",
        "emp_id" : 1,
        "resp_id" : 1,
        "fst_name" : "admin",
        "last_name" : "admin",
        "created" : "2019-05-27 07:10:58",
        "bu_id" : 1,
        "div_id" : 1,
        "ATTRIB_01" : null,
        "ATTRIB_02" : null,
        "ATTRIB_03" : null,
        "ATTRIB_04" : null,
        "ATTRIB_05" : null,
        "ATTRIB_06" : null,
        "ATTRIB_07" : null,
        "ATTRIB_08" : null,
        "ATTRIB_09" : null,
        "ATTRIB_10" : null,
        "ATTRIB_11" : null,
        "ATTRIB_12" : null,
        "ATTRIB_13" : null,
        "ATTRIB_14" : null,
        "ATTRIB_15" : null,
        "ATTRIB_16" : null,
        "ATTRIB_17" : null,
        "ATTRIB_18" : null,
        "ATTRIB_19" : null,
        "ATTRIB_20" : null,
        "FLG_01" : null,
        "FLG_02" : null,
        "FLG_03" : null,
        "FLG_04" : null,
        "FLG_05" : null,
        "FLG_06" : null,
        "FLG_07" : null,
        "FLG_08" : null,
        "FLG_09" : null,
        "FLG_10" : null
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('C_USER', [{
      login :'cadmin'
    }])
  }
};