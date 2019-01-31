"use strict";

const fetch = require("node-fetch");

class MyEdenredCardService {
    constructor() {
        this._session = null;
    }

    async login(username, password) {
        const response = await fetch(
            "https://www.myedenred.pt/edenred-customer/api/authenticate/default",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: username,
                    password: password,
                }),
            });

        const responseData = await response.json();

        if ('internalCode' in responseData) {
            throw `failed to login: ${responseData.internalCode} ${responseData.message.join(" ")}`;
        }

        this._session = {
            token: responseData.data.token,
            customer: responseData.data.customer,
        };
    }

    async getCards() {
        const response = await fetch(
            "https://www.myedenred.pt/edenred-customer/api/protected/card/list",
            {
                headers: {
                    "Authorization": this._session.token,
                },
            });

        const responseData = await response.json();

        // TODO validate the responseData.

        return responseData.data;
    }

    async getTransactions(cardId) {
        const response = await fetch(
            `https://www.myedenred.pt/edenred-customer/api/protected/card/${cardId}/accountmovement`,
            {
                headers: {
                    "Authorization": this._session.token,
                },
            });

        const responseData = await response.json();

        // TODO validate the responseData.

        return {
            account: responseData.data.account,
            transactions: responseData.data.movementList,
        };
    }
}

async function main(username, password) {
    const service = new MyEdenredCardService();

    await service.login(username, password);

    const cards = await service.getCards();

    for (const card of cards) {
        const transactions = await service.getTransactions(card.id);

        console.log(
            transactions.account.cardNumber,
            transactions.account.cardHolderFirstName,
            `(${transactions.account.cardHolderLastName})`,
            "balance",
            transactions.account.availableBalance);

        for (const transaction of transactions.transactions) {
            console.log(
                transactions.account.cardNumber,
                transaction.transactionDate,
                transaction.amount.toFixed(2).toString().padStart(8, ' '),
                transaction.transactionName.replace("Compra: ", ""));
        }
    }
}

main(process.argv[2], process.argv[3]).catch(console.error);
