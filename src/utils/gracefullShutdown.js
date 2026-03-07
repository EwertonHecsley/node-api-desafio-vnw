const { Logger } = require('../config/validateEnviroment');

const gracefulShutdown = (server) => {
    return (signal) => {
        Logger.warn(`Sinal ${signal} recebido. Encerrando de forma segura...`);

        server.close(async () => {
            Logger.info("Servidor HTTP encerrado.");
            
            try {
                Logger.info("Recursos liberados com sucesso.");
                process.exit(0);
            } catch (err) {
                Logger.error(`Erro ao fechar recursos: ${err.message}`);
                process.exit(1);
            }
        });
        
        setTimeout(() => {
            Logger.error("Shutdown forçado: Tempo limite excedido.");
            process.exit(1);
        }, 10000);
    };
};

module.exports = { gracefulShutdown };