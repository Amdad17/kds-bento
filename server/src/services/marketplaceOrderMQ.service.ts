import amqp, { Channel, Connection } from "amqplib";
import { io } from "..";



const queue = "marketplaceToKDS"
let connection: Connection;
let channel: Channel;

// Connect and Create rabbit mq channel and connection
export async function connectAndconsumeMQDataForMarketplaceOrders() {

  try {
    const ampqServer = "amqps://ujuxbuct:HxHHm8XNtbtohKTPHi30fSdILcP9FhGQ@armadillo.rmq.cloudamqp.com/ujuxbuct"
    connection = await amqp.connect(ampqServer)
    channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false })

    await channel.consume(queue, (data: any) => {
      if (data) {
        // console.log('data has come');
        const order = JSON.parse(data.content.toString())
        console.log('Order From Queue', order);

        // Emit new order with Socket IO.
      io.to(order.restaurantId.toString()).emit('incoming-order', order);


      }
    }, { noAck: true })

  } catch (err) {
    console.log(err);
  } 

}

// Close rabbitmq connection and channel
export async function closeMQConnection() {
  try {
    if (connection) await connection.close()
    if (channel) await channel.close()

  } catch (error) {
    console.log(error);
  }
}

