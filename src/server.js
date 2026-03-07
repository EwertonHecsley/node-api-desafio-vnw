const { app } = require('./index');
const { validateEnviroment, Logger } = require('./config/validateEnviroment');
const { gracefulShutdown } = require('./utils/gracefullShutdown');

const env = validateEnviroment();

async function startServer() {
    try {
        Logger.info(`Iniciando aplicação em modo ${env.NODE_ENV}...`);

        const server = app.listen(env.PORT, () => {
            Logger.info(`Servidor rodando na porta ${env.PORT}`);
        });

        const shutdownHandler = gracefulShutdown(server);

        process.on('SIGINT', ()=> shutdownHandler('SIGINT'));
        process.on('SIGTERM', ()=> shutdownHandler('SIGTERM'));

    } catch (error) {
        Logger.error(`Erro ao iniciar o servidor: ${error.message}`);
        process.exit(1);
    }
}

module.exports = {
    startServer
}