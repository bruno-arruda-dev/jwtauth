type TRegisterType = {
    name: string, 
    email: string,
    password: string, 
    confirmPassword: string,
}

class RegisterService {

    
    async execute({ name, email, password, confirmPassword }: TRegisterType) {

        console.log(`Cadastrando: ${name}`);
    }
}

export { RegisterService };