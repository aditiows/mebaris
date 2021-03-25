// Create a client instance
client = new Paho.MQTT.Client("test.mosquitto.org", Number(8081), "mebarishumid");
client.startTrace();
// set callback handlers
client.onConnectionLost = onConnectionLost2;
client.onMessageArrived = onMessageArrived2;

// connect the client
client.connect({onSuccess:onConnect,
                useSSL: true});
console.log("mencoba untuk terkoneksi...");


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Koneksi Kelembapan Berhasil");
  client.subscribe("mebaris01/nurusallam/lembap");
  message2 = new Paho.MQTT.Message("Kering");
  message2.destinationName = "mebaris01/nurusallam/lembap";
  client.send(message2);
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

// display the value of "lembap"
function onMessageArrived(message2) {
  document.getElementById('lembap').innerHTML = (message2.payloadString+"%");
  }
