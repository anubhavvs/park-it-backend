import dotenv from 'dotenv';
import users from './data/users.js';
import areas from './data/areas.js';
import User from './models/userModel.js';
import Area from './models/areaModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Area.deleteMany();

        await User.insertMany(users);
        await Area.insertMany(areas);

        console.log('Data imported!');
        process.exit();
    } catch(error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Area.deleteMany();

        console.log('Data destroyed!');
        process.exit();
    } catch(error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if(process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}