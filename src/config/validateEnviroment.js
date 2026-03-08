const Logger = {
  info: (msg) => console.log(`\x1b[36m[INFO]\x1b[0m [${new Date().toISOString()}] ${msg}`),
  error: (msg) => console.error(`\x1b[31m[ERROR]\x1b[0m [${new Date().toISOString()}] ${msg}`),
  warn: (msg) => console.warn(`\x1b[33m[WARN]\x1b[0m [${new Date().toISOString()}] ${msg}`)
};

const Environment = Object.freeze({
  PRODUCTION: 'production',
  DEVELOPMENT: 'development'
});

const validateEnviroment = () =>{
    Logger.info('Validando variáveis de ambiente...');

    const requiredEnvVars = ['NODE_ENV', 'PORT'];
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

    if (missingEnvVars.length > 0) {
        Logger.error(`Falha critica: Variáveis ausentes -> ${missingEnvVars.join(', ')}`);
        process.exit(1);
    }

    if (!Object.values(Environment).includes(process.env.NODE_ENV)) {
        Logger.error(`Falha critica: Valor inválido para NODE_ENV: ${process.env.NODE_ENV}. Deve ser 'production' ou 'development'.`);
        process.exit(1);
    }

    Logger.info("✅ Ambiente validado com sucesso!");

    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        Environment
    };
}

module.exports = {
    validateEnviroment,
    Logger
}