const express = require('express');
const { jwtAuth } = require("../auth/jwt");
const { upload } = require("../libs/storage");
const { cloudinary } = require("../libs/cloudinary");

const UserService = require('../services/service.users');
// const validatorHandler = require('./../middlewares/validator.handler');
// const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();


router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    // next(error);
    console.error(error);
  }
});

// router.get('/:id',
//   validatorHandler(getUserSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const category = await service.findOne(id);
//       res.json(category);
//     } catch (error) {
//       next(error);
//     }
//   }
// );


router.post('/register',
  upload.single('avatar'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const file =  req.file;

      const rta = await cloudinary.uploader.upload(file.path);
      const newUser = {
        ...body,
        avatar: rta.secure_url,
        cloud_avatar_id: rta.public_id
      }

      const id = await service.create(newUser);
      const token = jwtAuth.createToken({ id });

      res.status(201).json({
        auth: true,
        token: token
      });
    } catch (error) {
      // next(error);
      console.error(error);
    }
  }
);

router.post('/login', 
  async (req, res) => {
    try {
      const body = req.body;
      const rta = await service.login(body);
      
      if(rta.auth){
        const id = rta.id;
        const token = jwtAuth.createToken({ id })
        res.status(201).json({
          ...rta,
          token
        })

      } else {
        res.status(201).json(rta);
      }
    } catch (error) {
      console.error(error);
    }
  }
);

router.post('/auth', 
  async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const decode = jwtAuth.decodeToken(token);
      if(decode) {
        const user = await service.findOne(decode.id)
        res.status(200).json({
          ...user,
          auth: true
        });
      } else {
        res.status(401).json({
          auth: false
        });
      }

    } catch (error) {
      // next(error);
      console.error(error);

    }
  }
);


router.patch('/:id',
upload.single('avatar'),

// validatorHandler(getUserSchema, 'params'),
// validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const file =  req.file;

      if(file) {
        const user = await service.findOne(id);
        await cloudinary.uploader.destroy(user.cloud_avatar_id);

        const rta = await cloudinary.uploader.upload(file.path);
        const updateUser = {
          ...body,
          avatar: rta.secure_url,
          cloud_avatar_id: rta.public_id
        }

        const userUpdated = await service.update(id, updateUser);
        res.status(201).json(userUpdated);
      } else {
        const userUpdated = await service.update(id, body);
        res.status(201).json(userUpdated);
      }
    } catch (error) {
      // next(error);
      console.error(error);
    }
  }
);

router.patch('/schedule/:id',
upload.single('schedule'),

// validatorHandler(getUserSchema, 'params'),
// validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const file =  req.file;

      const user = await service.findOne(id);
      const cloudinary_id = user.cloud_schedule_id;
      if (cloudinary_id) {
        await cloudinary.uploader.destroy(cloudinary_id);
      }

      const rta = await cloudinary.uploader.upload(file.path);
      const updateSchedule = {
        schedule: rta.secure_url,
        cloud_schedule_id: rta.public_id
      }

      await service.update(id, updateSchedule);
      const userupdate = await service.findOne(id);
      const userUpdated = {
      ...userupdate,
      auth: true
      }
      res.status(201).json(userUpdated);
    } catch (error) {
      // next(error);
      console.error(error);
    }
  }
);


// router.delete('/:id',
// validatorHandler(getUserSchema, 'params'),
// async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const deleteUser = await service.delete(id);
//     res.status(201).json(deleteUser);
//   } catch (error) {
//     next(error);
//   }
// }
// );

module.exports = router;