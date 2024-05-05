const user = require('../models/Users');
let roles = require("../models/Roles")

//  ------------------------------------------Profile Updation ----------------------------------------------
const updateMyProfile = async (req, res) => {
    try {
        const profileId = req.user.id;
        console.log(req.file, "file console")
        console.log(req.body, "body console")
        
        const profileInfo = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            // image_url: req.file && req.file.path ? req.file.path : null,
            image_url: req.body.image_url ? req.body.image_url : null,
            descriptions: req.body.descriptions,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zip_code: req.body.zip_code
        }
        const updatedProfile = await user.update(profileInfo, {
            where: { id: profileId },
        });
        if (updatedProfile) {
            res.status(200).json({ message: 'User Details updation successfully', profileInfo });
        } else {

            res.status(404).json({ error: `User not found ${profileId}` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

// ----------------------------------------My Profile ----------------------------------------------------


const getMyProfile = async (req, res) => {
    const profileId = req.user.id;
    try {
        const myProfile = await user.findByPk(profileId, {
            include: [{
                model: roles,
                attributes: ['role_name'],
                required: true,
            }]
        });
        if (myProfile) {
            res.status(200).json(myProfile);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
}



// -------------------------------------------------------------------------------------------------------

module.exports = {
    updateMyProfile,
    getMyProfile
};