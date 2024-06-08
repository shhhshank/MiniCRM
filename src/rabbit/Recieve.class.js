const amqp = require("amqplib/callback_api.js");

class Receive {
  constructor(queueName = "mediumQueue") {
    this.rabbit = amqp;
    this.queueName = queueName;
  }

  execute(consumer) {
    amqp.connect(`amqp://localhost/`, (error, connection) => {
      if (error) {
        throw error;
      }
      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }
        channel.assertQueue(this.queueName, {
          durable: false,
        });
        channel.consume(this.queueName, consumer, {
          noAck: true,
        });
      });
    });
  }
}

module.exports = Receive;
