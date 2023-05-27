require('dotenv').config();
const mongoose = require('mongoose');

const Person = require('./Models/person');

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connexion à MongoDB Atlas réussie');

        const newPerson = new Person({
            name: 'Youssouf',
            age: 20,
            favoriteFoods: ["Sauce Arachide", "Sauce Tomate"]
        });

        newPerson.save()
            .then(person => {
                console.log('Person created:', person);
            })
            .catch(err => {
                console.log(err.message);
            });

        const arrayOfPeople = [
            { name: 'Azzedine', age: 21, favoriteFoods: ['Sushi', 'Pasta'] },
            { name: 'Elie', age: 20, favoriteFoods: ['Burger', 'Ice Cream','Burritos'] },
            { name: 'Marco', age: 19, favoriteFoods: ['Aile de poulet', 'Cotis', 'Tchiep'] },
            { name: 'Mary', age: 26, favoriteFoods: ['Pizza', 'Guacamolle'] },
            { name: 'Yves', age: 22, favoriteFoods: ['Manio', 'Tchiep', 'Burritos'] },
            { name: 'Samuel', age: 20, favoriteFoods: ['Burger', 'Ice Cream', 'Burritos'] },
            { name: 'Jerry', age: 23, favoriteFoods: ['Steak', 'Cotis'] }
        ];

        // Create many people with the model Person.

        Person.create(arrayOfPeople)
            .then(person => {
                console.log('People created:', person);
            })
            .catch(err => {
                console.log(err.message);
            });

        // find a people by his name
        
        Person.find({ name: "Elie" })
            .then(people => {
                    console.log('People found:', people);
                })
                .catch(err => {
                        console.log(err.message);
                    });
                
        // find a people by his name

        Person.findOne({ favoriteFoods: "Steak"})
        .then(people => {
            console.log('People found:', people);
        })
        .catch(err => {
            console.log(err.message);
        });

        // find a people by his Id

        const personId = "64726001c106daf936617dc3"

        Person.findById({_id : "64726001c106daf936617dc5"})
        .then(people => {
            console.log('People found:', people);
        })
        .catch(err => {
            console.log(err.message);
        });

        // find a people by his Id and Add "hamburger" to the list of the person's favoriteFoods

        Person.findById({_id : personId})
        .then(person => {
            if (person) {
                person.favoriteFoods.push("hamburger");
                person.save()
                    .then(updatedPerson => {
                        console.log('Person updated:', updatedPerson);
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            } else {
                console.log('Person not found:');
            }
        })
        .catch(err => {
            console.log(err.message);
        });


        // find a person by his name and update his age
        const personName = "Elie";

        Person.findOneAndUpdate({name :personName}, {age: 21}, {new: true})
        .then(person => {
            if (person) {
                console.log('Person updated:', person);
            } else {
                console.log('Person not found.');
            }
        })
        .catch(err => {
            console.log(err.message);
        });

        // find and remove a person by his id

        Person.findOneAndRemove(personId)
        .then(person => {
            if (person) {
                console.log('Person Removed');
            } else {
                console.log('Person Not Found');
            }
        })
        .catch(err => {
            console.log(err.message);
        });

        //  Remove all people whose name is "Mary"

        Person.deleteMany({ name: "Mary" })
        .then(person => {
            console.log("Number of people removed:", person.deletedCount);
        })
        .catch(err => {
            console.log(err.message);
        });


        // Find people who like burritos

        Person.find({ favoriteFoods: "Burritos" })
            .sort({ name: 1 }) 
            .limit(2) 
            .select("-createdAt -updatedAt")
            .exec()
            .then(data => {
                console.log("People who like Burritos:", data);
            })
            .catch(err => {
                console.log(err.message);
            });


    } catch (error) {
        console.log(error.message);
    }
})();