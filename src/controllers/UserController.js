const {userService} = require('../service/userService');
const {createUserDTO} = require('./dtos/createUserDto');
const {updateUserDTO} = require('./dtos/updateUserDto');

const UserController = {
    async listAll(_req, res,next) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },

    async findOne(req, res, next) {
        try {
            const user = await userService.getById(req.params.id);
            res.json(user);
        } catch (error) { next(error); }
    },

    async create(req, res, next) {
        try {
            const validatedData = createUserDTO(req.body);
            const newUser = await userService.create(validatedData);
            res.status(201).json(newUser);
        } catch (error) { next(error); }
    },

    async update(req, res, next) {
        try{
            const {id} = req.params;

            Logger.info(`Tentativa de atualização para o usuário ID: ${id}`);
            const validateData = updateUserDTO(req.body);

            await userService.update(id,validateData);
            res.status(204).send();
        }catch(error){next(error);}
    },

    async delete(req, res, next) {
        try {
            const result = await userService.delete(req.params.id);
            res.json(result);
        } catch (error) { next(error); }
    }
}

module.exports = {
    UserController
}
