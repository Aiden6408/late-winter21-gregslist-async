
export class House {
  constructor(data) {
    this.bedrooms = data.bedrooms || ''
    this.bathrooms = data.bathrooms || ''
    this.levels = data.levels || ''
    this.price = data.price || ''
    this.imgUrl = data.imgUrl || ''
    this.description = data.description || ''
    this.year = data.year || ''
    this.id = data.id || ''
  }

  get Template() {
    return `
        <div class="col-md-4">
          <div class="bg-white rounded shadow">
            <img class="object-fit-img rounded-top" src="${this.imgUrl}" alt=" image">
            <div class="p-3 clip-text">
              <p>${this.levels} | ${this.bedrooms} | ${this.bathrooms}</p>
              <p></p>
              <p>${this.description}</p>
              <p>$${this.price}</p>
              <div class="d-flex align-items-center">
                <p class="m-0">Year: ${this.year} </p>
        
              </div>
              <div class="text-end">
              <button class="btn btn-outline-warning" onclick="app.housesController.editHouse('${this.id}')"> Edit </button>
              <button class="btn btn-outline-danger" onclick="app.housesController.deleteHouse('${this.id}')"> delete </button>
              </div>
            </div>
          </div>
        </div>
      `
  }
}