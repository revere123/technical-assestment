require('dotenv').config()
let amqp = require('amqplib')
let connection = null
let channel = null
const EventEmitter = require('events')
const EM = new EventEmitter()
// let EM = new EventEmitter();
if(!process.env.RABBITMQ_APL)
{
   throw new Error('Url not given')
}

// let queueName1 = process.env.PROJECT + '_Func'

async function startConnection() {
    try {
         connection = await amqp.connect(process.env.RABBITMQ_APL)
         channel = await connection.createChannel()
          await channel.assertExchange(exchangeName,'direct', {
              durable: false
          })
        q = await channel.assertQueue("", { exclusive: true });
        channel.bindQueue(q.queue, exchangeName, routingKey);
        await channel.assertQueue(timecardQueue , {durable : true})
        await channel.assertQueue(emailqueue , {durable : true})
        await channel.assertQueue(equipmentQueue , {durable : true})
        await channel.assertQueue(pormoImage , {durable : true})
        return channel
    } catch (e) {
        console.log(e)
    }
}

(async()=>{
    try{
     
        await startConnection();
        console.log('RABBITMQ CONNECTIONED')
        EM.emit('connected');
        // test sendMessage({message: 'Hello'})
    }catch (e) {
        console.log('RABBITMQ CONNECTIONS ERROR')
        console.error(e)

    }
})()

function getChannel(){
  return {channel, q,timecardQueue}
}
function getChannel2(){
  return {channel, emailqueue}
}

function getChannel3(){
  return {channel, pormoImage}
}

function getEquipmentChannel(){
  return {channel, equipmentQueue}
}



module.exports = {
    getChannel,
    connection,
    EM,
    getChannel2,
    getEquipmentChannel,
    getChannel3
}