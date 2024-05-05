const productionHouse = require('../models/Production-house');
const users = require('../models/Users');

// ----------------------------------------Add Production House --------------------------------------------
const addProductionHouse = async (req, res) => {
    try {
        if (!req.body.production_house_name || req.body.production_house_name.trim() == "") {
            return res.status(400).json({ "error": "production house name is required" });
        }
        else {
            let createdHouse = await productionHouse.create(
                {
                    production_house_name: req.body.production_house_name,
                    production_house_image:req.body.production_house_image ? req.body.production_house_image : null,
                    user_id: req.user.id
                })
            console.log(createdHouse,"create House")
            if (createdHouse)
                res.status(200).json(createdHouse)
            else
                res.status(401).json({ Error: 'Error in insert new record' });
        }
    } catch (error) {
        res.status(500).json({ error: "con't Retrieving values" });
    }
}

// -------------------------------------- List All Production House ---------------------------------------------
const getProductionHouse = async (req, res) => {
    try {
        const profileId = req.user.id;
        const productionHouseList = await productionHouse.findAll({
            include: [{
                model: users,
                attributes: ['id'],
                required: true,
                where: {
                    id: profileId
                }
            }]
        });
        if (productionHouseList) {
            res.status(200).json({ message: "Success", data: productionHouseList });
        } else {
            res.status(400).json({ message: "No data found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// ---------------------------------------- Production House ---------------------------------------------------------

const getproductionHouseById = async (req, res) => {
    try {
        const id = req.params.id;
        const house = await productionHouse.findByPk(id, {
            include: [{
                model: users,
                attributes: ['id'],
                required: true,
            }]
        });
        if (house) {
            res.status(200).json({ message: "success", data: house })
        } else {
            res.status(401).json({ message: "failed" })
        }
    } catch (error) {
        res.status(200).json({ error: "Internal Server Error" });
    }
};

//-------------------------------------- Edit Prduction House --------------------------------------------------------

const putProductionHouse = async (req, res) => {
    try {
        const houseId = { id: req.params.id };
        const houseInfo = {
            production_house_name: req.body.production_house_name,
            production_house_image: req.body.production_house_image ? req.body.production_house_image : null
        };
        const houseEdit = await productionHouse.update(houseInfo, {
            where: houseId
        });
        if (houseEdit) {
            res.status(200).json({ message: "successfull", data: houseInfo })
        } else {
            res.status(200).json({ error: "user not found" })
        }
    } catch (error) {
        res.status(200).json({ error: "Internal Server Error" });
    }
}

// ----------------------------------- Delete production House --------------------------------------------

const deleteProductionHouse = async (req, res) => {
    try {
        const houseInfoDelete = await productionHouse.destroy({
            where: { id: req.params.id },
        });
        if (houseInfoDelete) {
            res.status(200).json({ message: "successfull", data: houseInfoDelete })
        } else {
            res.status(200).json({ error: "failed" })
        }
    } catch (error) {
        res.status(200).json({ error: "Internal Server Error" })
    }
}

module.exports = {
    addProductionHouse,
    getProductionHouse,
    getproductionHouseById,
    putProductionHouse,
    deleteProductionHouse
}