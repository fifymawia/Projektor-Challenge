// users routes

const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();
//const routes = new router();
const multer  = require('multer')

const User = require('./model');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
  });


  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });
  

/**
 * @method - POST
 * @param - /adduser
 * @description - User SignUp
 */

router.post(
    '/adduser', upload.single('thumbnailImage'), async (req, res , next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
       
        const {
            
            userName,
           
        } = req.body;
       
        try {
            let user = await User.findOne({
                userName,
            });
            if (user) {
                return res.status(400).json({
                    msg: 'User Already Exists',
                });
            }

            user = new User({
            //_id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            userName: req.body.userName,
            thumbnailImage: req.file.path,
            tweet: req.body.tweet,
            address: req.body.address
           
            
            });

            await user.save();
            //console.log(user.messagge)
            res.status(200).send('it works');


        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err.message);
            res.status(500).send('Error in Saving');
        }
    }
);


/**
 * @method - GET
 * @description - Get all Users
 * @param - /getallusers
 */

router.get('/getallusers', (req, res) => {
    User.find({})
        .then(user => {
            if (!user) {
                res.status(404).send();
            }
            res.send(user);
        }).catch((e) => {
            res.status(400).send(e);
        });
});



/**
 * @method - GET
 * @description - Get a user by Id
 * @param - /getallusers
 */

router.get('/getallusers/id/:id', (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) {
                res.status(404).send();
            }
            res.send(user);
        }).catch((e) => {
            res.status(400).send(e);
        });
});


/**
* @method - GET
* @description - deleting all records
* @param - /getallusers
*/


router.delete('/deleteusers', (req, res) => {    
   
    User.remove({})
        .then(() => {
            res.status(200).send('ok');
        });
});

/**
* @method - GET
* @description - Delete user by Id
* @param - /getallusers
*/


router.delete('/deleteuser/id/:id', (req, res) => {    
    User.remove({ _id: req.params.id })
        .then(() => {
            res.status(200).send('ok');
        });

});




module.exports = router;