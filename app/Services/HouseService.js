
import { ProxyState } from "../AppState.js"
import { House } from "../Models/House.js"
import { api } from "./AxiosService.js"




class HouseService {

    async editHouse(updatedHouse, id) {
        const res = await api.put('houses/' + id, updatedHouse)
        console.log('[HouseService]: editHouse', res.data)

        const HouseIndex = ProxyState.houses.findIndex(h => h.id == id)
        ProxyState.houses.splice(HouseIndex, 1, new House(res.data))
        ProxyState.houses = ProxyState.houses

    }

    async getAllHouses() {
        const res = await api.get('houses')
        console.log('[HouseService]: getAllHouses', res.data)
        ProxyState.houses = res.data.map(rd => new House(rd))
    }

    async createHouse(newHouse) {
        const res = await api.post('houses', newHouse)
        console.log('[HouseService]: House', res.data)

        let newhouse = new House(res.data)
        ProxyState.houses = [newhouse, ...ProxyState.houses]
    }

    async deleteHouse(id) {
        console.log('service deleting house', id)
        //change in server 
        const res = await api.delete('houses/' + id)
        console.log('[HouseService]: deleteHouse', res.data)

        ProxyState.houses = ProxyState.houses.filter(h => h.id != id)
    }


}
export const houseService = new HouseService