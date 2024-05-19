import  Mongoose  from "mongoose";


 const dbConnection =()=>{
    Mongoose.connect(process.env.MONGO_URI,{
        dbName :"JOB_SEEKING_MERN_STACK",
    })
    .then(()=>{
        console.log("Connection Successfully");
    })
    .catch((err)=>{
        console.log(`Some error occured while connecting to database: ${err}`);

    });
};
export default dbConnection