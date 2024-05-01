
const role = require('../models/Roles');

// -------------------------------------create roles ------------------------------------------------------

const addRoles = async (req, res) => {
    try {
        if (!req.body.role_name || req.body.role_name.trim() == "") {
            return res.status(400).json({ "error": "role name is required" });
        }
        else {
            let createdRole = await role.create({ role_name: req.body.role_name })
            if (createdRole)
                res.status(200).json(createdRole)
            else
                res.status(400).json({ Error: 'Error in insert new record' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

// --------------------------------------------List All Role Table Values ----------------------------------

const getRoles = async (req, res) => {
    try {
        const roleslist = await role.findAll();
        res.status(200).json(roleslist);
    } catch (error) {
        res.status(500).json({ error: "con't Retrieving values" });
    }
}

// -------------------------------------------- Export the Functions -----------------------------------------

module.exports = {
    addRoles,
    getRoles
};




