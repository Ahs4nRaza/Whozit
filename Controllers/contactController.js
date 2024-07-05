const fs = require("fs");
const path = require("path");
const ContactModel = require("../Models/userContact");


module.exports.displayRecords = async (req, res) => {
    try {
        const userRecord = await ContactModel.find().exec();
        res.render('index', {
            title: 'Home Page',
            userEntry: userRecord,
        });
    } catch (err) {
        res.json({
        message: err.message
        });
    }
};

module.exports.displayForm = (req, res) => {
    res.render('addContact', { title: "Add Contact" })
};

module.exports.addContact = (req, res) => {
    const userContact = new ContactModel({
        Name: req.body.name,
        Email: req.body.email,
        Phone: req.body.phone,
        Address: req.body.address,
        Image: req.file.filename,
    });
    userContact.save().then(() => {
        req.session.message = {
            type: 'success',
            message: 'Contact added successfully!'
        };
        res.redirect('/');
    }).catch((err) => {
        res.json({ message: err.message, type: 'danger' });
    });
};

module.exports.editContact = async (req, res) => {
    try {
        const id = req.params.id;
        const userRecord = await ContactModel.findById(id);
  
        if (!userRecord) {
            return res.redirect('/'); 
        }
  
        res.render('editContact', {
            title: 'Edit Contact',
            userEntry: userRecord, 
        });
    } catch (err) {
        console.error(err); 
        res.redirect('/'); 
    }
};

module.exports.updateContact = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = {
            Name: req.body.name,
            Email: req.body.email,
            Phone: req.body.phone,
            Address: req.body.address,
        };
        
        if (req.file) {
            updatedData.Image = req.file.filename;
            const oldImagePath = path.join(__dirname, '../Upload', req.body.old_image); 
            try {
                await fs.promises.unlink(oldImagePath);
            } catch (err) {
                console.error('Error deleting old image:', err);
            }
        } else {
            if (req.body.old_image) {
                updatedData.Image = req.body.old_image;
            }
        }
  
        const updatedContactEntry = await ContactModel.findByIdAndUpdate(id, updatedData, { new: true });  
        if (!updatedContactEntry) {
            return res.json({ message: 'Contact not found!', type: 'danger' });
        }
  
        req.session.message = {
            type: 'success',
            message: 'Contact updated successfully!',
        };
  
        res.redirect('/'); 
    } catch (err) {
        console.error('Error updating contact:', err);
        res.json({ message: 'Error updating contact!', type: 'danger' }); 
    }
};

module.exports.deleteContact = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedContactEntry = await ContactModel.findByIdAndDelete(id);
  
        if (deletedContactEntry && deletedContactEntry.Image) {
            try {
                await fs.promises.unlink('./Upload/' + deletedContactEntry.Image);
            } catch (err) {
                console.error('Error deleting contact image:', err);
            }
        }
  
        if (!deletedContactEntry) {
            return res.redirect('/'); 
        }
  
        req.session.message = {
            type: 'info',
            message: 'Contact deleted successfully!',
        };
        res.redirect('/'); 
    } catch (err) {
        console.error('Error deleting contact:', err);
        res.json({ message: 'Error deleting contact!' }); 
    }
};
