// النصوص التي سيتم عرضها
const texts = ["FrontEnd Developer", "Web Developer"];
let index = 0; // الإشارة إلى النص الحالي
let charIndex = 0; // الإشارة إلى الحرف الحالي
let isDeleting = false; // حالة الكتابة أو المسح
const typingSpeed = 150; // سرعة الكتابة
const deletingSpeed = 100; // سرعة المسح
const pauseBetweenTexts = 1000; // التوقف بين النصوص

// العنصر الذي سيتم تعديل النص داخله
const textElement = document.querySelector(".text");

function typeEffect() {
  const currentText = texts[index]; // النص الحالي

  if (isDeleting) {
    // مسح النص حرفًا بحرف
    charIndex--;
    textElement.textContent = currentText.substring(0, charIndex);
  } else {
    // كتابة النص حرفًا بحرف
    charIndex++;
    textElement.textContent = currentText.substring(0, charIndex);
  }

  // التحكم في حالة الكتابة والمسح
  if (!isDeleting && charIndex === currentText.length) {
    // انتهى من كتابة النص بالكامل
    isDeleting = true;
    setTimeout(typeEffect, pauseBetweenTexts); // وقفة قبل بدء المسح
  } else if (isDeleting && charIndex === 0) {
    // انتهى من مسح النص بالكامل
    isDeleting = false;
    index = (index + 1) % texts.length; // الانتقال إلى النص التالي
    setTimeout(typeEffect, 500); // وقفة قصيرة قبل كتابة النص التالي
  } else {
    // الاستمرار في الكتابة أو المسح
    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
  }
}

// بدء التأثير
typeEffect();
document.addEventListener('DOMContentLoaded', () => {
    // دالة لتنفيذ الأنيميشن الخاص بالـ progress lines
    const activateProgressLines = () => {
        const progressLines = document.querySelectorAll('.progress-line span');

        progressLines.forEach((line) => {
            // تحديد الكلاس لتحديد النسبة المئوية
            let targetWidth;
            if (line.parentElement.classList.contains('html')) {
                targetWidth = '95%';
            } else if (line.parentElement.classList.contains('css')) {
                targetWidth = '90%';
            } else if (line.parentElement.classList.contains('javascript')) {
                targetWidth = '80%';
            } else if (line.parentElement.classList.contains('python')) {
                targetWidth = '70%';
            } else if (line.parentElement.classList.contains('react')) {
                targetWidth = '80%';
            }

            // تعيين العرض بناءً على النسبة
            line.style.animation = 'none'; // أوقف الأنيميشن الافتراضي
            setTimeout(() => {
                line.style.width = targetWidth; // ضع النسبة الصحيحة
                line.style.transition = 'width 2s ease'; // أضف تأثير الحركة
            }, 100); // تأخير بسيط لبدء الأنيميشن
        });
    };

    // دالة لتنفيذ الأنيميشن الخاص بالـ radial bars
    const activateRadialBars = () => {
        const radialBars = document.querySelectorAll('.radial-bar');

        radialBars.forEach((bar) => {
            const percent = bar.getAttribute('data-percent'); // النسبة المئوية
            const circle = bar.querySelector('.progress-bar');
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;

            // ضبط المحيط بناءً على نصف القطر
            circle.style.strokeDasharray = `${circumference}`;
            circle.style.strokeDashoffset = `${circumference}`;

            // تطبيق الأنيميشن
            setTimeout(() => {
                const offset = circumference - (percent / 100) * circumference;
                circle.style.strokeDashoffset = offset; // تعيين النسبة المئوية
                circle.style.transition = 'stroke-dashoffset 2s ease'; // أضف تأثير الحركة
            }, 100); // تأخير بسيط لتفعيل الأنيميشن
        });
    };

    // إعداد Intersection Observer لتفعيل الأنيميشن عند ظهور العناصر
    const observerOptions = {
        root: null,
        threshold: 0.5 // 50% من العنصر يجب أن يكون مرئيًا لتفعيل الأنيميشن
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // تحقق من العنصر إذا كان جزءًا من progress lines
                if (entry.target.classList.contains('progress-line')) {
                    activateProgressLines();
                }

                // تحقق من العنصر إذا كان جزءًا من radial bars
                if (entry.target.classList.contains('radial-bar')) {
                    activateRadialBars();
                }
            }
        });
    }, observerOptions);

    // مراقبة العناصر المطلوبة
    const progressSections = document.querySelectorAll('.progress-line, .radial-bar');
    progressSections.forEach((section) => observer.observe(section));
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
        hamburger.classList.toggle('open');
    });
});
