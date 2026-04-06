// فيديوهات الصف الأول الثانوي
const firstYearVideos = [
  // {
  //   title: "عنوان الفيديو",
  //   duration: "مدة الفيديو (مثلاً: 35 دقيقة)",
  //   videoUrl: "رابط الفيديو (YouTube أو أي رابط آخر)",
  //   thumbnail: "رابط صورة الغلاف (اختياري)",
  //   description: "وصف مختصر للفيديو"
  // }
];

// فيديوهات الصف الثاني الثانوي
const secondYearVideos = [
     {
     title: "عنوان الفيديو",
     duration: "30:05",
     videoUrl: "(https://www.youtube.com/watch?v=P3VBFg6kclE)",
     thumbnail: "صوره.png",
     description: "الوصف"
  }
];

// فيديوهات الصف الثالث الثانوي
const thirdYearVideos = [



  
];

// ============================================
// دوال مساعدة لإضافة الفيديوهات بسهولة
// ============================================

/**
 * دالة لإضافة فيديو جديد للصف الأول الثانوي
 * @param {Object} video - معلومات الفيديو
 * @param {string} video.title - عنوان الفيديو
 * @param {string} video.duration - مدة الفيديو
 * @param {string} video.videoUrl - رابط الفيديو (YouTube embed link)
 * @param {string} video.thumbnail - رابط صورة الغلاف (اختياري)
 * @param {string} video.description - وصف الفيديو
 */
function addFirstYearVideo(video) {
  firstYearVideos.push(video);
  // إذا كانت صفحة الفيديوهات مفتوحة والصف الأول مختار، قم بتحديث العرض
  if (currentStage === 'first' && !document.getElementById('videos-page').hidden) {
    displayVideos('first');
  }
}

/**
 * دالة لإضافة فيديو جديد للصف الثاني الثانوي
 */
function addSecondYearVideo(video) {
  secondYearVideos.push(video);
  if (currentStage === 'second' && !document.getElementById('videos-page').hidden) {
    displayVideos('second');
  }
}

/**
 * دالة لإضافة فيديو جديد للصف الثالث الثانوي
 */
function addThirdYearVideo(video) {
  thirdYearVideos.push(video);
  if (currentStage === 'third' && !document.getElementById('videos-page').hidden) {
    displayVideos('third');
  }
}

// ============================================
// متغيرات وإعدادات عامة
// ============================================

let currentStage = 'first';

// ============================================
// دوال عرض الصفحات والتنقل
// ============================================

function showHomePage() {
  const homeSection = document.getElementById('homeSection');
  const featuresSection = document.querySelector('.features-section');
  const mainContent = document.querySelector('.main-content');
  const videosPage = document.getElementById('videos-page');
  
  if (homeSection) homeSection.style.display = 'block';
  if (featuresSection) featuresSection.style.display = 'block';
  if (mainContent) mainContent.style.display = 'block';
  if (videosPage) videosPage.hidden = true;
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateActiveNav('home');
}

function showVideosPage() {
  const homeSection = document.getElementById('homeSection');
  const featuresSection = document.querySelector('.features-section');
  const mainContent = document.querySelector('.main-content');
  const videosPage = document.getElementById('videos-page');
  
  if (homeSection) homeSection.style.display = 'none';
  if (featuresSection) featuresSection.style.display = 'none';
  if (mainContent) mainContent.style.display = 'none';
  if (videosPage) videosPage.hidden = false;
  
  // عرض فيديوهات الصف الأول افتراضياً
  showVideosStage('first');
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateActiveNav('videos');
}

function updateActiveNav(page) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));
  
  if (page === 'home') {
    const homeLink = document.querySelector('.nav-link[onclick*="showHomePage"]');
    if (homeLink) homeLink.classList.add('active');
  } else if (page === 'videos') {
    const videosLink = document.querySelector('.nav-link[onclick*="showVideosPage"]');
    if (videosLink) videosLink.classList.add('active');
  }
}

// ============================================
// عرض الفيديوهات حسب المرحلة
// ============================================

function showVideosStage(stage) {
  currentStage = stage;
  
  // تحديث النشاط للأزرار
  const buttons = document.querySelectorAll('.stage-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active-stage');
    const btnStage = btn.getAttribute('data-stage') || 
                     (btn.innerHTML.includes('الأول') ? 'first' : 
                      btn.innerHTML.includes('الثاني') ? 'second' : 'third');
    if (btnStage === stage) {
      btn.classList.add('active-stage');
    }
  });
  
  displayVideos(stage);
}

