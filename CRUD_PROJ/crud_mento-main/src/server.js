const express = require("express");

const main = () =>{
    const app = express();
    const PORT = 3000;

    app.listen(PORT, ()=> console.log("Server on"));
}

main();