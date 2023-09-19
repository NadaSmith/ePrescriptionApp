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
          "name": "Alice Johnson",
          "age": 32,
          "gender": "Female",
          "birthdate": "1990-05-15"
        },
        {
          "name": "Bob Smith",
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
          "name": "Eva Anderson",
          "age": 28,
          "gender": "Female",
          "birthdate": "1995-02-10"
        },
        {
          "name": "David Brown",
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
            "name": "Grace Taylor",
            "age": 22,
            "gender": "Female",
            "birthdate": "2001-07-18"
          },
          {
            "name": "John Wilson",
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
            "name": "Sophia Lee",
            "age": 35,
            "gender": "Female",
            "birthdate": "1988-09-25"
          },
          {
            "name": "Michael Clark",
            "age": 42,
            "gender": "Male",
            "birthdate": "1981-06-12"
          }
        ]
      }
]
  
module.exports = users; 