const { queryDb } = require('../repository/queryDatabase');

//Create category record in the pet_category table
const createCategory = (async (categoryDescription) => {
    try{
        const dbResult = await queryDb('insert into "pet_category" (description) values($1) returning id_pet_category, description', [categoryDescription]) 
        const resultRows =dbResult.rows ? dbResult.rows : []
        return resultRows[0];
    } catch (error) {
        throw new Error(error.message);
    }
})

//Find category record from pet_category table
const findOneCategory = (async (id) => {
    try{
        const dbResult = await queryDb('select id_pet_category, description from "pet_category" where id_pet_category=$1', [id]) 
        const resultRows =dbResult.rows ? dbResult.rows : []
        return !resultRows? {}: resultRows[0];
    } catch (error) {
        throw new Error(error.message);
    }
})

//Find all category records from pet_category table
const findCategories = (async (id) => {
    try{
        const dbResult = await queryDb('select id_pet_category, description from "pet_category"') 
        const resultRows = dbResult.rows ? dbResult.rows : []
        return !resultRows? [{}]: resultRows;
    } catch (error) {
        throw new Error(error.message);
    }
})

//Update category record in pet_category table
const updateCategory = (async (id, categoryDescription) => {
    try{
        const dbResult = await queryDb('update "pet_category" set description=$1 where id_pet_category=$2 returning id_pet_category, description', [categoryDescription, id]) 
        const resultRows =dbResult.rows ? dbResult.rows : []
        return !resultRows? {}: resultRows[0];
    } catch (error) {
        throw new Error(error.message);
    }
})

//Delete category record from pet_category table
const deleteCategory = (async (id) => {
    try{
        const dbResult = await queryDb('delete from "pet_category" where id_pet_category=$1 returning id_pet_category, description', [id]) 
        const resultRows =dbResult.rows ? dbResult.rows : []
        return !resultRows? {}: resultRows[0];
    } catch (error) {
        throw new Error(error.message);
    }
})

module.exports = { createCategory, findOneCategory, findCategories, updateCategory, deleteCategory };