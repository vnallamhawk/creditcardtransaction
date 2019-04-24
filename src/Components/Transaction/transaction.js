import React, { Component } from 'react';
import Rewards from '../Rewards/rewards';

class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [{
                "id": 1,
                "custId": 121,
                "name": "Rakesh",
                "transactionDate": "04-Mar-2019",
                "amount": 50
            },
            {
                "id": 2,
                "custId": 124,
                "name": "ajay",
                "transactionDate": "04-Mar-2019",
                "amount": 200
            },
            {
                "id": 3,
                "custId": 124,
                "name": "ajay",
                "transactionDate": "05-Mar-2019",
                "amount": 60
            },
            {
                "id": 4,
                "custId": 124,
                "name": "ajay",
                "transactionDate": "05-Mar-2019",
                "amount": 120
            },
            {
                "id": 5,
                "custId": 124,
                "name": "ajay",
                "transactionDate": "03-Apr-2019",
                "amount": 120
            }
            ]
        }
    }

    render() {
        const { transactions } = this.state;
        return (
            <>
                <div className="header">Credit Card Summary</div>
                <Rewards transactions={transactions} />
                <div className="header">Credit Card Transaction(Last 3 months)</div>
                <table className="transaction" style={{align:'center'}}>
                    <th>Name</th>
                    <th>Transaction Date</th>
                    <th>Amount</th>
                    {transactions.map((transaction) => <tr>
                        <td>
                            {transaction.name}
                        </td>
                        <td>
                            {transaction.transactionDate}
                        </td>
                        <td>
                            ${transaction.amount}
                        </td>
                    </tr>
                    )}
                </table>  </>);
    }
}

export default Transaction;