# Definitions
1. A classroom is assigned to a teacher. A classroom is a list of classes.
2. Here is a class. It contains the content, like questions, active question, answers, etc.

Here is a class:
```javascript
{
    active: -1,
    questions: [
        {answers: ["Rowling", "Kinney", "Patterson", "Lil Ficara"], correct_answer: 1, question: "who wrote Harry Potter"},
        {answers: ["franz ferdinand", "Adolf", "Hitler", "Queen Elizbeth 2"], correct_answer: 1, question: "who's assination started the world war 1"},
        {answers: ["2", "1", "420", "520"], correct_answer: 1, question: "what is 1+1"},
        {answers: ["Richard", "Tyler", "Drake", "Blevins"], correct_answer: 1, question: "Ninja's first name"},
    ]
}
```

# Reading data
Use the `getClassroom(name)` function to get an object for the given classroom.

`name` is the UID of the teacher.

Use `getClassroomCode(name)` function to get the class code.

`name` is the UID of the teacher.

# Updating data
Use `updateClass(name, classToEdit, classData)` function to update a class.

`name` is the UID of the teacher.

`classToEdit` is the date of the class. Format is "feb14" or "jan26".

`classData` is the class object as defined above.

# Adding data
Use `addClass(name, classToEdit, classData)` function to add a classroom. (Auto assigns classroom code)

`name` is the UID of the teacher.

`classToEdit` is the date of the class. Format is "feb14" or "jan26".

`classData` is the class object as defined above.
