import { ExtensionProvider } from "@elrondnetwork/erdjs-extension-provider";
import { Address, SignableMessage, Transaction, TransactionPayload } from "@elrondnetwork/erdjs";

export class Extension {
    constructor() {
        this.provider = ExtensionProvider.getInstance();
    }

    async login() {
        await this.provider.init();
        const address = await this.provider.login();

        alert(`Address: ${address}`);
    }

    async signTransactions() {
        await this.provider.init();

        const firstTransaction = new Transaction({
            nonce: 42,
            value: "1",
            receiver: new Address("erd1uv40ahysflse896x4ktnh6ecx43u7cmy9wnxnvcyp7deg299a4sq6vaywa"),
            gasPrice: 1000000000,
            gasLimit: 50000,
            data: new TransactionPayload(),
            chainID: "T",
            version: 1
        });

        const secondTransaction = new Transaction({
            nonce: 43,
            value: "100000000",
            receiver: new Address("erd1uv40ahysflse896x4ktnh6ecx43u7cmy9wnxnvcyp7deg299a4sq6vaywa"),
            gasPrice: 1000000000,
            gasLimit: 50000,
            data: new TransactionPayload("hello world"),
            chainID: "T",
            version: 1
        });

        await this.provider.signTransactions([firstTransaction, secondTransaction]);
        console.log("First transaction, upon signing:");
        console.log(firstTransaction);
        console.log("Second transaction, upon signing:");
        console.log(secondTransaction);

        alert(JSON.stringify([firstTransaction.toSendable(), secondTransaction.toSendable()], null, 4));
    }

    async signMessage() {
        await this.provider.init();

        const message = new SignableMessage({
            message: Buffer.from("hello")
        });

        await this.provider.signMessage(message);
        alert(JSON.stringify(message.toJSON(), null, 4));
    }
}