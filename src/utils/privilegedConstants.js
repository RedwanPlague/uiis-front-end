import store from 'src/store'
import {DUE_TYPES, FINE_TYPES, PRIVILEGES} from 'src/utils/constants'
import {deepCopy} from 'src/utils/utilities'

const has = store.getters.userHasPrivilege

let feeOptions = deepCopy(DUE_TYPES)
if (!has(PRIVILEGES.LEVEL_CHANGING_FEE_MANAGEMENT)) {
  delete feeOptions.LEVEL_CHANGING_FEE
}
if (!has(PRIVILEGES.EXAM_FEE_MANAGEMENT)) {
  delete feeOptions.EXAM_FEE
}
if (!has(PRIVILEGES.DINING_FEE_MANAGEMENT)) {
  delete feeOptions.DINING_FEE
}
feeOptions = Object.values(feeOptions)

let fineOptions = deepCopy(FINE_TYPES)
if (!has(PRIVILEGES.LIBRARY_FINE_MANAGEMENT)) {
  delete fineOptions.LIBRARY_FINE
}
if (!has(PRIVILEGES.LAB_FINE_MANAGEMENT)) {
  delete fineOptions.LAB_FINE
}
if (!has(PRIVILEGES.DISCIPLINARY_FINE_MANAGEMENT)) {
  delete fineOptions.DISCIPLINARY_FINE
}
fineOptions = Object.values(fineOptions)

export {
  feeOptions,
  fineOptions
}
