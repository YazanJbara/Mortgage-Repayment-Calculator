document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const mortgageAmount = document.getElementById('mortgage_amount');
  const mortgageTerm = document.getElementById('mortgage_term');
  const interestRate = document.getElementById('interest_rate');
  const mortgageType = document.getElementsByName('mortgage_type');
  const radioGroup = document.querySelector('.radio_group');
  const resultsSection = document.querySelector('.results');
  const completedSection = document.querySelector('.completed');
  const resultValue = document.querySelector('.result_value');
  const resultTotal = document.querySelector('.result_total');
  const clearAll = document.getElementById('clear_all');

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

  // Allow only numbers in the inputs
  [mortgageAmount, mortgageTerm, interestRate].forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9.,]/g, '');
    });
  });

  function removeCommas(value) {
    return value.replace(/,/g, '');
  }

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
      const principal = parseFloat(removeCommas(mortgageAmount.value));
      const years = parseFloat(removeCommas(mortgageTerm.value));
      const rate = parseFloat(removeCommas(interestRate.value)) / 100 / 12;
      const n = years * 12;

      let monthlyRepayment, totalRepayment;

      if (document.getElementById('repayment').checked) {
        // Repayment mortgage calculation
        monthlyRepayment = (principal * rate) / (1 - Math.pow(1 + rate, -n));
        totalRepayment = monthlyRepayment * n;
      } else {
        // Interest Only mortgage calculation
        monthlyRepayment = principal * rate;
        totalRepayment = (monthlyRepayment * n) + principal;
      }

      resultValue.textContent = `£${monthlyRepayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      resultTotal.textContent = `£${totalRepayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

      resultsSection.classList.add('hidden');
      completedSection.classList.remove('hidden');
    }
  });

  clearAll.addEventListener('click', (event) => {
    event.preventDefault();
    form.reset();
    document.querySelectorAll('.radio').forEach((radioParent) => {
      radioParent.classList.remove('checked');
    });
    document.querySelectorAll('.error_message').forEach((el) => el.remove());
    document.querySelectorAll('.input_error').forEach((el) => el.classList.remove('input_error'));
    document.querySelectorAll('.symbol_error').forEach((el) => el.classList.remove('symbol_error'));
    resultsSection.classList.remove('hidden');
    completedSection.classList.add('hidden');
  });

  
  function showError(element, message) {
    const error = document.createElement('p');
    error.className = 'error_message';
    error.textContent = message;
    element.appendChild(error);
  }
});
