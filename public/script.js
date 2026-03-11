document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    lucide.createIcons();

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.nav-link-mobile');

    function toggleMenu() {
        mobileMenu.classList.toggle('hidden');
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 3. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('glass-header', 'py-3');
            header.classList.remove('bg-transparent', 'py-6');
        } else {
            header.classList.remove('glass-header', 'py-3');
            header.classList.add('bg-transparent', 'py-6');
        }
    });

    // 4. Scroll Animations (Intersection Observer instead of Framer Motion)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // 5. Populate Data Methods (simulating React components)
    function renderServices(services) {
        const servicesGrid = document.getElementById('services-grid');
        if (!servicesGrid) return;
        servicesGrid.innerHTML = '';

        if (!Array.isArray(services)) services = [];
        services.forEach((service, idx) => {
            const delayClass = `delay-${(idx % 3) * 100}`;
            const html = `
                <div class="glass-card p-10 flex flex-col items-center text-center justify-center fade-in-up ${delayClass}">
                    <div class="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-brand-gold/20">
                        <i data-lucide="${service.icon}" class="w-8 h-8 text-brand-gold"></i>
                    </div>
                    <h3 class="text-lg font-bold text-brand-navy leading-snug">${service.title}</h3>
                </div>
            `;
            servicesGrid.insertAdjacentHTML('beforeend', html);
        });
        lucide.createIcons();
    }

    function renderTeam(team) {
        const teamGrid = document.getElementById('team-grid');
        if (!teamGrid) return;
        teamGrid.innerHTML = '';

        if (!Array.isArray(team)) team = [];
        team.forEach((member, idx) => {
            const delayClass = `delay-${(idx % 4) * 100}`;

            // Render image if provided, otherwise fallback to user icon
            const avatarContent = member.image
                ? `<img src="${member.image}" alt="${member.name}" class="w-full h-full object-cover">`
                : `<i data-lucide="users" class="w-10 h-10 text-slate-400"></i>`;

            const html = `
                <div class="glass-card p-8 text-center fade-in-up ${delayClass}">
                    <div class="w-28 h-28 bg-slate-50 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-md overflow-hidden hover:scale-105 transition-transform duration-500 cursor-pointer">
                        ${avatarContent}
                    </div>
                    <h4 class="text-xl font-bold text-brand-navy mb-1">${member.name}</h4>
                    <p class="text-brand-gold text-sm font-semibold uppercase tracking-wider">${member.role}</p>
                </div>
            `;
            teamGrid.insertAdjacentHTML('beforeend', html);
        });

        // Re-observe injected elements for animation
        document.querySelectorAll('#team-grid .fade-in-up, #services-grid .fade-in-up, #products-grid .fade-in-up, #blog-grid .fade-in-up').forEach(el => observer.observe(el));
        lucide.createIcons();
    }
    function renderProducts(products) {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) return;
        productsGrid.innerHTML = '';

        if (!Array.isArray(products)) products = [];
        products.forEach((product, idx) => {
            const delayClass = `delay-${(idx % 3) * 100}`;
            const html = `
                <div class="glass-card p-8 flex flex-col fade-in-up ${delayClass}">
                    <div class="flex justify-between items-start mb-6 gap-4">
                        <h3 class="text-xl font-bold text-brand-navy flex-1 leading-tight">${product.title}</h3>
                        <span class="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-brand-gold/10 text-brand-gold-dark border border-brand-gold/20 shrink-0">${product.badge}</span>
                    </div>
                    <p class="text-slate-500 text-base leading-relaxed">${product.desc}</p>
                </div>
            `;
            productsGrid.insertAdjacentHTML('beforeend', html);
        });
    }

    function renderBlog(blogs) {
        const blogGrid = document.getElementById('blog-grid');
        if (!blogGrid) return;
        blogGrid.innerHTML = '';

        if (!Array.isArray(blogs)) blogs = [];
        blogs.forEach((blog, idx) => {
            const delayClass = `delay-${(idx % 3) * 100}`;
            const html = `
                <div class="glass-card overflow-hidden fade-in-up ${delayClass} flex flex-col group p-0">
                    <div class="h-56 overflow-hidden relative">
                        <img src="${blog.image}" alt="${blog.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        <div class="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div class="p-8 flex flex-col flex-1 text-left">
                        <div class="flex items-center gap-4 text-[11px] font-bold text-brand-gold uppercase tracking-widest mb-4">
                            <span class="flex items-center gap-1.5"><i data-lucide="user" class="w-3.5 h-3.5"></i> ${blog.author}</span>
                            <span class="flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${blog.date}</span>
                        </div>
                        <h3 class="text-xl font-bold text-brand-navy leading-tight mb-6 group-hover:text-brand-gold transition-colors">${blog.title}</h3>
                        <a href="#" class="mt-auto text-sm font-bold text-brand-navy flex items-center gap-2 group-hover:gap-3 transition-all">
                            Read Full Insight <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </a>
                    </div>
                </div>
            `;
            blogGrid.insertAdjacentHTML('beforeend', html);
        });
    }

    function renderPartners(partners) {
        const partnersGrid = document.getElementById('partners-grid');
        if (!partnersGrid || !partners || partners.length === 0) return;
        partnersGrid.innerHTML = '';

        partners.forEach((partner) => {
            const content = partner.image
                ? `<img src="${partner.image}" alt="${partner.name}" class="h-12 md:h-16 object-contain">`
                : `<div class="text-lg md:text-xl font-display font-bold text-brand-navy text-center">${partner.name}</div>`;

            partnersGrid.insertAdjacentHTML('beforeend', content);
        });
    }

    // Fetch Content from CMS JSON API
    async function fetchCMSContent() {
        try {
            const res = await fetch('/api/content');
            if (res.ok) {
                const data = await res.json();
                renderServices(data.services || []);
                renderProducts(data.products || []);
                renderBlog(data.blogs || []);
                renderTeam(data.team || []);
                renderPartners(data.partners || []);
            } else {
                console.error("Failed to load CMS content. Falling back to empty arrays.");
                renderServices([]); renderProducts([]); renderBlog([]); renderTeam([]);
            }
        } catch (e) {
            console.error("Network error loading CMS content.", e);
        }
    }

    fetchCMSContent();

    // 6. Interactive ROI Calculator Logic
    const sliderEmployees = document.getElementById('slider-employees');
    const sliderHours = document.getElementById('slider-hours');
    const sliderWage = document.getElementById('slider-wage');

    const valEmployees = document.getElementById('val-employees');
    const valHours = document.getElementById('val-hours');
    const valWage = document.getElementById('val-wage');

    const resSavings = document.getElementById('res-savings');
    const resTime = document.getElementById('res-time');
    const roiCard = document.getElementById('roi-results-card');

    function calculateROI() {
        const EMP = parseInt(sliderEmployees.value);
        const HRS = parseInt(sliderHours.value); // per week
        const WAGE = parseInt(sliderWage.value); // nGN

        // Automation ratio (assumption: software cuts manual work by 70%)
        const AUTOMATION_SAVINGS_RATIO = 0.70;

        // Calculate
        const totalManualHoursPerMonth = EMP * HRS * 4;
        const savedHoursPerMonth = Math.round(totalManualHoursPerMonth * AUTOMATION_SAVINGS_RATIO);
        const monthlySavingsNaira = savedHoursPerMonth * WAGE;

        // UI Updates with animation trigger
        valEmployees.textContent = EMP;
        valHours.textContent = HRS;
        valWage.textContent = WAGE.toLocaleString();

        roiCard.style.transform = 'scale(0.98)';
        roiCard.style.opacity = '0.8';

        setTimeout(() => {
            resSavings.textContent = monthlySavingsNaira.toLocaleString();
            resTime.textContent = savedHoursPerMonth.toLocaleString();
            roiCard.style.transform = 'scale(1)';
            roiCard.style.opacity = '1';
        }, 150);
    }

    if (sliderEmployees && sliderHours && sliderWage) {
        sliderEmployees.addEventListener('input', calculateROI);
        sliderHours.addEventListener('input', calculateROI);
        sliderWage.addEventListener('input', calculateROI);
        calculateROI(); // Initial run
    }

    // 7. Interactive Quiz Logic
    const quizQuestions = [
        {
            question: "How do you currently track your inventory and sales?",
            options: ["Pen/Paper", "Basic Spreadsheets", "Dedicated Software"]
        },
        {
            question: "How do you manage customer relationships/support?",
            options: ["Manual WhatsApp/Calls", "Basic Contact List", "Automated CRM System"]
        },
        {
            question: "How are your financial records and invoicing handled?",
            options: ["Manual Invoicing/Cash", "Excel/Word Templates", "Integrated Accounting Software"]
        }
    ];

    let currentQuestionIndex = 0;
    const quizQuestionEl = document.getElementById('quiz-question');
    const quizOptionsEl = document.getElementById('quiz-options');
    const quizProgressEl = document.getElementById('quiz-progress');
    const quizProgressText = document.getElementById('quiz-progress-text');
    const quizQuestionCount = document.getElementById('quiz-question-count');

    // Make answerQuiz available globally for inline onclick
    window.answerQuiz = function (optionIndex) {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            currentQuestionIndex++;
            updateQuizUI();
        } else {
            // Quiz Complete State
            quizQuestionEl.textContent = "Quiz Complete! Your business is primed for automation.";
            quizOptionsEl.innerHTML = `
                <div class="bg-green-50 text-green-700 p-6 rounded-xl border border-green-100 flex flex-col items-center text-center">
                    <i data-lucide="check-circle" class="w-12 h-12 mb-3 text-green-500"></i>
                    <p class="font-bold mb-2">Readiness Score: High</p>
                    <p class="text-sm">Based on your answers, our Custom Business Systems and AI Automation will dramatically improve your operations.</p>
                </div>
            `;
            quizProgressEl.style.width = '100%';
            quizProgressText.textContent = '100%';
            quizQuestionCount.textContent = 'Complete';
            lucide.createIcons();
        }
    };

    function updateQuizUI() {
        if (!quizQuestionEl || !quizOptionsEl) return;

        const q = quizQuestions[currentQuestionIndex];

        // Update text with fade effect
        quizQuestionEl.style.opacity = '0';
        quizOptionsEl.style.opacity = '0';

        setTimeout(() => {
            quizQuestionEl.textContent = q.question;

            // Rebuild options
            quizOptionsEl.innerHTML = q.options.map((opt, idx) => `
                <button class="w-full text-left px-5 py-4 rounded-xl border border-slate-100 hover:border-brand-gold hover:bg-brand-gold/5 transition-colors flex justify-between items-center group" onclick="answerQuiz(${idx})">
                    <span class="text-slate-600 text-[15px] font-medium">${opt}</span>
                    <i data-lucide="chevron-right" class="w-4 h-4 text-slate-300 group-hover:text-brand-gold"></i>
                </button>
            `).join('');

            // Update Progress
            const progressPercent = Math.round(((currentQuestionIndex) / quizQuestions.length) * 100);
            quizProgressEl.style.width = `${progressPercent}%`;
            quizProgressText.textContent = `${progressPercent}%`;
            quizQuestionCount.textContent = `Question ${currentQuestionIndex + 1} of 3`;

            lucide.createIcons();

            quizQuestionEl.style.opacity = '1';
            quizOptionsEl.style.opacity = '1';
        }, 150);
    }

    // Set Year
    document.getElementById('copyright-year').textContent = `© ${new Date().getFullYear()} Sardauna Tech Lab Ltd. All rights reserved.`;

    // 8. Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic Validation
        if (!name || !email || !message) {
            showMessage("Please fill out all required fields.", "error");
            return;
        }

        const payload = { name, email, subject, message };

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-70', 'cursor-not-allowed');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                showMessage("Message Sent! Thank you for reaching out.", "success");
                contactForm.reset();
            } else {
                showMessage(result.message || "Something went wrong. Please try again.", "error");
            }
        } catch (error) {
            console.error('Submission Error:', error);
            showMessage("Network Error. Please try again later.", "error");
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
        }
    });

    function showMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
        if (type === 'error') {
            formMessage.classList.add('bg-red-100', 'text-red-700');
        } else {
            formMessage.classList.add('bg-green-100', 'text-green-700');
        }

        // auto-hide
        if (type === 'success') {
            setTimeout(() => formMessage.classList.add('hidden'), 5000);
        }
    }
});
