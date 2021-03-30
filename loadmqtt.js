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
  client.subscribe("mebaris_M234jkjDS4Jk23j");
  client.subscribe("mebaris_M234jkjDS4Jk23j/nurusallam");
  message = new Paho.MQTT.Message();
  message.destinationName = "mebaris_M234jkjDS4Jk23j/nurusallam";
  //message.qos = 1;
  //client.send(message);
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
function onMessageArrived(msg) {
    if(message.destinationName = "mebaris_M234jkjDS4Jk23j/nurusallam") {
    tempe();
    hum();
    }
    else if(message.destinationName = "mebaris_M234jkjDS4Jk23j") {
    console.log(message.destinationName+" "+msg.payloadString);
    }
}
  
var tempe = function myTemp() {
              var mpls = msg.payloadString;
              var myData = JSON.parse(mpls);
              var dataTemp = document.getElementById("suhu");
              dataTemp.innerHTML = (myData.suhu+"°");
              console.log(message.destinationName+" "+myData.suhu+"°");
              }

var hum = function myHumid() {
             var mpls = msg.payloadString;
             var myData = JSON.parse(mpls);
             var dataHum = document.getElementById("lembap");
             dataHum.innerHTML = (myData.lembap+"%");
             console.log(message.destinationName+" "+myData.lembap+"%");
             }