function displayVideos(stage) {
  const container = document.getElementById('videosContent');
  if (!container) return;
  
  let videos = [];
  let stageName = '';
  
  switch(stage) {
    case 'first':
      videos = firstYearVideos;
      stageName = 'الصف الأول الثانوي';
      break;
    case 'second':
      videos = secondYearVideos;
      stageName = 'الصف الثاني الثانوي';
      break;
    case 'third':
      videos = thirdYearVideos;
      stageName = 'الصف الثالث الثانوي';
      break;
    default:
      videos = [];
  }
  
  if (!videos || videos.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; background: white; border-radius: 20px;">
        <i class="fas fa-video" style="font-size: 3rem; color: #ffd966; margin-bottom: 1rem; display: block;"></i>
        <h3 style="color: #0a2538; margin-bottom: 0.5rem;">لا توجد فيديوهات حالياً</h3>
        <p style="color: #64748b;">سيتم إضافة فيديوهات ${stageName} قريباً</p>
        <p style="color: #64748b; margin-top: 1rem; font-size: 0.9rem;">يمكنك إضافة الفيديوهات من خلال ملف script.js</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = `
    <div class="videos-grid">
      ${videos.map((video, index) => `
        <div class="video-card">
          <div class="video-thumbnail" onclick="openVideoModal('${video.videoUrl || ''}', '${video.title.replace(/'/g, "\\'")}')">
            ${video.thumbnail ? 
              `<img src="${video.thumbnail}" alt="${video.title}">` : 
              `<div style="width:100%;height:100%;background:linear-gradient(135deg,#0a2538,#0f2f44);display:flex;align-items:center;justify-content:center;">
                 <i class="fas fa-play-circle" style="font-size: 4rem; color: #ffd966;"></i>
               </div>`
            }
            <div class="play-icon-overlay">
              <i class="fas fa-play"></i>
            </div>
          </div>
          <div class="video-info">
            <h3>${video.title}</h3>
            <p><i class="fas fa-clock"></i> ${video.duration}</p>
            ${video.description ? `<p style="font-size:0.9rem;">${video.description}</p>` : ''}
            <button class="watch-btn" onclick="openVideoModal('${video.videoUrl || ''}', '${video.title.replace(/'/g, "\\'")}')">
              <i class="fas fa-play"></i> مشاهدة الدرس
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ============================================
// تشغيل الفيديو في نافذة منبثقة
// ============================================

function openVideoModal(videoUrl, title) {
  if (!videoUrl) {
    alert(`فيديو "${title}" سيتم إضافته قريباً. يمكنك إضافة الرابط في ملف script.js`);
    return;
  }
  
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  
  if (!modal || !iframe) return;
  
  // دعم روابط YouTube
  let embedUrl = videoUrl;
  if (videoUrl.includes('youtube.com/watch?v=')) {
    const videoId = videoUrl.split('v=')[1].split('&')[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (videoUrl.includes('youtu.be/')) {
    const videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }
  
  iframe.src = embedUrl;
  modal.classList.add('active');
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  if (modal) modal.classList.remove('active');
  if (iframe) iframe.src = '';
}

// ============================================
// إعداد الصور - ضع مسارات صورك هنا
// ============================================

function setupImages() {
  // ضع مسار صورة الأستاذ خالد مطر هنا
  const teacherPhoto = document.getElementById('teacherPhoto');
  if (teacherPhoto && !teacherPhoto.src.includes('placeholder')) {
    // إذا كانت الصورة لم يتم تعيينها بعد، يمكنك تعيينها هنا
    // teacherPhoto.src = "images/teacher.jpg";
  }
  
  // ضع مسار صورة بطاقة الفيديوهات هنا
  const videosCardImage = document.getElementById('videosCardImage');
  if (videosCardImage && !videosCardImage.src.includes('placeholder')) {
    // videosCardImage.src = "images/videos-card.jpg";
  }
}

// ============================================
// القائمة الجانبية للجوال
// ============================================

function openMobileMenu() {
  const sidebar = document.getElementById('mobileSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.add('open');
  if (overlay) overlay.classList.add('active');
}

function closeMobileMenu() {
  const sidebar = document.getElementById('mobileSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}

// ============================================
// زر الصعود للأعلى
// ============================================

function setupScrollTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// إغلاق المودال بالضغط على ESC
// ============================================

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeVideoModal();
  }
});

// ============================================
// تهيئة الأحداث عند تحميل الصفحة
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  setupImages();
  setupScrollTop();
  
  // إعداد أحداث القائمة الجانبية
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const closeSidebarBtn = document.getElementById('closeSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  
  if (mobileBtn) mobileBtn.addEventListener('click', openMobileMenu);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeMobileMenu);
  if (overlay) overlay.addEventListener('click', closeMobileMenu);
  
  // عرض الصفحة الرئيسية افتراضياً
  showHomePage();
});

// ============================================
// أمثلة على كيفية إضافة فيديوهات (يمكنك استخدام هذه الدوال)
// ============================================

/*
// مثال لإضافة فيديو للصف الأول الثانوي:
addFirstYearVideo({
  title: "حضارة مصر القديمة - الدولة القديمة",
  duration: "35 دقيقة",
  videoUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
  thumbnail: "images/egypt-old-kingdom.jpg",
  description: "شرح مفصل لعصر بناة الأهرام وأهم إنجازات الدولة القديمة"
});

// مثال لإضافة فيديو للصف الثاني الثانوي:
addSecondYearVideo({
  title: "الدولة الأموية - النشأة والتوسع",
  duration: "40 دقيقة",
  videoUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
  thumbnail: "images/umayyad.jpg",
  description: "نشأة الدولة الأموية وأهم خلفائها وفتوحاتها"
});

// مثال لإضافة فيديو للصف الثالث الثانوي:
addThirdYearVideo({
  title: "ثورة 23 يوليو 1952",
  duration: "45 دقيقة",
  videoUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
  thumbnail: "images/july-revolution.jpg",
  description: "أسباب الثورة وقادة التنظيم السري وإنجازات الثورة"
});
*/
