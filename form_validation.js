const applicationFields = ['fname', 'lname', 'email', 'phone', 'jobTitle', 'skillTier', 'pdpa']
    .map((id) => document.getElementById(id));
let submissionAttempted = false;

function isApplicationFieldValid(field) {
    switch (field.id) {
        case 'fname':
        case 'lname':
            return field.value.trim() !== '';
        case 'email':
            return field.value.trim() !== '' && !field.validity.typeMismatch;
        case 'phone':
            return /^[0-9]{10}$/.test(field.value.trim());
        case 'jobTitle':
        case 'skillTier':
            return field.value !== '';
        case 'pdpa':
            return field.checked;
        default:
            return true;
    }
}

function updateFieldValidation(field) {
    const isValid = isApplicationFieldValid(field);
    field.classList.toggle('validation-error', !isValid);
    field.setAttribute('aria-invalid', String(!isValid));
    return isValid;
}

applicationFields.forEach((field) => {
    const eventName = field.type === 'checkbox' || field.tagName === 'SELECT' ? 'change' : 'input';
    field.addEventListener(eventName, () => {
        if (submissionAttempted) updateFieldValidation(field);
    });
});

function validateApplicationForm(event) {
    event.preventDefault();

    const fname = document.getElementById('fname')?.value.trim();
    const lname = document.getElementById('lname')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const pdpa = document.getElementById('pdpa')?.checked;

    submissionAttempted = true;
    const allFieldsValid = applicationFields.map(updateFieldValidation).every(Boolean);

    if (!fname || !lname || !email || !phone
        || !document.getElementById('jobTitle')?.value
        || !document.getElementById('skillTier')?.value) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง');
        return false;
    }

    if (!document.getElementById('email')?.validity.valid) {
        alert('กรุณากรอกอีเมลให้ถูกต้อง');
        return false;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert('กรุณากรอกเบอร์โทรศัพท์เป็นตัวเลข 10 หลัก');
        return false;
    }

    if (!pdpa) {
        alert('กรุณากดยินยอมเงื่อนไข PDPA ก่อนส่งข้อมูล');
        return false;
    }

    if (!allFieldsValid) return false;

    alert(`บันทึกข้อมูลเรียบร้อยแล้ว!\nขอบคุณคุณ ${fname} ${lname} ที่ยื่นสมัครงานกับทาง Workly`);
    event.target.reset();
    submissionAttempted = false;
    applicationFields.forEach((field) => {
        field.classList.remove('validation-error');
        field.removeAttribute('aria-invalid');
    });
    closeModal();
    return true;
}

function openModal(jobTitle = '') {
    const modal = document.getElementById('apply-modal');
    const targetInput = document.getElementById('target-job');
    if (targetInput) targetInput.value = jobTitle;
    if (modal) modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('apply-modal');
    if (modal) modal.classList.add('hidden');
}