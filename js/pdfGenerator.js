document.getElementById("download-pdf").addEventListener("click", function () {
    var element = document.querySelector(".main-container");
    if (!element) return;

    var btn = document.getElementById("download-pdf");
    btn.disabled = true;

    html2canvas(element, { scale: 2 })
        .then(function (canvas) {
            var pdf = new jspdf.jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });
            var imgData = canvas.toDataURL("image/jpeg");
            var ratio = canvas.width / canvas.height;
            var width = pdf.internal.pageSize.getWidth();
            var height = width / ratio;
            var topMargin = 10;

            pdf.addImage(imgData, "JPEG", 0, topMargin, width, height);
            pdf.save("resume.pdf");
        })
        .catch(function (err) {
            console.error("PDF error:", err);
        })
        .finally(function () {
            btn.disabled = false;
            btn.textContent = "Download PDF";
        });
});
