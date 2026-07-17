let operator_index = "";


function dropprofile() {
    var dropdown = document.getElementById("dropdown");
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!dropdown.classList.contains("visible")) {
        dropdown.classList.add("visible");
        dropdown.style.transform = isMobile 
            ? "translate(-20px, 68px) scale(1)" 
            : "translate(-205px, 68px) scale(1)";
        dropdown.style.visibility = "visible";
        dropdown.style.opacity = "1";
    } else {
        hideDropdown();
    }
}

function hideDropdown() {
    var dropdown = document.getElementById("dropdown");
    dropdown.classList.remove("visible");
    dropdown.style.opacity = "0";
    dropdown.style.transform = "scale(0.8)";

    setTimeout(function () {
        dropdown.style.visibility = "hidden";
    }, 150);
}

// 🔥 Ẩn dropdown nếu click ra ngoài
document.addEventListener("click", function(event) {
    var dropdown = document.getElementById("dropdown");
    var trigger = document.getElementById("profile_btn"); // nút bấm mở dropdown

    // Nếu dropdown đang mở
    if (dropdown.classList.contains("visible")) {

        // Nếu click KHÔNG nằm trong dropdown và KHÔNG phải nút bấm mở
        if (!dropdown.contains(event.target) && event.target !== trigger) {
            hideDropdown();
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper("#bannerSlider", {
        loop: true,
        autoplay: { delay: 3000 },
        effect: "slide"
    });

    function updateBlurBG() {
        const slide = swiper.slides[swiper.activeIndex];
        if (!slide) return;

        const img = slide.querySelector(".slider-img");
        if (!img) return;

        const src = img.getAttribute("data-src") || img.getAttribute("src");

        if (src) {
            document.getElementById("bgBlur").style.backgroundImage =
                `url('${src}')`;
        }
    }

    // Lần đầu chạy
    setTimeout(updateBlurBG, 300);

    // Khi đổi slide
    swiper.on("slideChange", updateBlurBG);
});
function Tab(tabId) {
    // Lấy tất cả các tabcontent
    var tabContents = document.querySelectorAll('.tabcontent');

    // Biến để kiểm tra xem có tab nào có cùng id không
    var hasDuplicateTabId = false;

    // Lặp qua từng tabcontent để ẩn hoặc hiển thị tab được chọn
    tabContents.forEach(function(content) {
        // Lấy id của tabcontent
        var contentId = content.getAttribute('id');

        // Kiểm tra nếu id của tabcontent trùng với tab được chọn
        if (contentId === tabId) {
            // Hiển thị tabcontent tương ứng và thêm class 'active'
            content.removeAttribute('hidden');
            content.classList.add('active');
        } else if (contentId === tabId) {
            // Nếu có tab khác có cùng id, đặt biến hasDuplicateTabId thành true
            hasDuplicateTabId = true;
        } else {
            // Ẩn đi các tabcontent khác và loại bỏ class 'active'
            content.setAttribute('hidden', 'true');
            content.classList.remove('active');
        }
    });

    // Nếu có tab nào có cùng id, loại bỏ thuộc tính hidden cho nó
    if (hasDuplicateTabId) {
        var tabContent = document.getElementById(tabId);
        if (tabContent) {
            tabContent.removeAttribute('hidden');
        }
    }

    // Lấy tất cả các nút tab
    var tabButtons = document.querySelectorAll('.tablinks');

    // Lặp qua từng nút tab để cập nhật trạng thái
    tabButtons.forEach(function(button) {
        // Lấy id của tab được nhấn
        var tabIdClicked = button.getAttribute('onclick').split("'")[1];

        // Xác định trạng thái mới của nút tab được nhấn
        var isSelected = tabIdClicked === tabId;

        // Cập nhật thuộc tính aria-selected và tabindex của nút tab
        button.setAttribute('aria-selected', isSelected);
        button.setAttribute('tabindex', isSelected ? '0' : '-1');
    });
}

function selectOperatorIndex(button) {
    // Gán nhà mạng vào biến global
    operator_index = button.value; // ← QUAN TRỌNG

    // Reset tất cả button
    var buttons = document.querySelectorAll('.ws-border-red-index-500');
    buttons.forEach(function(btn) {
        btn.classList.remove('ws-border-red-index-500');
        var img = btn.querySelector('img');
        if (img) img.style.filter = 'grayscale(100%)';
    });

    // Active button đang chọn
    button.classList.remove('ws-border-gray-300');
    button.classList.add('ws-border-red-index-500');

    // Bỏ grayscale ảnh được chọn
    var img = button.querySelector('img');
    if (img) img.style.filter = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    $("#napthecao").on("click", function() {
        if (operator_index === "") {
            Toast("error", "Vui lòng chọn loại thẻ!");
            return;
        }
        $('#napthecao').html('<i class="fa fa-spinner fa-spin-custom" style="margin-right: 10px;"></i> Đang xử lý').prop('disabled',
            true);
        $.ajax({
            url: "/ajax/invoice",
            method: "POST",
            dataType: "JSON",
            data: {
                type: 'deposit_card',
                loaithe: operator_index,
                menhgia: $("#menhgia_index").val(),
                seri: $("#seri_index").val(),
                pin: $("#pin_index").val(),
                csrf_token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            success: function(response) {
                if (response.status == 'success') {
                    Toast(response.status, response.msg);
                    setTimeout(function() {
                        window.location = '/';
                    }, 1000);
                } else {
                    Toast(response.status, response.msg)
                }
                $('#napthecao').html(
                        'Nạp Thẻ Ngay')
                    .prop('disabled', false);
            }
        });
    });
});

// Thông Báo
function Toast(status, msg) {
    const icon = status === 'error' ? 'el-notification--error' : 'el-notification--success';
    const iconsvg = status === 'error' ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"></path></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"></path></svg>';
    const notificationHeight = 100; // Chiều cao ước lượng của mỗi thông báo, bao gồm cả padding và margin
    const existingNotifications = $('.el-notification').length;
    const topPosition = 16 + existingNotifications * (notificationHeight + 16);

    const notification = `
    <div class="el-notification right" role="alert" style="top: ${topPosition}px; z-index: 2013;">
        <i class="el-icon el-notification__icon ${icon}">
            ${iconsvg}
        </i>
        <div class="el-notification__group">
            <h2 class="el-notification__title">Thông báo</h2>
            <div class="el-notification__content">
                <p>${msg}</p>
            </div>
            <i class="el-icon el-notification__closeBtn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path>
                </svg>
            </i>
        </div>
    </div>`;
    const $notification = $(notification);
    $('body').append($notification);
    $notification.addClass('el-notification-fade-enter');
    requestAnimationFrame(() => {
        $notification.addClass('el-notification-fade-enter-active el-notification-fade-enter-to');
    });
    $notification.find('.el-notification__closeBtn').on('click', function () {
        closeNotification($notification);
    });
    setTimeout(function () {
        closeNotification($notification);
    }, 5000);
}
function closeNotification($notification) {
    $notification.addClass('el-notification-fade-leave');
    requestAnimationFrame(() => {
        $notification.addClass('el-notification-fade-leave-active');
    });
    setTimeout(() => {
        $notification.remove();
        updateNotificationsPosition();
    }, 300);
}
function updateNotificationsPosition() {
    const notifications = $('.el-notification');
    notifications.each((index, notification) => {
        const topPosition = 16 + index * (100 + 16);
        $(notification).stop(true).animate({ top: topPosition + 'px' }, 300);  // Sử dụng animate để tạo hiệu ứng đẩy lên
    });
}
function adjustNotifications() {
    $('.el-notification').each(function(index) {
        const newTopPosition = 16 + index * 116; // Cập nhật vị trí top của mỗi thông báo
        $(this).css('top', newTopPosition + 'px');
    });
}
const ModalManager = {
    cache: {},
    loading: false,

    open(type) {
        if (this.loading) return;
        const menuProfile = document.getElementById("menuProfile");
        if (menuProfile && !menuProfile.classList.contains("tw-hidden")) {
            menuProfile.style.transform = "translateX(-100%)";
            menuProfile.style.opacity = "0";

            setTimeout(() => {
                menuProfile.classList.add("tw-hidden");
            }, 300);
        }

        if (this.cache[type]) {
            this.render(this.cache[type]);
            return;
        }

        this.loading = true;

        $.ajax({
            url: "/ajax/modal/action",
            type: "POST",
            dataType: "json",
            data: {
                type: type,
                csrf_token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            success: (response) => {

                if (response.status !== "success") {
                    Toast(response.status, response.msg);
                    return;
                }

                this.cache[type] = {
                    html: response.html,
                    id: response.modal_id
                };

                this.render(this.cache[type]);
            },
            error: () => {
                Toast("error", "Không thể kết nối server");
            },
            complete: () => {
                this.loading = false;
            }
        });
    },

    render(data) {
        $(".modal").remove();
        $("#modal-container").html(data.html);

        $("#" + data.id).modal({
            backdrop: "static",
            keyboard: false
        }).modal("show");
    }
};
function togglePassword(inputId, button) {
    var passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        button.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    } else {
        passwordInput.type = "password";
        button.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('#flashSaleTabs');
    if (!wrapper) return;

    const tabs = wrapper.querySelectorAll('[data-target]');
    const contents = wrapper.querySelectorAll('.unique-tab-content');

    function resetTabs() {
        tabs.forEach(tab => {
            tab.classList.remove('ws-bg-white');
            const label = tab.querySelector('label');
            const p = tab.querySelector('p');

            if (label) {
                label.classList.remove('ws-text-red-600');
                label.classList.add('ws-text-white');
            }
            if (p) {
                p.classList.remove('ws-text-zinc-800');
                p.classList.add('ws-text-white');
            }
        });
        contents.forEach(content => content.classList.remove('active'));
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            resetTabs();

            const target = wrapper.querySelector(this.dataset.target);
            if (target) target.classList.add('active');

            this.classList.add('ws-bg-white');
            const label = this.querySelector('label');
            const p = this.querySelector('p');

            if (label) {
                label.classList.remove('ws-text-white');
                label.classList.add('ws-text-red-600');
            }
            if (p) {
                p.classList.remove('ws-text-white');
                p.classList.add('ws-text-zinc-800');
            }
        });
    });

    // Default: tab đang active
    let defaultContent = wrapper.querySelector('.unique-tab-content.active');
    let defaultTab = defaultContent 
        ? wrapper.querySelector(`[data-target="#${defaultContent.id}"]`) 
        : tabs[0];

    if (defaultTab) {
        resetTabs();

        const target = wrapper.querySelector(defaultTab.dataset.target);
        if (target) target.classList.add('active');

        defaultTab.classList.add('ws-bg-white');
        const label = defaultTab.querySelector('label');
        const p = defaultTab.querySelector('p');

        if (label) {
            label.classList.remove('ws-text-white');
            label.classList.add('ws-text-red-600');
        }
        if (p) {
            p.classList.remove('ws-text-white');
            p.classList.add('ws-text-zinc-800');
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    var sliders = document.querySelectorAll('.myswiper2');
    sliders.forEach(function(sliderElement) {
        var slidesCount = sliderElement.querySelectorAll('.swiper-slide').length;

        if (slidesCount === 0) return;

        new Swiper(sliderElement, {
            autoHeight: true,
            loop: slidesCount > 5, 
            
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            
            slidesPerView: 5,
            spaceBetween: 10,
            
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 5
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 8
                },
                640: {
                    slidesPerView: 5,
                    spaceBetween: 10
                }
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    const loadingIndicator = document.getElementById('loading-indicator');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));

            // Show loading indicator
            loadingIndicator.style.display = 'block';

            // Add active class to the clicked tab
            tab.classList.add('active');

            // Simulate content loading with a timeout
            setTimeout(() => {
                // Hide loading indicator
                loadingIndicator.style.display = 'none';

                // Show the corresponding content
                const contentId = 'content-' + tab.id.split('-')[1];
                document.getElementById(contentId).classList.add('active');
            }, 300); // Simulate a 1-second loading time
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Đếm số lượng slide
    var totalSlides = document.querySelectorAll('.myswiper1 .swiper-slide').length;

    var mySwiper = new Swiper('.myswiper1', {
        loop: totalSlides > 1, // chỉ bật loop khi có hơn 1 slide
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
});
document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-dismiss="modal"]');
    if (!btn) return;

    e.preventDefault();

    const container = document.getElementById('modal-container');
    if (container) {
        container.innerHTML = '';
    }
});
document.querySelectorAll('.acc-slider').forEach(function(el){
    new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: el.querySelector('.swiper-pagination'),
            clickable: true
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    new Swiper('.operator-slider', {
        slidesPerView: 3,
        spaceBetween: 8,
        loop: false,
        allowTouchMove: true,
        autoplay: {
            delay: 3000,           // thời gian đổi (ms)
            disableOnInteraction: false // chạm vẫn tiếp tục chạy
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    var sidebarOpen = false;

    var toggle = document.getElementById('menu_sidebar_nav_tapvietcode');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
        var sidebar = document.getElementById('menu_sidebar');
        var hrMenu = document.getElementById('menu_hr');
        var sidebarIcon = document.getElementById('menu_sidebar_icon');
        if (!sidebarOpen) {
            sidebar.style.display = 'block';
            hrMenu.style.display = 'block';
            sidebarIcon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
            sidebarOpen = true;
        } else {
            sidebar.style.display = 'none';
            hrMenu.style.display = 'none';
            sidebarIcon.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
            sidebarOpen = false;
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {

    const btnOpen  = document.getElementById("call-navigation");
    const btnClose = document.getElementById("menuHide");
    const menu     = document.getElementById("menuProfile");

    if (!btnOpen || !menu) return;

    // MỞ MENU
    btnOpen.addEventListener("click", function (e) {
        e.preventDefault();

        menu.classList.remove("tw-hidden"); // hiện để animate
        requestAnimationFrame(() => {
            menu.style.transform = "translateX(0)";
            menu.style.opacity = "1";
        });
    });

    // ĐÓNG MENU
    if (btnClose) {
        btnClose.addEventListener("click", function (e) {
            e.preventDefault();

            menu.style.transform = "translateX(-100%)";
            menu.style.opacity = "0";

            // chờ animation xong mới hidden
            setTimeout(() => {
                menu.classList.add("tw-hidden");
            }, 300);
        });
    }
});

function copy(data){
    navigator.clipboard.writeText(data).then(function() {});
}
