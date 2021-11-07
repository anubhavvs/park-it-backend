import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Anubhav Saha',
        email: 'temp@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        number: '9898989898',
        plate: 'LR33TEE',
        isAdmin: false,
        activeBooking: false
    },
    {
        name: 'John Doe',
        email: 'random@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        number: '852520156',
        plate: 'DL49AK49',
        isAdmin: false,
        activeBooking: false
    },
    {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
];

export default users;