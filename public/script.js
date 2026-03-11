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

        services.forEach((service, idx) => {
            const delayClass = `delay-${(idx % 3) * 100}`;
            const html = `
                <div class="bg-white border border-slate-100 rounded-2xl p-10 flex flex-col items-center text-center justify-center shadow-sm hover:shadow-md transition-shadow fade-in-up ${delayClass}">
                    <div class="w-14 h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-6">
                        <i data-lucide="${service.icon}" class="w-7 h-7 text-brand-gold"></i>
                    </div>
                    <h3 class="text-[17px] font-bold text-brand-navy">${service.title}</h3>
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

        team.forEach((member, idx) => {
            const delayClass = `delay-${(idx % 4) * 100}`;

            // Render image if provided, otherwise fallback to user icon
            const avatarContent = member.image
                ? `<img src="${member.image}" alt="${member.name}" class="w-full h-full object-cover">`
                : `<i data-lucide="users" class="w-10 h-10 text-slate-400"></i>`;

            const html = `
                <div class="glass-card p-6 text-center hover:-translate-y-2 transition-transform duration-300 fade-in-up ${delayClass}">
                    <div class="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-brand-gold/20 overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
                        ${avatarContent}
                    </div>
                    <h4 class="text-lg font-bold text-brand-navy">${member.name}</h4>
                    <p class="text-brand-gold text-sm font-medium">${member.role}</p>
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

        products.forEach((product, idx) => {
            const delayClass = `delay-${(idx % 3) * 100}`;
            const badgeClass = 'bg-brand-gold/20 text-brand-gold-dark';
            const html = `
                <div class="bg-white border border-slate-100 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow fade-in-up ${delayClass}">
                    <div class="flex justify-between items-start mb-6 gap-4">
                        <h3 class="text-lg font-bold text-brand-navy flex-1 leading-tight">${product.title}</h3>
                        <span class="px-2 py-1 text-[10px] font-bold uppercase rounded ${badgeClass} shrink-0">${product.badge}</span>
                    </div>
                    <p class="text-slate-500 text-[15px] leading-relaxed">${product.desc}</p>
                </div>
            `;
            productsGrid.insertAdjacentHTML('beforeend', html);
        });
    }

    function renderBlog(blogs) {
        const blogGrid = document.getElementById('blog-grid');
        if (!blogGrid) return;
        blogGrid.innerHTML = '';

        blogs.forEach((blog, idx) => {
            const delayClass = `delay-${(idx % 3) * 100}`;
            const html = `
                <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 fade-in-up ${delayClass} flex flex-col group">
                    <div class="h-48 overflow-hidden">
                        <img src="${blog.image}" alt="${blog.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="p-6 flex flex-col flex-1 text-left">
                        <div class="flex items-center gap-4 text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-3">
                            <span class="flex items-center gap-1"><i data-lucide="user" class="w-3 h-3"></i> ${blog.author}</span>
                            <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i> ${blog.date}</span>
                        </div>
                        <h3 class="text-[17px] font-bold text-brand-navy leading-snug mb-5">${blog.title}</h3>
                        <a href="#" class="mt-auto text-sm font-semibold text-brand-navy flex items-center gap-1 group-hover:text-brand-gold transition-colors">
                            Read Article <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </a>
                    </div>
                </div>
            `;
            blogGrid.insertAdjacentHTML('beforeend', html);
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
