const amqp = require("amqplib/callback_api.js");

class Send {
  constructor(queueName = "mediumQueue") {
    this.rabbit = amqp;
    this.queueName = queueName;
  }

  execute(payload) {
    this.rabbit.connect(`amqps://mraajhud:okUIhk3hbWdYHPlraNreSKRjcW8WCczb@puffin.rmq2.cloudamqp.com/mraajhud`, (error, connection) => {
      if (error) {
        console.log(error)
        throw error;
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        var data = JSON.stringify(payload);
        channel.assertQueue(this.queueName, {
          durable: false,
        });

        channel.sendToQueue(this.queueName, Buffer.from(data));
      });
    });
  }
}

module.exports = Send;
