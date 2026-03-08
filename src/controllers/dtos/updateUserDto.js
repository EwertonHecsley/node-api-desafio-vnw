const updateUserDTO = (data) => {
    const errors = [];
    const sanitizedData = {};

    if (data.name !== undefined) {
        if (typeof data.name !== 'string' || data.name.length < 3) {
            errors.push('O campo "name" deve ser uma string com pelo menos 3 caracteres.');
        } else {
            sanitizedData.name = data.name;
        }
    }

    if (data.email !== undefined) {
        if (typeof data.email !== 'string' || !/\S+@\S+\.\S+/.test(data.email)) {
            errors.push('O campo "email" deve ser uma string e deve ser um email válido.');
        } else {
            sanitizedData.email = data.email;
        }
    }

    if (data.phone !== undefined) {
        if (typeof data.phone !== 'string' || !/^\d{10,11}$/.test(data.phone)) {
            errors.push('O campo "phone" deve ser uma string e deve conter entre 10 e 11 dígitos.');
        } else {
            sanitizedData.phone = data.phone;
        }
    }

    if (data.message !== undefined) {
        if (typeof data.message !== 'string' || data.message.length > 500) {
            errors.push('O campo "message" deve ser uma string e deve conter no máximo 500 caracteres.');
        } else {
            sanitizedData.message = data.message;
        }
    }

    if (Object.keys(sanitizedData).length === 0 && errors.length === 0) {
        const error = new Error('Nenhum dado válido para atualização foi enviado.');
        error.status = 400;
        throw error;
    }

    if (errors.length > 0) {
        const error = new Error('Falha na validação dos dados de atualização.');
        error.status = 400;
        error.details = errors;
        throw error;
    }

    return sanitizedData;
};

module.exports = {
    updateUserDTO
}