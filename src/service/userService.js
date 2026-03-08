const fs = require('fs/promises');
const path = require('path');
const {Logger} = require('../config/validateEnviroment');

const FILE_PATH = path.join(__dirname, '../data/users.json');

const userService = {
    async _ensureFileExists() {
        try {
            await fs.access(FILE_PATH);
        } catch (err) {
            Logger.warn('Arquivo users.json não encontrado. Criando um novo arquivo vazio.');
            await fs.writeFile(FILE_PATH, JSON.stringify([]));
        }
    },


    async getAllUsers() {
        try{
            await this._ensureFileExists();
            const data = await fs.readFile(FILE_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            Logger.error(`Erro ao ler o arquivo users.json: ${err.message}`);
            throw new Error('Não foi possível acessar os dados dos usuários. Por favor, tente novamente mais tarde.');
        }
    },

    async create(data){
        try{
            const users = await this.getAllUsers();
            
            if(users.find(u => u.email === data.email)) {
                const error = new Error(`E-mail já cadastrado.`);
                error.status = 409;
                throw error;
            }

            if(users.find(u => u.phone === data.phone)) {
                const error = new Error(`Telefone já cadastrado.`);
                error.status = 409;
                throw error;
            }

            const newUser = {
                id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                ...data,
                createdAt: new Date().toISOString()
            };
            users.push(newUser)

            await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2));
            Logger.info(`Novo usuário criado: ${newUser.name} (ID: ${newUser.id})`);
            return newUser;
        }catch (err){
            if (err.status) throw err;
            Logger.error(`Erro crítico no Service: ${err.message}`);
            const error = new Error('Não foi possível processar sua solicitação.');
            error.status = 500;
            throw error;
        }
    },

    async getById(id) {
        const users = await this.getAllUsers();
        const user = users.find(u => u.id === Number(id));
        
        if (!user) {
            const error = new Error("Usuário não encontrado.");
            error.status = 404;
            throw error;
        }
        return user;
    },

    async update(id, updateData) {
        const users = await this.getAllUsers();
        const index = users.findIndex(u => u.id === Number(id));

        if (index === -1) {
            const error = new Error("Usuário não encontrado para atualização.");
            error.status = 404;
            throw error;
        }

        if (updateData.email && users.find(u => u.email === updateData.email && u.id !== Number(updateData.id))) {
            const error = new Error("E-mail já está em uso por outro usuário.");
            error.status = 409;
            throw error;
        }

        if (updateData.phone && users.find(u => u.phone === updateData.phone && u.id !== Number(updateData.id))) {
            const error = new Error("Telefone já está em uso por outro usuário.");
            error.status = 409;
            throw error;
        }

        users[index] = { 
            ...users[index], 
            ...updateData, 
            updatedAt: new Date().toISOString() 
        };

        await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2));
        Logger.info(`Usuário atualizado: ${id}`);
        
        return users[index];
    },

    async delete(id) {
        const users = await this.getAllUsers();
        const filteredUsers = users.filter(u => u.id !== Number(id));

        if (users.length === filteredUsers.length) {
            const error = new Error("Usuário não encontrado para exclusão.");
            error.status = 404;
            throw error;
        }

        await fs.writeFile(FILE_PATH, JSON.stringify(filteredUsers, null, 2));
        Logger.warn(`Usuário removido do sistema: ${id}`);
        
        return { message: "Usuário removido com sucesso" };
    }
}

module.exports = {
    userService
}