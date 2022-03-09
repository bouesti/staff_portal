
export function LOAD_BOUESTI_STRUCTURES (state, payload) {
    state.bouesti_structure = payload
}
export function LOAD_BOUESTI_STAFF_TITLE (state, payload) {
    var staff_title = payload['title']
   var staff_designation = payload['designation']
   var academic_status = payload['academic_status']
    state.bouesti_staff_title = staff_title.sort()
    state.bouesti_staff_designation = staff_designation.sort()
    state.bouesti_academic_status = academic_status.sort()
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

export function ADD_PUB_LINK (state, payload) {
    let stateUser = state.user
    stateUser.pubLink = payload
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
        } else {
            /* 
                For the fact that the user exists, and the snapshot returns
                the entire user's profile, just wipe and update the 
                element in the array matching the index
            */
            allStaff[index] = data
        }
    }
    if (action === 'modified') {
        allStaff[index] = data
    }
    if (action === 'removed') {
        // This would remove the user from the state
        allStaff.splice(index,1)
    }
    state.allStaff = allStaff
}

