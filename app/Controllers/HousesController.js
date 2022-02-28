import { ProxyState } from "../AppState.js"
import { getHouseForm } from "../Components/HouseForm.js"
import { houseService } from "../Services/HouseService.js"
import { Pop } from "../Utils/Pop.js"



function _draw() {
    let template = ''
    ProxyState.houses.forEach(h => template += h.Template)
    document.getElementById('listings').innerHTML = template
}

export class HousesController {
    constructor() {
        ProxyState.on('houses', _draw)
        houseService.getAllHouses()

    }
    async viewHouse() {
        try {
            await houseService.getAllHouses()
            document.getElementById('modal-body-slot').innerHTML = getHouseForm()
            document.getElementById('create-button').classList.remove('visually-hidden')
        } catch (error) {
            Pop.toast(error.message, 'error')
        }
    }
    async handleSubmit(id) {
        try {
            window.event.preventDefault()
            let form = window.event.target
            let rawData = {
                bedrooms: form.bedrooms.value,
                bathrooms: form.bathrooms.value,
                levels: form.levels.value,
                price: form.price.value,
                imgUrl: form.imgUrl.value,
                description: form.description.value,
                year: form.year.value,
                id: form.id.value,
            }
            if (!id) {
                houseService.createHouse(rawData)
            } else {
                houseService.editHouse(rawData, id)
            }
            let modal = document.getElementById('new-listing')
            form.reset()
            bootstrap.Modal.getOrCreateInstance(modal).hide() //NOTE closes bootstrap modal
            Pop.toast('Complete')
        }
        catch (error) {
            Pop.toast(error.message, 'error')
        }
    }

    async deleteHouse(id) {
        try {
            if (await Pop.confirm()) {


                await houseService.deleteHouse(id)
            }
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    editHouse(id) {
        const house = ProxyState.houses.find(h => h.id == id)
        document.getElementById('modal-body-slot').innerHTML = getHouseForm(house)
        let modal = document.getElementById('new-listing')
        bootstrap.Modal.getOrCreateInstance(modal).toggle()

    }


}
