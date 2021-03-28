// Create a client instance
client = new Paho.MQTT.Client("test.mosquitto.org", Number(8081), "ClientID"+Math.random().toString(36).substr(2, 9));
client.startTrace();
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.reconnect = true;
client.connect({onSuccess:onConnect,
                useSSL: true});
console.log("mencoba untuk terkoneksi...");

// called when the client connects
function onConnect() {
  // Jika koneksi berhasil, langsung respon
  console.log("Koneksi Berhasil");
  client.subscribe("mebaris01/nurusallam",qos: 1);
  message = new Paho.MQTT.Message("Nurusallam is Online");
  message.destinationName = "mebaris_M234jkjDS4Jk23j/";
  message.retained = true;
  client.send(message);
  console.log(""+message.payloadString);
  console.log(client.getTraceLog());

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

// bila koneksi terputus
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Koneksi Terputus: "+responseObject.errorMessage);
  }
}

// bila ada pesan masuk
function onMessageArrived(message) {
    if (message.destinationName = "mebaris_M234jkjDS4Jk23j/nurusallam") {
    myTemp();
    myHumid();  
      }
    }

function myTemp() {
    var data = JSON.parse(message.payloadString);
    document.getElementById("suhu").innerHTML = (data.suhu+"°");
    consol.log(data.suhu+"°");
    }

function myHumid() {
    var data = JSON.parse(message.payloadString);
    document.getElementById("lembap").innerHTML = (data.lembap+"%");
    console.log(data.lembap+"%");
    }
