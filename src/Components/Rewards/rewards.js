import React, { Component } from 'react';
import moment from 'moment'

class Rewards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: props.transactions,
            customers: [],
            customer: "",
            month: "",
            monthlyPoints: 0,
            totalPoints: 0,
            showPoints: false
        }
        this.months = moment.monthsShort();
    }

    componentWillMount = () => {
        this.setState({
            customers: this.state.transactions.reduce((customers, current) => {
                if (customers.findIndex((customer) => customer["name"] === current["custId"]) === -1) {
                    customers.push({ "name": current["custId"], "value": current["name"] })
                }
                return customers
            }, [])
        })

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    computePoints = (transaction) => {
        let points = 0;
        transaction.forEach(function (element) {
            let x = element["amount"] / 100;
            if (x > 1) {
                points += (element["amount"] - 100) * 2 + 50;
            }
            else if (x > 0.5)
                points += (element["amount"] - 50) * 1;
        });
        return points;
    }

    calculatePoints = () => {
        const totalTransaction = this.state.transactions.filter((transaction) => {
            return transaction.custId.toString() === this.state.customer
        })
        const monthlyTransaction = this.state.transactions.filter((transaction) => {
            return transaction.custId.toString() === this.state.customer
                && moment(transaction.transactionDate).format("MMM").toString() === this.state.month
        })
        const monthlyPoints = this.computePoints(monthlyTransaction);
        const totalPoints = this.computePoints(totalTransaction);
        this.setState({ monthlyPoints, totalPoints, showPoints: true })

    }

    render() {
        const { customers, transactions, monthlyPoints, totalPoints, showPoints } = this.state;
        return (<>
            {showPoints && <span className="results">Monthly Points: {monthlyPoints}</span>}
            {showPoints && <pan className="results">Total Points: {totalPoints}</pan>}
            <table>
            <tr><td>Customer Name</td>
            <td><select name="customer" onChange={this.onChange}>
                {
                    customers.map((customer) => <option name={customer.name} value={customer.name}>{customer.value}</option>)
                }
            </select>
            </td>
            </tr>
            <tr><td>Month</td>
            <td><select name="month" onChange={this.onChange}>
                {
                    this.months.map((month) => <option name={month} value={month}>{month}</option>)
                }
            </select>
            </td>
            </tr>
         
        </table>
            <button id="points" onClick={this.calculatePoints}> Calculate Points </button></>
            );
    }
}

export default Rewards;