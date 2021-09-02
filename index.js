const Joi = require('joi');
const express = require ('express');
const app = express();
app.use(express.json());
const courses = [
    { id: 1, name: 'courses1'},
    { id: 2, name: 'courses2'},
    { id: 3, name: 'courses3'},
];
app.get('/', (req, res)=>{
    res.send('Hello Ryan Whyte, the world is yours');

});

app.get('/api/courses', (req, res)=>{
    res.send(courses);
});

app.get('/api/courses/:id', (req, res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
   if(!course)  return res.status(404).send('The course with the given ID was not found. '); 
   res.send(course);
   //404 ERROR 
});

app.post('/api/courses', (req, res) =>{
    /*const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    console.log(result);
   // if (!req.body.name || req.body.name.length <3){
       if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;  
    }*/


    const {error }= validateCourse(req.body);// result.error

if(error) return  res.status(400).send(result.error.details[0].message);


    
    const course= {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course); 
});

app.put('/api/courses/:id', (req, res)=> {
    const course = courses.find(c=> c.id === parseInt(req.params.id));
   if(!course)  
    return res.status(404).send('The course with the given ID was not found. '); 

   //validate
   //if invalid, return 400- bad request
   
//const result= validateCourse(req.body);
const {error }= validateCourse(req.body);// result.error

if(error)
   return  res.status(400).send(result.error.details[0].message);
    

//update course
course.name= req.body.name;
//return the updated course
res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

app.get('/api/posts/:year/:month', (req, res)=> {
    res.send(req.params);
});

app.delete('/api/courses/:id', (req, res)=> {

    //look up the course and return a 404 error
    const course = courses.find(c=> c.id === parseInt(req.params.id));
   if(!course)  return res.status(404).send('The course with the given ID was not found. ');

 const index =  courses.indexOf(course);
 courses.splice(index, 1);

 res.send(course);
});
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));
