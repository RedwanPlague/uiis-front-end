<template>
  <q-page padding>
    <div class="q-pa-sm absolute-center">
      <h3>
        Examiner
      </h3>
      <p>
        Internals and Externals will upload and update exxam marks here.
      </p>

      <div class="q-pa-md">
        <q-table
          :data="marks"
          row-key="Student_ID"
          separator="vertical"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="Student_ID" :props="props">
                {{ props.row.Student_ID }}
              </q-td>
              <q-td key="marks" :props="props">
                <!-- {{ props.row.marks }} -->
                <q-input type="number" v-model="props.row.marks" dense autofocus />
                <!-- <q-popup-edit v-model="props.row.marks" title="Upload marks">
                  <q-input type="number" v-model="props.row.marks" dense autofocus />
                </q-popup-edit> -->
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>

let marks = [
  {
    "Student_ID": "1605002",
    "marks": 69,
  },
  {
    "Student_ID": "1605003",
    "marks": 70,
  },
  {
    "Student_ID": "1605004",
    "marks": 99,
  },
  {
    "Student_ID": "1605083",
    "marks": 89,
  },
];

export default {
  name: "ExaminePage",
  data() {
    return {
      marks,
    };
  }
};
</script>

<style scoped></style>
