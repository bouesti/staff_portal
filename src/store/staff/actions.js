
export function LOAD_BOUESTI_STRUCTURES ({commit}, payload) {
    commit('LOAD_BOUESTI_STRUCTURES', payload)
}
export function LOAD_BOUESTI_STAFF_TITLE ({commit}, payload) {
    commit('LOAD_BOUESTI_STAFF_TITLE', payload)
}
export function STAFF_ACTION ({commit}, payload) {
    commit('STAFF_ACTION', payload)
}

export function LOAD_CURRENT_USER ({commit}, payload) {
    commit('LOAD_CURRENT_USER', payload)
}

export function ADD_CV_LINK ({commit}, payload) {
    commit('ADD_CV_LINK', payload)
}
export function ADD_PUB_LINK ({commit}, payload) {
    commit('ADD_PUB_LINK', payload)
}

export function ADD_CV_PUBLICATION ({commit}, payload) {
    commit('ADD_CV_PUBLICATION', payload)
}
export function DELETE_PUBLICATION ({commit}, payload) {
    commit('DELETE_PUBLICATION', payload)
}

export function UPDATE_STAFF ({commit}, payload) {
    commit('UPDATE_STAFF', payload)
}
export function UPDATE_STAFF_DISPLAY_IMAGE ({commit}, payload) {
    commit('UPDATE_STAFF_DISPLAY_IMAGE', payload)
}
