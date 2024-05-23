const { v4: uuidv4 } = require("uuid");
const Band = require("./band");

class BandList {
  constructor(name) {
    this.bands = [
      new Band("Metallica"),
      new Band("Ghost"),
      new Band("Linkin Park"),
      new Band("Rammstein"),
    ];
  }

  addBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }
  removeBands(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
  }
  getBands() {
    return this.bands;
  }
  increaseVotes(id) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes += 1;
      }
      return band;
    });
  }
  changeBandName(id, newName) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.name = newName;
      }
      return band;
    });
  }
}

module.exports = BandList;
