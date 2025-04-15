import db from "./database.js";
import app from "./routing.js";

const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send('res working')
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});