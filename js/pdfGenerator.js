function initPDFGenerator() {
    var downloadBtn = document.getElementById('download-pdf');
    
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', generatePDF);
}

function generatePDF() {
    var element = document.querySelector('.main-container');
    var opt = {
        margin: 10,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            useCORS: true,
            allowTaint: true
        }
    };
    
    window.html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(function() {})
        .catch(function(err) {
            console.error('PDF generation error:', err);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = initPDFGenerator;
    document.head.appendChild(script);
});