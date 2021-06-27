// import {axios} from 'boot/axios'
//
// const createSession = () => {
//   axios.post('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', {
//     store_id: 'buet60d7026a407ce',
//     store_passwd: 'buet60d7026a407ce@ssl',
//     total_amount: '100',
//     currency: 'EUR',
//     tran_id: 'REF123',
//     success_url: 'http://yoursite.com/success.php',
//     fail_url: 'http://yoursite.com/fail.php',
//     cancel_url: 'http://yoursite.com/cancel.php',
//     cus_name: 'Customer Name',
//     cus_email: 'cust@yahoo.com',
//     cus_add1: 'Dhaka',
//     cus_add2: 'Dhaka',
//     cus_city: 'Dhaka',
//     cus_state: 'Dhaka',
//     cus_postcode: '1000',
//     cus_country: 'Bangladesh',
//     cus_phone: '01711111111',
//     cus_fax: '01711111111',
//     ship_name: 'Customer Name',
//     ship_add1 : 'Dhaka',
//     ship_add2: 'Dhaka',
//     ship_city: 'Dhaka',
//     ship_state: 'Dhaka',
//     ship_postcode: '1000',
//     ship_country: 'Bangladesh',
//     multi_card_name: 'mastercard,visacard,amexcard',
//     value_a: 'ref001_A',
//     value_b: 'ref002_B',
//     value_c: 'ref003_C',
//     value_d: 'ref004_D',
//     // shipping_method: 'haha',
//     // product_name: 'haha',
//     // product_category: 'haha',
//     // product_profile: 'haha',
//   })
//     .then(response => {
//       console.log(response)
//     })
//     .catch(error => {
//       console.log(error.response)
//     })
// }
//
// export {createSession}

import {SSLCommerzPayment} from 'sslcommerz'

const payment = new SSLCommerzPayment(
  'buet60d7026a407ce',
  'buet60d7026a407ce@ssl'
)
console.log(payment)

const createSession = () => {
  payment.init({
    total_amount: '100',
    currency: 'EUR',
    tran_id: 'REF123',
    success_url: 'http://yoursite.com/success.php',
    fail_url: 'http://yoursite.com/fail.php',
    cancel_url: 'http://yoursite.com/cancel.php',
    cus_name: 'Customer Name',
    cus_email: 'cust@yahoo.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1 : 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: '1000',
    ship_country: 'Bangladesh',
    multi_card_name: 'mastercard,visacard,amexcard',
    value_a: 'ref001_A',
    value_b: 'ref002_B',
    value_c: 'ref003_C',
    value_d: 'ref004_D',
    // shipping_method: 'haha',
    // product_name: 'haha',
    // product_category: 'haha',
    // product_profile: 'haha',
  })
}

export {createSession}
