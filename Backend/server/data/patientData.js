const mongoose = require("mongoose");

const mockPatients = [
    {
      firstname: "John",
      lastname: "Doe",
      age: 35,
      birthdate: new Date("1987-05-15"),
      gender: "Male",
    },
    {
      firstname: "Jane",
      lastname: "Smith",
      age: 28,
      birthdate: new Date("1994-09-22"),
      gender: "Female",
    },
    {
      firstname: "Michael",
      lastname: "Johnson",
      age: 42,
      birthdate: new Date("1980-03-10"),
      gender: "Male",
    },
    {
      firstname: "Emily",
      lastname: "Brown",
      age: 31,
      birthdate: new Date("1991-11-05"),
      gender: "Female",
    },
    {
      firstname: "David",
      lastname: "Lee",
      age: 29,
      birthdate: new Date("1993-07-18"),
      gender: "Male",
    },
    {
        firstname: "Sarah",
        lastname: "Johnson",
        age: 45,
        birthdate: new Date("1978-02-20"),
        gender: "Female",
      },
      {
        firstname: "Robert",
        lastname: "Davis",
        age: 55,
        birthdate: new Date("1967-08-12"),
        gender: "Male",
      },
      {
        firstname: "Linda",
        lastname: "Wilson",
        age: 60,
        birthdate: new Date("1962-04-05"),
        gender: "Female",
      },
      {
        firstname: "William",
        lastname: "Martinez",
        age: 38,
        birthdate: new Date("1985-12-30"),
        gender: "Male",
      },
      {
        firstname: "Michelle",
        lastname: "Clark",
        age: 28,
        birthdate: new Date("1994-06-08"),
        gender: "Female",
      },
      {
        firstname: "Daniel",
        lastname: "Taylor",
        age: 50,
        birthdate: new Date("1973-11-15"),
        gender: "Male",
      },
      {
        firstname: "Susan",
        lastname: "White",
        age: 52,
        birthdate: new Date("1971-09-25"),
        gender: "Female",
      },
      {
        firstname: "Richard",
        lastname: "Anderson",
        age: 47,
        birthdate: new Date("1976-03-18"),
        gender: "Male",
      },
  ];
  
  module.exports = mockPatients;