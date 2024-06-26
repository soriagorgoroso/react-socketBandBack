const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      // Escuchar evento: mensaje-to-server
      console.log("Conectado");

      socket.emit("current-bands", this.bandList.getBands());
      socket.on("band-vote", (id) => {
        this.bandList.increaseVotes(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("remove-band", (id) => {
        this.bandList.removeBands(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("change-band-name", (id, name) => {
        this.bandList.changeBandName(id, name);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("add-band", ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit("current-bands", this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
