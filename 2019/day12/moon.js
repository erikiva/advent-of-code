class Moon {
  constructor(position, velocity, name) {
    this.name = name;
    this.position = position;
    this.velocity = velocity;
  }
  updateVelocity(moon) {
    Object.keys(this.position).forEach(coord => {
      if (this.position[coord] < moon.position[coord]) {
        this.velocity[coord] += 1;
      } else if (this.position[coord] > moon.position[coord]) {
        this.velocity[coord] -= 1;
      }
    });
  }
  updatePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;
  }
  getPotentialEnergy(){
    return Math.abs(this.position.x) + Math.abs(this.position.y) + Math.abs(this.position.z);
  }
  getKineticEnergy(){
    return Math.abs(this.velocity.x) + Math.abs(this.velocity.y) + Math.abs(this.velocity.z);
  }
  getState(){
    let state = '';
    Object.keys(this.position).forEach(coord => {
      state += `${this.position[coord]}${this.velocity[coord]}`
    });
    return state;
  }
  getVelocityState(){
    let state = '';
    Object.keys(this.velocity).forEach(coord => {
      state += `${this.velocity[coord]}`
    });
    return state;
  }
}

module.exports = {
  Moon
}