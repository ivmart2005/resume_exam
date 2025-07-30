function debounce(func, timeout = 100) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), timeout);
    };
}

function adjustInterestsFontSize() {
    const container = document.querySelector('.interests-container');
    const items = container?.querySelectorAll('.interest-item');
    if (!items?.length) return;

    items.forEach(item => item.style.fontSize = '');
    let currentFontSize = 10;
    
    const checkSize = () => {
        if (container.scrollHeight <= container.clientHeight || currentFontSize <= 3) return;
        currentFontSize -= 0.05;
        items.forEach(item => item.style.fontSize = `${currentFontSize}px`);
        requestAnimationFrame(checkSize);
    };
    
    checkSize();
}

document.addEventListener('DOMContentLoaded', adjustInterestsFontSize);
window.addEventListener('resize', debounce(adjustInterestsFontSize));
setTimeout(adjustInterestsFontSize, 300);
