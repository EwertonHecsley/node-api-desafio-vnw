const createUserDTO = (data)=>{
    const errors = [];

    if(!data.name || typeof data.name !== 'string' || data.name.length < 3){
        errors.push('O campo "name" é obrigatório e deve ser uma string com pelo menos 3 caracteres.');
    }

    if(!data.email || typeof data.email !== 'string' || !/\S+@\S+\.\S+/.test(data.email)){
        errors.push('O campo "email" é obrigatório, deve ser uma string e deve ser um email válido.');
    }

    if(!data.phone || typeof data.phone !== 'string' || !/^\d{10,11}$/.test(data.phone)){
        errors.push('O campo "phone" é obrigatório, deve ser uma string e deve conter entre 10 e 11 dígitos.');
    }

    if(!data.message || typeof data.message !== 'string' || data.message.length > 500){
        errors.push('O campo "message" é obrigatório, deve ser uma string e deve conter no máximo 500 caracteres.');
    }

    if(errors.length > 0){
        const error = new Error('Falha na validacao dos dados.');
        error.status = 400;
        error.details = errors;
        throw error;
    }

    return {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message
    };
}

module.exports = {
    createUserDTO
}