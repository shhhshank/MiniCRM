const amqp = require("amqplib/callback_api.js");

class Send {
  constructor(queueName = "mediumQueue") {
    this.rabbit = amqp;
    this.queueName = queueName;
  }

  execute(payload) {
    this.rabbit.connect(`amqp://localhost`, (error, connection) => {
      if (error) {
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
