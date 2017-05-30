const express = require('express');
const Transaction = require('../model/transaction');

const router = new express.Router();

// Handle Create transactions and Read transactions
router.route('/transactions').get(function(req, res) {
  Transaction.find(function(err, transactions) {
    if (err) {
      res.send(err);
    } else {
      res.json(transactions);
    }
  });
})
.post(function(req, res) {
  let transaction = new Transaction({title: req.body.title, amount: req.body.amount, transactionType: req.body.transactionType});
  transaction.save(function(err, newTransaction) {
    res.json(newTransaction);
  });
});

// Handle Update and Delete transactions
router.route('/transactions/:transaction_id').put(function(req, res) {
  Transaction.findById(req.params.transaction_id, function(err, transaction) {
    if (err) {
      res.send(err);
    } else {
      (req.body.title) ? transaction.title = req.body.title : null;
      (req.body.amount) ? transaction.amount = req.body.amount : null;
      transaction.save(function(err, updatedTransaction) {
        if (err) {
          res.send(err);
        } else {
          res.json(updatedTransaction);
        }
      })
    }
  })
})
.delete(function(req, res) {
  Transaction.remove({_id: req.params.transaction_id}, function(err, transaction) {
    if (err) {
      res.send(err);
    } else {
      res.json(req.params.transaction_id);
    }
  });
});

module.exports = router;
