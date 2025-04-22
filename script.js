// Initialize mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.style.display = 'block';
        } else {
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300);
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300);
        });
    });
    
    // Copy contract address functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeElement = this.previousElementSibling;
            const textToCopy = codeElement.textContent;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                this.classList.add('copied');
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
                `;
                
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c0-1.1.9-2 2-2h2"/><path d="M4 12c0-1.1.9-2 2-2h2"/><path d="M4 8c0-1.1.9-2 2-2h2"/></svg>
                    `;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
    
    // Initialize tokenomics chart
    const ctx = document.getElementById('tokenomicsChart').getContext('2d');
    const tokenomicsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                '社区空投/奖励 (40%)',
                '初始流动性 (40%)',
                '营销/发展基金 (10%)',
                '团队持有 (10%)'
            ],
            datasets: [{
                data: [40, 40, 10, 10],
                backgroundColor: [
                    '#EAB308', // Yellow
                    '#B45309', // Amber
                    '#10B981', // Green
                    '#EF4444'  // Red
                ],
                borderColor: '#111827',
                borderWidth: 2,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#111827',
                    titleColor: '#fff',
                    bodyColor: '#f3f4f6',
                    borderColor: '#374151',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.label;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if(this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Disable zooming on mobile
    window.addEventListener("wheel", (e)=> {
        const isPinching = e.ctrlKey
        if(isPinching) e.preventDefault()
    }, { passive: false });
    
    // Add hover effects to the roadmap items
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    roadmapItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover');
        });
    });
});
