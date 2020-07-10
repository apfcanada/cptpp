import accessibleAutocomplete from 'accessible-autocomplete'
 
const HS2values = [
  '27','76','32','34','61','62','42','29','62','43'
]
accessibleAutocomplete({
  element: document.querySelector('#hs2-container'),
  id: 'hs2-select', // To match it to the existing <label>.
  source: HS2values
})
