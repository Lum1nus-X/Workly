function validateApplicationForm(event) {
    event.preventDefault();
    
    const fname = document.getElementById('fname')?.value.trim();
    const lname = document.getElementById('lname')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const aiTier = document.getElementById('aiTier')?.value;
    const pdpa = document.getElementById('pdpa')?.checked;

    if (!fname || !lname || !email || !phone || !aiTier) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง');
        return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('กรุณากรอกเบอร์โทรศัพท์เป็นตัวเลข 10 หลัก');
        return false;
    }

    if (!pdpa) {
        alert('กรุณากดยินยอมเงื่อนไข PDPA ก่อนส่งข้อมูล');
        return false;
    }

    alert(`บันทึกข้อมูลเรียบร้อยแล้ว!\nขอบคุณคุณ ${fname} ${lname} ที่ยื่นสมัครงานกับทาง Workly`);
    event.target.reset();
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