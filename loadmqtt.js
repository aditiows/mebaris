// Create a client instance
client = new Paho.MQTT.Client("test.mosquitto.org", Number(8081), "mebariswoi");
client.startTrace();
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
message = new Paho.MQTT.Message("");

// connect the client
client.reconnect = true;
client.connect({onSuccess:onConnect,
                useSSL: true});
console.log("mencoba untuk terkoneksi...");

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Koneksi Berhasil");
  //client.subscribe("mebaris01/nurusallam/suhu");
  //message = new Paho.MQTT.Message("33");
  //message.destinationName = "mebaris01/nurusallam/suhu";
  //console.log("Temperature monitored");
  //client.send(message);
  //client.subscribe("mebaris01/nurusallam/lembap");
  //message = new Paho.MQTT.Message("jos");
  //message.destinationName = "mebaris01/nurusallam";
  //console.log("Humidity monitored");
  client.subscribe("mebaris01/nurusallam/");
  console.log("Nurusallam Online");
  //client.send(message);
  //console.log("Pesan berhasil terkirim");
  //console.log(client.getTraceLog());

  //client.getTraceLog().forEach(function(line){
  //console.log('Trace: ' + line)
  //});
  //newMessage = new Paho.MQTT.Message("Sent using synonyms!");
  //newMessage.topic = "mebaris01/nurusallam/";
  //client.publish(message)
  //client.publish("mebaris01/nurusallam/suhu", "Hello from a better publish call!", 1, false)

  //topicMessage = new Paho.MQTT.Message("This is a message where the topic is set by setTopic");
 // topicMessage.topic = "mebaris01/nurusallam/suhu";
  //client.publish(topicMessage)
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  if (message.destinationName = "mebaris01/nurusallam") {
  console.log(message.destinationName+" "+message.payloadString);
  }
}
