document.addEventListener('DOMContentLoaded', function() {
  // الوضع الليلي
  const modeToggle = document.getElementById('mode-toggle');
  modeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    
    const toggleLabelIcon = document.querySelector('.toggle-mode-label i');
    if(document.body.classList.contains('dark-mode')) {
      toggleLabelIcon.classList.remove('fa-moon');
      toggleLabelIcon.classList.add('fa-sun');
    } else {
      toggleLabelIcon.classList.remove('fa-sun');
      toggleLabelIcon.classList.add('fa-moon');
    }
  });
  // زر التمرير للأعلى
  const scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  });

  window.scrollToTop = function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // التحقق من صحة النموذج - الإصدار المحسن
  const form = document.querySelector('form');
  const requiredInputs = form.querySelectorAll('[required]');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let formIsValid = true;
    requiredInputs.forEach(input => {
      const value = input.value.trim();
      
      // إذا كان الحقل فارغاً
      if (!value) {
        showError(input, 'هذا الحقل مطلوب');
        formIsValid = false;
        return;
      }
      if (input.type === 'email' && !isValidEmail(value)) {
        showError(input, 'البريد الإلكتروني غير صالح');
        formIsValid = false;
        return;
      }
      
      if (input.type === 'number' && !isValidPhone(value)) {
        showError(input, 'رقم الهاتف يجب أن يحتوي على 10-15 رقم');
        formIsValid = false;
        return;
      }
      
      clearError(input);
    });
    
    if (formIsValid) {
      alert('تم إرسال الرسالة بنجاح! شكراً لتواصلك معي.');
      form.reset();
      requiredInputs.forEach(clearError);
    }
  });
  
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function isValidPhone(phone) {
    const re = /^\d{10,15}$/;
    return re.test(phone);
  }
  
  function showError(input, message) {
    const formGroup = input.closest('.input-group') || input.closest('.text-area');
    input.style.borderColor = 'var(--accent-color)';
    
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'error-message';
      formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.color = 'var(--accent-color)';
    errorElement.style.display = 'block';
    errorElement.style.marginTop = '5px';
    errorElement.style.fontSize = '0.8rem';
  }
  
  // دالة لإزالة رسالة الخطأ
  function clearError(input) {
    const formGroup = input.closest('.input-group') || input.closest('.text-area');
    input.style.borderColor = '';
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  requiredInputs.forEach(input => {
    input.addEventListener('input', function() {
      if (this.value.trim()) {
        clearError(this);
      }
    });
  });
});
