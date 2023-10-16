/** @format */

// CRUD create read update delete

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const objectId = mongodb.ObjectId;

const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
const id = new ObjectId();

/*
console.log(id);
console.log(id.id);
console.log(id.toHexString());
console.log(id.getTimestamp());
*/
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);
    db.collection("tasks")
      .deleteOne({
        description: "Clean the table",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    /* db.collection("users")
      .deleteMany({
        age: 27,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
*/
    /* db.collection("tasks")
      .updateMany(
        {
          completed: false,
        },
        {
          $set: {
            completed: true,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      */

    /*
    db.collection("users")
      .updateOne(
        {
          _id: new ObjectId("652bc48003038946c031b06e"),
        },
        {
          // $set: {
          //   name: "Gunther friends",
          // },
          $inc: {
            age: 1,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    */

    //for users
    /*
    db.collection("users").findOne(
      { _id: new ObjectId("652bc48003038946c031b06e") },
      (error, user) => {
        if (error) {
          console.log("Unable to fetch");
        }
        console.log(user);
      }
    );

    db.collection("users")
      .find({ age: 27 })
      .toArray((error, users) => {
        console.log(users);
      });

    db.collection("users")
      .find({ age: 27 })
      .count((error, count) => {
        console.log(count);
      });
    */
    //for tasks

    /* db.collection("tasks").findOne(
      { _id: new ObjectId("652bcf6e10b936c8ce14a50c") },
      (error, task) => {
        console.log(task);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        console.log(tasks);
      });
  */

    /* 
    db.collection("users").insertOne(
      {
        name: "Vikram",
        age: 27,
      },
      (error, result) => {
        if (error) {
          return console.log("Unable to insert user");
        }
        console.log(result.insertedId);
      }
    );
    */

    /*
    db.collection("tasks").insertMany(
      [
        {
          description: "Clean the table",
          completed: true,
        },
        {
          description: "Watch udemy nodejs course",
          completed: false,
        },
        {
          description: "Drink Water",
          completed: false,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert tasks!");
        }
        console.log(result.insertedIds);
      }
    );*/
  }
);
