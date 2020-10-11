const router = require('express').Router();

const {filterByQuery, findById, createNewAnimal, validateAnimal} = require('../../lib/animals');
const {animals} = require('../../data/animals');
const { builtinModules } = require('module');

router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
})

// params come immediately after the animals/, unlike query string which comes after ?
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result){
        res.json(result);    
    } else {
        res.send(404);
    }
})

router.post('/animals', (req, res) => {
    // req.body is incoming content
    // set id for incoming data based on length of existing data array
    req.body.id = animals.length.toString();
    if (!validateAnimal(req.body)){
        // 400 indicates user error
        res.status(400).send('The animal is not properly formatted.');
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }  
})

module.exports = router;