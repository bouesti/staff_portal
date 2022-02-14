<template>
    <q-page>
        <div class="sticky_header bg-white shadow-4 row q-col-gutter-lg">
            <div class="col-12 col-md-8">
                <div class="flex q-col-gutter-sm items-center">
                    <div class="text-h5 text-grey q-pb-sm q-pl-md"> Filter: </div>
                    <div class="q-pb-sm">
                        <q-btn no-caps :outline="!allStaff" rounded color="primary" label="All" class="q-px-lg" @click="allStaff = !allStaff" />
                    </div>
                    <div class="q-pb-sm">
                        <q-btn-dropdown no-caps outline rounded color="primary" label="College">
                            <q-list>
                                <q-item clickable v-close-popup v-for="college in collegeOptions" :key="college" @click="selectCollege(college)">
                                    <q-item-section>
                                        <q-item-label>{{ college }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </div>
                    <div class="q-pb-sm">
                        <q-btn-dropdown no-caps outline rounded color="primary" label="School">
                            <q-list>
                                <q-item clickable v-close-popup v-for="school in schoolOptions" :key="school" @click="selectSchool(school)">
                                    <q-item-section>
                                        <q-item-label>{{ school }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </div>
                    <div class="q-pb-sm" :style="$q.screen.lt.sm ? 'margin: 0 auto;' : '' ">
                        <q-btn-dropdown no-caps outline rounded color="primary" label="Department">
                            <q-list>
                                <!-- <q-item clickable v-close-popup @click="onItemClick"> -->
                                <q-item clickable v-close-popup v-for="department in departmentOptions" :key="department" @click="selectDepartment(department)">
                                    <q-item-section>
                                        <q-item-label>{{ department }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4 q-px-md q-pt-sm">
                <q-input :dense="$q.screen.lt.md" class="q-mb-sm" rounded outlined color="primary" type="text" v-model="search_input" label="Search staff..." :class="$q.screen.lt.md ? 'q-ml-lg' : '' ">
                    <template #prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>
        </div>
        <!-- You'd add a message to denote when 
            1: No staff are available.
            2: The filter parameters returns no staff.
         -->
        <div class="row q-col-gutter-lg q-px-lg q-mt-lg">
            <div v-if="!filteredStaff.length" class="col-12 text-center text-bold text-grey text-h4"> Sorry, No Record Found. </div>
            <div v-else class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="staff in filteredStaff" :key="staff.id">
                <q-card >
                    <img v-if="staff.displayImage ? staff.displayImage.length : false" :src="staff.displayImage" height="300">
                    <img v-else src="~assets/logo.png" alt="Bouesti Logo" height="300" />

                    <q-card-section>
                        <q-list separator>
                            <q-item>
                                <q-item-section>
                                    <q-item-label lines="1" class="text-h6 text-bold text-primary"> {{ staff.title }}. {{ staff.surname + ' ' + staff.otherNames }} </q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <q-item-label lines="1" class="text-subtitle2 text-grey-8"> {{ staff.email }} </q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <q-item-label overline> Designation | Department </q-item-label>
                                    <q-item-label lines="1" class="text-subtitle2 text-grey-8"> <b> {{ staff.designation }} </b> | {{ staff.department }} </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                    <q-separator />
                    <q-card-actions align="center">
                        <q-btn no-caps outline rounded color="primary" class="q-pl-lg" label="View More" icon-right="mdi-chevron-right" style="padding: 0px 20px;" @click="viewSingleStaff(staff.id)" />
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
import db from 'src/boot/firebase.js'
import { collection, query, onSnapshot } from "firebase/firestore";
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'View_Staff_page',
    computed: {
        ...mapGetters('staff', ['getUser', 'getBouestiStructure', 'getStaff']),
        collegeOptions () {
            const _ = this
            var keys =  Object.keys(_.getBouestiStructure)
            return keys
        },
        filteredStaff () {
            const _ = this
            let staffArr = []
            if (_.allStaff) {
                staffArr = []
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                _.selectedCollege = _.selectedSchool =_.selectedDepartment = ''
                staffArr = _.getStaff
            }
            if (_.selectedCollege.length) {
                staffArr = _.getStaff.filter((staff) => staff.college == _.selectedCollege)
            }
            if (_.selectedSchool.length) {
                staffArr = _.getStaff.filter((staff) => staff.college == _.selectedCollege && staff.school == _.selectedSchool)
            }
            if (_.selectedDepartment.length) {
                staffArr = _.getStaff.filter((staff) => staff.college == _.selectedCollege && staff.school == _.selectedSchool && staff.department == _.selectedDepartment)
            }
            return staffArr.filter((staff) => staff.surname.toLowerCase().match(_.search_input.trim().toLowerCase()) ||  staff.otherNames.toLowerCase().match(_.search_input.trim().toLowerCase()))
        }
    },
    data () {
        return {
            search_input: '',
            departmentOptions: [],
            schoolOptions: [],
            allStaff: true,
            selectedSchool: '',
            selectedCollege: '',
            selectedDepartment: '',
        }
    },
    mounted () {
      const _ = this
      _.listen_to_staff()
      _.load_bouesti_structures()
    },
    methods: {
        ...mapActions('staff', ['LOAD_BOUESTI_STRUCTURES', 'STAFF_ACTION']),
        viewSingleStaff (id) {
            const _ = this
            /* 
                Essentially, i'd need to filter the array, and get the name
                of the staff, as that's what i'll use to pass as the params
            */
           _.$router.push({
               name: 'Single_Staff',
               params: {id: id}
           })
        },
        selectCollege (val) {
            const _ = this
            _.allStaff = false
            _.selectedCollege = val
        },
        selectSchool (val) {
            const _ = this
            _.selectedSchool = val
        },
        selectDepartment (val) {
            const _ = this
            _.selectedDepartment = val
        },
        ...mapActions('staff', ['LOAD_BOUESTI_STRUCTURES', 'STAFF_ACTION']),
      listen_to_staff () {
        const _ = this
        const q = query(collection(db, "allStaff"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            // console.log(change.doc.data())
            if (change.type === "added") {
              // Add an ACTION to add staff to the state
                _.STAFF_ACTION({action: change.type, data: change.doc.data()})
            }
            if (change.type === "modified") {
              // Add an ACTION to update staff to the state
              _.STAFF_ACTION({action: change.type, data: change.doc.data()})
            }
            if (change.type === "removed") {
              // Add an ACTION to remove staff to the state
            //   Have a code to push removed staff to a new table
              _.STAFF_ACTION({action: change.type, data: change.doc.data()})
            }
          });
        });
      },
      load_bouesti_structures () {
        const _ = this
        const q = query(collection(db, "bouesti_structure"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const obj = {}
          querySnapshot.forEach((doc) => {
            Object.assign(obj, doc.data())
          });
          _.LOAD_BOUESTI_STRUCTURES(obj)
        });
      }
    },
    watch: {
        selectedCollege (val) {
            const _ = this
            _.selectedSchool = ''
            _.schoolOptions = []
            _.selectedDepartment = ''
            _.departmentOptions = []
            if (val) {
                var keys = Object.keys(_.getBouestiStructure[val])
                _.schoolOptions = keys
            }
        },
        selectedSchool (val) {
            const _ = this
            _.department = ''
            _.departmentOptions = []
            if (val) {
                var values = Object.values(_.getBouestiStructure[_.selectedCollege][val])
                _.departmentOptions = values
            }
        },
    }
}
</script>