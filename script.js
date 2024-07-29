// const connectDB = require('./config/db');
// const File = require('./models/file');
// const fs = require('fs');

// connectDB();

// // Get all records older than 24 hours 
// async function fetchData() {
//     const files = await File.find({ createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } })
//     if (files.length) {
//         for (const file of files) {
//             try {
//                 fs.unlinkSync(file.path);
//                 await file.remove();
//                 console.log(`successfully deleted ${file.filename}`);
//             } catch (err) {
//                 console.log(`error while deleting file ${err} `);
//             }
//         }
//     }
//     console.log('Job done!');
// }

// fetchData().then(process.exit);
const connectDB = require('./config/db');
const File = require('./models/file');
const fs = require('fs');
const path = require('path');

connectDB();

// Get all records older than 24 hours
async function fetchData() {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const filesToDelete = await File.find({ createdAt: { $lt: twentyFourHoursAgo } });

        if (filesToDelete.length) {
            console.log('Files to delete:', filesToDelete);

            for (const file of filesToDelete) {
                try {
                    const filePath = path.resolve(file.path);
                    console.log(`Attempting to delete file: ${filePath}`);

                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                        await File.findByIdAndRemove(file._id);
                        console.log(`Successfully deleted ${file.filename}`);
                    } else {
                        console.log(`File not found: ${filePath}`);
                    }
                } catch (err) {
                    console.error(`Error while deleting file ${file.filename}: ${err}`);
                }
            }
        } else {
            console.log('No files to delete.');
        }

        console.log('Job done!');
    } catch (error) {
        console.error(`Error fetching or deleting files: ${error}`);
    }
}

fetchData().then(() => {
    process.exit();
}).catch((error) => {
    console.error(`Error during script execution: ${error}`);
    process.exit(1);
});



/*
const connectDB = require('./config/db');
const File = require('./models/file');
const fs = require('fs');

connectDB();

// Get all records older than 24 hours 
async function fetchData() {
    try {
        const files = await File.find({ createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } });

        if (files.length) {
            for (const file of files) {
                try {
                    if (fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                        await file.remove();
                        console.log(`successfully deleted ${file.filename}`);
                    } else {
                        console.log(`file ${file.filename} not found`);
                    }
                } catch (err) {
                    console.log(`error while deleting file ${err}`);
                }
            }
        }

        console.log('Job done!');
    } catch (error) {
        console.error(`Error fetching files: ${error}`);
    }
}

fetchData().then(() => {
    process.exit();
}).catch((error) => {
    console.error(`Error during script execution: ${error}`);
    process.exit(1);
});
* */