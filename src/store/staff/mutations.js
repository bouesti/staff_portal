
export function LOAD_BOUESTI_STRUCTURES (state, payload) {
    state.bouesti_structure = payload
}

export function LOAD_CURRENT_USER (state, payload) {
    let stateUser = state.user
    for (var [key, value] of Object.entries(payload)) {
        stateUser[key] = value
    }
    state.user = stateUser
}

export function ADD_CV_LINK (state, payload) {
    let stateUser = state.user
    stateUser.cvLink = payload
    state.user = stateUser
}

export function ADD_CV_PUBLICATION (state, payload) {
    let stateUser = state.user
    stateUser.publications.push(payload)
    state.user = stateUser
}
export function DELETE_PUBLICATION (state, payload) {
    let stateUser = state.user
    stateUser.publications = stateUser.publications.filter(pub => pub.id !== payload)
    state.user = stateUser
}
export function UPDATE_STAFF (state, payload) {
    let stateUser = state.user
    for (var [key, value] of Object.entries(payload)) {
        stateUser[key] = value
    }
    state.user = stateUser
}
export function UPDATE_STAFF_DISPLAY_IMAGE (state, payload) {
    let stateUser = state.user
    stateUser.displayImage = payload
    state.user = stateUser
}

export function STAFF_ACTION (state, payload) {
    const { action, data } = payload
    let allStaff = state.allStaff
    let index = allStaff.findIndex(staff => staff.id === data.id)
    if (action === 'added'){
        if (index == -1) {
            // This means the user does not exist, so I have to add it to our vuex state
            allStaff.push(data)
        }
    }
    if (action === 'modified') {
        // We will fetch the particular user that was modified, using the index, then update the data
        // allStaff[index] = data
        // First get the obj, then use the hasOwnProperty to check for new keys, and update their values
        // Or simply add the new key-value pairs since it's missin... 
    }
    if (action === 'removed') {}
    state.allStaff = allStaff
}

