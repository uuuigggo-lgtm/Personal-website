document.addEventListener('DOMContentLoaded', function() {
    // التنقل السلس للروابط الداخلية
    const allLinks = document.querySelectorAll('a[href^="#"]');
   
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
           
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. تأثيرات عند التمرير (Scroll Animation)
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.container, li, .form-group');
       
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
           
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // تهيئة العناصر للتحريك
    const animatedElements = document.querySelectorAll('.container, li, .form-group');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // تشغيل مرة أولى

    // 3. التحقق من النماذج
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // التحقق من صحة البريد الإلكتروني
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && !isValidEmail(emailInput.value)) {
                e.preventDefault();
                showError(emailInput, 'يرجى إدخال بريد إلكتروني صحيح');
                return;
            }

            // التحقق من كلمة المرور
            const passwordInput = this.querySelector('input[type="password"]');
            if (passwordInput && passwordInput.value.length < 6) {
                e.preventDefault();
                showError(passwordInput, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
                return;
            }

            // إذا كل شيء صحيح، إظهار رسالة نجاح
            showSuccess('تم الإرسال بنجاح!');
        });
    });

    // 4. تغيير لون الشريط عند التمرير
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
   
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, #1a365d 0%, #2c5364 100%)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #2c5364 0%, #1a365d 100%)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        }

        lastScrollY = window.scrollY;
    });

    // 5. عدّاد زوار بسيط
    updateVisitorCount();

    // 6. تأثيرات عند تحميل الصفحة
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// ==================== وظائف مساعدة ====================

// التحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// إظهار خطأ
function showError(input, message) {
    // إزالة أي رسائل خطأ سابقة
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // إضافة رسالة الخطأ
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.9em';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
   
    input.parentNode.appendChild(errorDiv);
   
    // تأثير اهتزاز
    input.style.borderColor = '#ff6b6b';
    input.classList.add('shake');
    setTimeout(() => {
        input.classList.remove('shake');
    }, 500);
}

// إظهار نجاح
function showSuccess(message) {
    // إنشاء عنصر الرسالة
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.5s ease;
    `;

    document.body.appendChild(successDiv);

    // إزالة الرسالة بعد 3 ثواني
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// تحديث عداد الزوار
function updateVisitorCount() {
    let count = localStorage.getItem('visitorCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
   
    // يمكنك عرض العدد في مكان ما بالصفحة إذا أردت
    console.log(`عدد الزوار: ${count}`);
}

// ==================== تأثيرات CSS إضافية ====================

// إضافة تأثيرات CSS عبر JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
   
    @keyframes slideIn {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
   
    .shake {
        animation: shake 0.5s ease;
    }
   
    body.loaded * {
        transition: all 0.3s ease;
    }
   
    .success-message {
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// ==================== تفاعلات إضافية ====================

// تغيير لون الخلفية عند التركيز على الحقول
document.addEventListener('focus', function(e) {
    if (e.target.matches('input, textarea, select')) {
        e.target.parentNode.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
    }
}, true);

document.addEventListener('blur', function(e) {
    if (e.target.matches('input, textarea, select')) {
        e.target.parentNode.style.backgroundColor = '';
    }
}, true);

// تأثيرات عند التمرير فوق العناصر
document.addEventListener('mouseover', function(e) {
    if (e.target.matches('a, button, input[type="submit"]')) {
        e.target.style.transform = 'scale(1.05)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.matches('a, button, input[type="submit"]')) {
        e.target.style.transform = 'scale(1)';
    }
});

// حفظ البيانات في localStorage
function saveFormData(form) {
    const formData = new FormData(form);
    const data = {};
   
    for (let [key, value] of formData.entries()) {
        if (value.trim() !== '') {
            data[key] = value;
        }
    }
   
    localStorage.setItem('formData', JSON.stringify(data));
}

// تحميل البيانات المحفوظة
function loadFormData(form) {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = data[key];
            }
        });
    }
}

// ==================== تهيئة الصفحة ====================

// عند تحميل الصفحة، تحميل البيانات المحفوظة
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        loadFormData(form);
       
        // حفظ البيانات عند الكتابة
        form.addEventListener('input', function() {
            saveFormData(this);
        });
    });
});

// تأثيرات تحميل الصفحة
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
    console.log('تم تحميل الصفحة بالكامل');
});