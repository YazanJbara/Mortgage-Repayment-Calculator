document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const mortgageAmount = document.getElementById('mortgage_amount');
  const mortgageTerm = document.getElementById('mortgage_term');
  const interestRate = document.getElementById('interest_rate');
  const mortgageType = document.getElementsByName('mortgage_type');
  const radioGroup = document.querySelector('.radio_group');


  document.querySelectorAll('.radio input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', function () {
      document.querySelectorAll('.radio').forEach((radioParent) => {
        radioParent.classList.remove('checked');
      });
      if (this.checked) {
        this.closest('.radio').classList.add('checked');
      }
    });
  });


  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;

    
    document.querySelectorAll('.error_message').forEach((el) => el.remove());
    document
      .querySelectorAll('.input_error')
      .forEach((el) => el.classList.remove('input_error'));
    document
      .querySelectorAll('.symbol_error')
      .forEach((el) => el.classList.remove('symbol_error'));

    
    if (!mortgageAmount.value) {
      showError(
        mortgageAmount.closest('.inputs'),
        'Mortgage amount is required'
      );
      mortgageAmount.classList.add('input_error');
      mortgageAmount.closest('.input_container').querySelector('.symbol').classList.add('symbol_error');
      valid = false;
    }

    
    if (!mortgageTerm.value) {
      showError(mortgageTerm.closest('.inputs'), 'Mortgage term is required');
      mortgageTerm.classList.add('input_error');
      mortgageTerm.closest('.input_container').querySelector('.symbol').classList.add('symbol_error');
      valid = false;
    }

    
    if (!interestRate.value) {
      showError(interestRate.closest('.inputs'), 'Interest rate is required');
      interestRate.classList.add('input_error');
      interestRate.closest('.input_container').querySelector('.symbol').classList.add('symbol_error');
      valid = false;
    }

    
    if (![...mortgageType].some((radio) => radio.checked)) {
      showError(radioGroup, 'Mortgage type is required');
      valid = false;
    }

    if (valid) {
      
      console.log('Form is valid');
    }
  });

  
  function showError(element, message) {
    const error = document.createElement('p');
    error.className = 'error_message';
    error.textContent = message;
    element.appendChild(error);
  }
});
