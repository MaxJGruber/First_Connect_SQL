const express = require("express");
const router = express.Router();
const Customer = require("../Model/Customer");
  
    // Create a new Customer
    router.post("/customers", (req, res) => {
        // Validate request
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }
      
        // Create a Customer
        const customer = new Customer({
          email: req.body.email,
          name: req.body.name,
          active: req.body.active
        });
      
        // Save Customer in the database
        Customer.create(customer, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Customer."
            });
          else res.send(data);
        });
      });
  
    // Retrieve all Customers
    router.get("/customers", (req, res) => {
        Customer.getAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving customers."
            });
          else res.send(data);
        });
      });
  
    // Retrieve a single Customer with customerId
    router.get("/customers/:customerId", (req, res) => {
        Customer.findById(req.params.customerId, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Customer with id ${req.params.customerId}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Customer with id " + req.params.customerId
              });
            }
          } else res.send(data);
        });
      });
  
    // Update a Customer with customerId
    router.put("/customers/:customerId", (req, res) => {
        // Validate Request
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }
      
        Customer.updateById(
          req.params.customerId,
          new Customer(req.body),
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Customer with id ${req.params.customerId}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating Customer with id " + req.params.customerId
                });
              }
            } else res.send(data);
          }
        );
      });
  
    // Delete a Customer with customerId
    router.delete("/customers/:customerId", (req, res) => {
        Customer.remove(req.params.customerId, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Customer with id ${req.params.customerId}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete Customer with id " + req.params.customerId
              });
            }
          } else res.send({ message: `Customer was deleted successfully!` });
        });
      });
  
    // Create a new Customer
    router.delete("/customers",  (req, res) => {
        Customer.removeAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all customers."
            });
          else res.send({ message: `All Customers were deleted successfully!` });
        });
      });

      module.exports = router;