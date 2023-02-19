const express = require('express');
const bodyParser = require('body-parser');

let path = require('path')
let urlencodedparser = bodyParser.urlencoded({extended:true})
const fs = require('fs')
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs')














app.get('/', (req,res)=>{
  
    
    res.render('index')
  
})
  

app.get("/meal", (req,res)=>{
    res.render("meal")
})

app.post('/search-meal', urlencodedparser, (req,res)=>{
    try {

        let meals = JSON.parse(fs.readFileSync('./db/ingredients.json', 'utf8'));
        let filtered = []
        let text = req.body.text.split('\n')

        meals.forEach((meal,index)=>{
            var cr = 0
            for(var i = 0; i <text.length; i++){
                if(meal.ing.indexOf(text[i].trim()) != -1){
                    cr += 1
                }
            }
            if(cr == text.length){
                filtered.push(meal)
            }
        })
        res.json({meals:filtered})
        
        
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
})

app.get('/create', (req,res)=>{
    res.render('create')
})

app.post('/getlisting', (req, res)=>{
    let meals = JSON.parse(fs.readFileSync('./db/ingredients.json', 'utf8'));
    res.json({meals})
})



app.post('/addmeal', urlencodedparser, (req,res)=>{
    let meals = JSON.parse(fs.readFileSync('./db/ingredients.json', 'utf8'));
    meals.unshift({
        "id":Date.now(),
        "title":req.body.title,
        "ing":req.body.ings
    })

    let newmeals = JSON.stringify(meals, null, 4);
    
        // write file to disk
        
    fs.writeFileSync('./db/ingredients.json',newmeals, 'utf8');
    res.json({meals})
})



app.post('/delete', urlencodedparser, (req,res)=>{
    let meals = JSON.parse(fs.readFileSync('./db/ingredients.json', 'utf8'));
    meals.forEach((meal, index)=>{
        if(meal.id == req.body.id){
            meals.splice(index, 1)
        }
    })
    let newmeals = JSON.stringify(meals, null, 4);
    
        // write file to disk
        
    fs.writeFileSync('./db/ingredients.json',newmeals, 'utf8');
    res.json({meals})
})







app.use((req,res)=>{
res.redirect('/')
})


const server = app.listen(process.env.PORT || 5000, () => {
const port = server.address().port;
console.log(`Express is working on port ${port}`);
});
  