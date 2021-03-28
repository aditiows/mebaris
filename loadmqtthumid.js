function myhumid() {
if (message.destinationName = "mebaris01/nurusallam")  {
var data = JSON.parse(message.payloadString);
document.getElementById("lembap").innerHTML = (data.lembap+ "%");
    }
  }
