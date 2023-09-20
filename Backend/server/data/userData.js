const mongoose = require("mongoose");

const users = [
    {
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com",
      "location": "New York",
      "occupation": "Software Engineer",
      "username": "johndoe",
      "password": "password123",
      "patientList": [
        {
          "firstname": "Alice ",
          "lastname": "Brown ",
          "age": 32,
          "gender": "Female",
          "birthdate": "1990-05-15"
        },
        {
          "firstname": "Bob",
          "lastname": "Smith",
          "age": 45,
          "gender": "Male",
          "birthdate": "1978-08-22"
        }
      ]
    },
    {
      "firstname": "Jane",
      "lastname": "Smith",
      "email": "jane.smith@example.com",
      "location": "San Francisco",
      "occupation": "Doctor",
      "username": "janesmith",
      "password": "securepass",
      "patientList": [
        {
          "firstname": "Ava",
          "lastname": "Anderson",
          "age": 28,
          "gender": "Female",
          "birthdate": "1995-02-10"
        },
        {
          "firstname": "David",
          "lastname": "Brown",
          "age": 55,
          "gender": "Male",
          "birthdate": "1968-12-05"
        }
      ]
    },
    {
        "firstname": "Mary",
        "lastname": "Johnson",
        "email": "mary.johnson@example.com",
        "location": "Los Angeles",
        "occupation": "Nurse",
        "username": "maryj",
        "password": "nursepass",
        "patientList": [
          {
            "firstname": "Grace",
          "lastname": "Taylor",
            "age": 22,
            "gender": "Female",
            "birthdate": "2001-07-18"
          },
          {
            "firstname": "John",
            "lastname": "Wilson",
            "age": 62,
            "gender": "Male",
            "birthdate": "1959-03-30"
          }
        ]
      },
      {
        "firstname": "Emily",
        "lastname": "Davis",
        "email": "emily.davis@example.com",
        "location": "Chicago",
        "occupation": "Pharmacist",
        "username": "emilyd",
        "password": "pharmapass",
        "patientList": [
          {
            "firstname": "Sophia",
            "lastname": "Lee",
            "age": 35,
            "gender": "Female",
            "birthdate": "1988-09-25"
          },
          {
            "firstname": "Michael",
            "lastname": "Clark",
            "age": 42,
            "gender": "Male",
            "birthdate": "1981-06-12"
          }
        ]
      }
]
  
module.exports = users; 