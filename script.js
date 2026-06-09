/**
 * UIT Showcase Portal - Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Mobile Navigation Drawer
  // ==========================================
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggleBtn && mainNav) {
    navToggleBtn.addEventListener('click', () => {
      const isExpanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
      navToggleBtn.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('open');
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Close menu when clicking nav links (smooth scroll trigger)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggleBtn.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }


  // ==========================================
  // 2. Active Navigation Class & Sticky Header Fallback
  // ==========================================
  const mainHeader = document.getElementById('main-header');
  const sections = document.querySelectorAll('section[id]');
  const scrollProgressBar = document.getElementById('scroll-progress');

  // Check if native scroll-timeline is supported
  const supportsScrollTimeline = CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Header fallback
    if (!supportsScrollTimeline && mainHeader) {
      if (scrollY > 50) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }

    // Scroll Progress bar
    if (scrollProgressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Highlighting current section in nav
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });


  // ==========================================
  // 3. Scroll Reveal & Intersection Observer Animations
  // ==========================================
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ==========================================
  // 4. Statistics Counter Animation
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const stepTime = Math.max(Math.floor(duration / target), 15);
    let current = 0;
    
    const timer = setInterval(() => {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = current;
      }
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numbers = entry.target.querySelectorAll('.stat-number');
        numbers.forEach(num => countUp(num));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }


  // ==========================================
  // 5. Interactive Faculty Explorer (Tabs & Content switching)
  // ==========================================
  const facultyData = {
    'fit-cs': {
      badge: 'Thành lập sớm nhất',
      title: 'Khoa Khoa học Máy tính (Computer Science)',
      desc: 'Khoa Khoa học Máy tính là một trong những khoa nòng cốt lâu đời nhất của UIT, đi đầu trong nghiên cứu và đào tạo các hướng chuyên sâu về Trí tuệ nhân tạo (AI), Học máy (Machine Learning), Khoa học dữ liệu lớn và xử lý ngôn ngữ tự nhiên.',
      highlights: [
        'Trí tuệ Nhân tạo & Thị giác Máy tính',
        'Khoa học dữ liệu lớn (Big Data Science)',
        'Học máy và Khai thác dữ liệu'
      ],
      majors: [
        { name: 'Khoa học Máy tính', desc: 'Đào tạo chuyên sâu về thuật toán, thiết kế hệ thống và phát triển phần mềm lõi thông minh.' },
        { name: 'Trí tuệ Nhân tạo (AI)', desc: 'Chương trình tuyển sinh mũi nhọn, phát triển các giải pháp AI và người máy thông minh.', highlight: true },
        { name: 'Khoa học Dữ liệu', desc: 'Khai thác tri thức từ các nguồn dữ liệu lớn phục vụ quản trị và nghiên cứu.' }
      ],
      website: 'https://cs.uit.edu.vn'
    },
    'fit-se': {
      badge: 'Sinh viên đông đảo nhất',
      title: 'Khoa Công nghệ Phần mềm (Software Engineering)',
      desc: 'Khoa Công nghệ Phần mềm trang bị cho sinh viên năng lực thiết kế, xây dựng, kiểm thử và vận hành các hệ thống phần mềm quy mô lớn. Sinh viên được làm quen với các quy trình Agile/DevOps và xu hướng phát triển mới nhất.',
      highlights: [
        'Quy trình sản xuất phần mềm hiện đại (Agile, Scrum, CI/CD)',
        'Phát triển ứng dụng Web, Mobile & Điện toán đám mây',
        'Phát triển Game & Công nghệ đồ họa 3D'
      ],
      majors: [
        { name: 'Kỹ thuật Phần mềm', desc: 'Trở thành kỹ sư phát triển phần mềm chuyên nghiệp, làm chủ các ngôn ngữ và công nghệ hàng đầu.' },
        { name: 'Thiết kế Game (Game Design)', desc: 'Ngành học độc đáo kết hợp giữa kỹ thuật lập trình game và tư duy thiết kế đồ họa.', highlight: true }
      ],
      website: 'https://se.uit.edu.vn'
    },
    'fit-is': {
      badge: 'Ứng dụng doanh nghiệp cao',
      title: 'Khoa Hệ thống Thông tin (Information Systems)',
      desc: 'Khoa Hệ thống Thông tin là sự giao thoa hoàn hảo giữa CNTT và Quản trị kinh doanh. Chương trình tập trung vào việc áp dụng công nghệ để giải quyết các bài toán vận hành, phân tích dữ liệu kinh doanh và chuyển đổi số doanh nghiệp.',
      highlights: [
        'Phân tích dữ liệu lớn và Trí tuệ kinh doanh (Business Intelligence - BI)',
        'Hệ thống hoạch định tài nguyên doanh nghiệp (ERP)',
        'Thương mại điện tử & Công nghệ Blockchain'
      ],
      majors: [
        { name: 'Hệ thống Thông tin', desc: 'Tích hợp quy trình nghiệp vụ doanh nghiệp với hệ thống phần mềm quản lý tối ưu.' },
        { name: 'Thương mại Điện tử', desc: 'Phát triển mô hình kinh doanh số, SEO, Marketing số và hệ thống thanh toán điện tử.', highlight: true }
      ],
      website: 'https://is.uit.edu.vn'
    },
    'fit-nc': {
      badge: 'Thế mạnh An toàn Thông tin',
      title: 'Khoa Mạng máy tính & Truyền thông (Computer Networks & Communications)',
      desc: 'Khoa đào tạo chuyên sâu về thiết kế, quản trị hạ tầng mạng truyền thông, điện toán đám mây và IoT. Đặc biệt, phân ngành An toàn thông tin của khoa là thương hiệu nổi tiếng, liên tục đạt giải cao tại các kỳ thi quốc gia và quốc tế.',
      highlights: [
        'An toàn thông tin mạng & Ứng phó sự cố bảo mật',
        'Điện toán đám mây (Cloud Computing) & ảo hóa',
        'Internet vạn vật (IoT) & Mạng không dây thế hệ mới'
      ],
      majors: [
        { name: 'An toàn Thông tin (Cybersecurity)', desc: 'Đào tạo chuyên gia bảo mật, pentester, bảo vệ hệ thống thông tin trọng yếu.', highlight: true },
        { name: 'Mạng Máy tính & Truyền thông dữ liệu', desc: 'Thiết kế, xây dựng và quản trị hạ tầng mạng cho các tập đoàn lớn.' }
      ],
      website: 'https://nc.uit.edu.vn'
    },
    'fit-ce': {
      badge: 'Dẫn đầu Thiết kế Vi mạch',
      title: 'Khoa Kỹ thuật Máy tính (Computer Engineering)',
      desc: 'Khoa Kỹ thuật Máy tính kết hợp chặt chẽ giữa thiết kế phần cứng và lập trình phần mềm điều khiển. CE hiện đang là đơn vị tiên phong cả nước tuyển sinh ngành Thiết kế Vi mạch bán dẫn - lĩnh vực chiến lược quốc gia.',
      highlights: [
        'Thiết kế Vi mạch bán dẫn (IC/Chip Design)',
        'Hệ thống nhúng (Embedded Systems) & Robot thông minh',
        'Hệ thống điều khiển tự động hóa dựa trên IoT'
      ],
      majors: [
        { name: 'Thiết kế Vi mạch', desc: 'Quy trình thiết kế vi mạch số, tương tự và bán dẫn chuẩn quốc tế đón sóng đầu tư công nghệ.', highlight: true },
        { name: 'Kỹ thuật Máy tính', desc: 'Phát triển các thiết bị nhúng thông minh, thiết bị IoT và kiến trúc máy tính.' }
      ],
      website: 'https://ce.uit.edu.vn'
    },
    'fit-ise': {
      badge: 'Đa phương tiện & Công nghệ số',
      title: 'Khoa Khoa học & Kỹ thuật Thông tin (Information Science & Engineering)',
      desc: 'Khoa Khoa học & Kỹ thuật Thông tin định hướng đào tạo công nghệ đa phương tiện, giao tiếp người - máy và công nghệ giáo dục trực tuyến. Sinh viên được trang bị cả kỹ năng kỹ thuật lẫn tư duy sáng tạo truyền thông.',
      highlights: [
        'Công nghệ truyền thông đa phương tiện & Thiết kế UI/UX',
        'Hệ thống học tập thông minh (E-learning) & EdTech',
        'Xử lý ảnh số & Công nghệ thực tế ảo tăng cường'
      ],
      majors: [
        { name: 'Truyền thông Đa phương tiện', desc: 'Sự kết hợp giữa công nghệ phần mềm và mỹ thuật truyền thông số hiện đại.', highlight: true },
        { name: 'Công nghệ Giáo dục', desc: 'Phát triển các nền tảng số hóa học liệu và các hệ thống trường học thông minh.' }
      ],
      website: 'https://ise.uit.edu.vn'
    }
  };

  const facultyTabs = document.querySelectorAll('.faculty-tab');
  const facultyContentContainer = document.getElementById('faculty-content-container');

  if (facultyTabs && facultyContentContainer) {
    facultyTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Active tab styling
        facultyTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Get faculty details
        const key = tab.getAttribute('data-faculty');
        const data = facultyData[key];

        if (data) {
          // Fade-out transition
          facultyContentContainer.style.opacity = '0';
          facultyContentContainer.style.transform = 'translateY(8px)';
          facultyContentContainer.style.transition = 'opacity 0.25s, transform 0.25s';

          setTimeout(() => {
            // Generate content
            let highlightsHtml = '';
            data.highlights.forEach(hl => {
              highlightsHtml += `<li><i class="fa-solid fa-circle-nodes"></i> ${hl}</li>`;
            });

            let majorsHtml = '';
            data.majors.forEach(major => {
              const highlightClass = major.highlight ? 'highlight' : '';
              majorsHtml += `
                <div class="major-card ${highlightClass}">
                  <h5>${major.name}</h5>
                  <p>${major.desc}</p>
                </div>
              `;
            });

            // Update Panel DOM
            facultyContentContainer.innerHTML = `
              <div class="faculty-panel active">
                <div class="faculty-panel-grid">
                  <div class="faculty-text">
                    <span class="faculty-badge">${data.badge}</span>
                    <h3>${data.title}</h3>
                    <p class="faculty-desc">${data.desc}</p>
                    
                    <div class="faculty-highlights">
                      <h4>Các hướng nghiên cứu mũi nhọn:</h4>
                      <ul>
                        ${highlightsHtml}
                      </ul>
                    </div>
                  </div>
                  <div class="faculty-majors">
                    <h4>Ngành đào tạo trọng điểm:</h4>
                    <div class="major-cards">
                      ${majorsHtml}
                    </div>
                    <a href="${data.website}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">Ghé thăm Website Khoa <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                  </div>
                </div>
              </div>
            `;

            // Fade-in transition
            facultyContentContainer.style.opacity = '1';
            facultyContentContainer.style.transform = 'translateY(0)';
          }, 250);
        }
      });
    });
  }


  // ==========================================
  // 6. Dynamic News rendering & filters
  // ==========================================
  const newsData = [
    {
      id: 1,
      category: 'su-kien',
      categoryLabel: 'Sự kiện',
      image: 'campus_real.jpg',
      icon: 'fa-cake-candles',
      date: '06/06/2026',
      source: 'uit.edu.vn',
      title: 'Lễ kỷ niệm 20 năm thành lập Trường Đại học Công nghệ Thông tin (2006-2026)',
      excerpt: 'UIT long trọng kỷ niệm chặng đường hai thập kỷ đầy tự hào. Suốt 20 năm qua, trường đã khẳng định vị trí là cơ sở đào tạo, chuyển giao khoa học công nghệ hàng đầu ngành CNTT-TT.',
      link: 'https://www.uit.edu.vn/truong-dai-hoc-cong-nghe-thong-tin-long-trong-to-chuc-le-ky-niem-20-nam-thanh-lap-2006-2026'
    },
    {
      id: 2,
      category: 'tuyen-sinh',
      categoryLabel: 'Tuyển sinh',
      image: 'vision_mission.jpg',
      icon: 'fa-user-graduate',
      date: '15/05/2026',
      source: 'tuyensinh.uit.edu.vn',
      title: 'Quy chế tuyển sinh Đại học chính quy năm 2026 - Xét tuyển kết quả kỳ thi ĐGNL ĐHQG-HCM',
      excerpt: 'Hội đồng tuyển sinh công bố quy định điều kiện, cách tính điểm quy đổi điểm chứng chỉ ngoại ngữ quốc tế và lịch trình nhập học dựa trên kết quả thi Đánh giá Năng lực.',
      link: 'https://tuyensinh.uit.edu.vn'
    },
    {
      id: 3,
      category: 'hoc-bong',
      categoryLabel: 'Học bổng',
      image: 'scholarship_news.jpg',
      icon: 'fa-award',
      date: '28/05/2026',
      source: 'uit.edu.vn',
      title: 'Học bổng đào tạo Thiết kế Vi mạch & Bán dẫn tại Đại học Bang Arizona (Hoa Kỳ) năm 2026',
      excerpt: 'Sinh viên năm cuối ngành Thiết kế Vi mạch và các ngành liên quan có học lực xuất sắc sẽ được tài trợ 100% học bổng đào tạo chuyên sâu ngắn hạn tại Đại học Arizona.',
      link: 'https://www.uit.edu.vn'
    },
    {
      id: 4,
      category: 'cong-nghe',
      categoryLabel: 'Tin công nghệ',
      image: 'campus_real.jpg',
      icon: 'fa-server',
      date: '12/06/2026',
      source: 'uit.edu.vn',
      title: 'Giảng viên và sinh viên UIT tham dự Hội nghị Internet Việt Nam (VIC 2026)',
      excerpt: 'Diễn ra từ 16/6 đến 19/6/2026, VIC 2026 là hội thảo quy mô lớn nhất nước về công nghệ Internet thế hệ mới, IPv6, Cloud Security và quản trị tên miền quốc gia.',
      link: 'https://www.uit.edu.vn'
    },
    {
      id: 5,
      category: 'tuyen-dung',
      categoryLabel: 'Tuyển dụng',
      image: 'vision_mission.jpg',
      icon: 'fa-handshake',
      date: '05/06/2026',
      source: 'forum.uit.edu.vn',
      title: 'Tin tuyển dụng: Cơ hội thực tập & việc làm Web/Mobile tại Golden Owl và Tisoha Software',
      excerpt: 'Các vị trí tuyển dụng thực tập sinh, part-time và full-time mở rộng cho sinh viên năm 3, năm 4. Môi trường làm việc năng động, có hỗ trợ lương thực tập.',
      link: 'https://forum.uit.edu.vn'
    }
  ];

  const newsGridContainer = document.getElementById('news-grid-container');
  const newsFilters = document.querySelectorAll('.filter-btn');

  // Function to render news
  const renderNews = (filterCategory = 'all') => {
    if (!newsGridContainer) return;
    
    // Filter logic
    const filteredNews = filterCategory === 'all' 
      ? newsData 
      : newsData.filter(item => item.category === filterCategory);

    // Empty container
    newsGridContainer.innerHTML = '';

    if (filteredNews.length === 0) {
      newsGridContainer.innerHTML = `
        <div class="no-news-message" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
          <i class="fa-solid fa-inbox" style="font-size: 3rem; margin-bottom: 16px; display: block;"></i>
          Hiện chưa có tin tức nào trong danh mục này.
        </div>
      `;
      return;
    }

    // Append news card DOMs
    filteredNews.forEach(item => {
      const card = document.createElement('article');
      card.className = 'news-card';
      card.setAttribute('data-category', item.category);
      card.id = `news-item-${item.id}`;
      
      card.innerHTML = `
        <div class="news-image-wrapper">
          <span class="news-badge-cat">${item.categoryLabel}</span>
          <img src="${item.image}" alt="${item.title}" class="news-card-img">
        </div>
        <div class="news-body">
          <div class="news-meta">
            <span class="news-date"><i class="fa-regular fa-calendar"></i> ${item.date}</span>
            <span class="news-source"><i class="fa-solid fa-circle"></i> ${item.source}</span>
          </div>
          <h3 class="news-card-title">${item.title}</h3>
          <p class="news-card-excerpt">${item.excerpt}</p>
          <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="news-readmore" id="news-link-${item.id}">Đọc bài viết gốc <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      `;
      newsGridContainer.appendChild(card);
    });
  };

  // Bind news filters click
  if (newsFilters) {
    newsFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        newsFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        renderNews(filter);
      });
    });
  }

  // Initial news render
  renderNews('all');

});
