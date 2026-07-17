;(function ($) {
	'use strict';

	let countDown = function (elm, date) {
		let endTime = (Date.parse(date) / 1000);

		let now = new Date();
		now = (Date.parse(now) / 1000);

		let timeLeft = endTime - now;

		let days = Math.floor(timeLeft / 86400);
		let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
		let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

		if (hours < "10") {
			hours = "0" + hours;
		}
		if (minutes < "10") {
			minutes = "0" + minutes;
		}
		if (seconds < "10") {
			seconds = "0" + seconds;
		}

		elm.find(".event-countdown_days").html(days);
		elm.find(".event-countdown_hours").html(hours);
		elm.find(".event-countdown_minutes").html(minutes);
		elm.find(".event-countdown_seconds").html(seconds);
	}

	let arrNumbers = [];
	let dropdownType = function () {
		// Xử lý dropdown chọn loại vé
		if ($('.handleDropdownType').length) {
			$('.handleDropdownType').on('click', '.dropdown-list_item', function () {
				let elm_event = $(this), elm_dropdown = elm_event.closest('.handleDropdownType'),
					elm_item_dropdown = elm_dropdown.find('.dropdown-list_item'),
					elm_item_preview = elm_dropdown.find('.dropdown-toggle span');

				if (elm_event.hasClass('active')) {
					return false;
				} else {
					elm_item_dropdown.removeClass('active');
					elm_event.addClass('active');
					elm_item_preview.text(elm_event.text());

					let elm_frm = elm_event.closest('form'),
						elm_frm_id = elm_frm.attr('id'),
						elm_frm__box = elm_frm.find('.random-box'),
						elm_ball = parseInt(elm_event.attr('data-ball'));
					if (!elm_ball.isNaN) {
						// Reset active bóng trong modal và set số bóng cần phải chọn trong mỗi vé modal
						$(`.modal-ticket[data-form="#${elm_frm_id}"]`).attr('data-length', elm_ball);
						$(`.modal-ticket[data-form="#${elm_frm_id}"]`).find('.ticket-popup_numbers > span').removeClass('active');

						elm_frm__box.map(function () {
							let elm_this = $(this), elm_item__key = elm_this.attr('data-key'),
								elm_item__list = elm_this.find('.random-list'), htmlRender = '';

							elm_this.find('.random-event').removeClass('active');
							let elm_type = $(".form-vietlott").attr('data-type');
							if (elm_type === "v-3d"){
								elm_item__list = elm_this.find('.list-max3d'), htmlRender = '';
								htmlRender += renderHTMLBall3D(elm_item__key,elm_ball);
							} else {
								for (let i = 0; i < elm_ball; i++) {
									htmlRender += renderHTMLBall(elm_item__key);
								}
							}


							elm_item__list.html(htmlRender);
						});

						arrNumbers = [];

						elm_frm.find('.unit-price').html(0 + '&nbsp;<span>vnđ</span>');
						let btnQuick = $(elm_frm.find('.random-event_quick'));
						if (btnQuick.hasClass('active')) {
							btnQuick.removeClass('active');
							btnQuick.text('Chọn nhanh');
						}

						checkValidPopup($(`.modal-ticket[data-form="#${elm_frm_id}"]`), '', false)
					} else {
						console.log('Có lỗi xảy ra, vui lòng thử lại!');
					}
				}
			});
		}
	}

	const renderHTMLBall = function (key) {
		// render số bóng được chọn từ loại vé: thường, bao 5, bao 7...
		return `<span class="random-circle random-number">
					<span class="random-number_preview"></span>
					<input type="hidden" class="random-number_value" name="series[${key}][]">
				</span>`
	}
	const renderHTMLBall3D = function (key,ball) {
		// render số bóng được chọn từ loại vé: thường, bao 5, bao 7...
		var html = "";
		for (var i = 1;i <= ball;i++){
			html += ` <div class="random-list d-flex align-items-center"><span class="random-circle random-number">
					<span class="random-number_preview"></span>
					<input type="hidden" class="random-number_value" name="series[${key}][${i}][]">
				</span>
				<span class="random-circle random-number">
					<span class="random-number_preview"></span>
					<input type="hidden" class="random-number_value" name="series[${key}][${i}][]">
				</span>
				<span class="random-circle random-number">
					<span class="random-number_preview"></span>
					<input type="hidden" class="random-number_value" name="series[${key}][${i}][]">
				</span></div>`
		}
		return html;
	}
	let arrTime = [];

	let initArrTime = function () {
		if ($('.form-vietlott').length && $('.form-vietlott .handleDropdownTime').length) {
			$('.form-vietlott').each(function () {
				let elm_frm_id = $(this).attr('id'), elm_frm_dropdownTime = $(this).find('.handleDropdownTime'),
					elm_active = elm_frm_dropdownTime.find('.dropdown-list_item.active');

				arrTime[elm_frm_id] = [];
				elm_active.each(function () {
					arrTime[elm_frm_id].push($(this).attr('data-time'));
				});

				elm_frm_dropdownTime.on('show.bs.dropdown', function () {
					elm_frm_dropdownTime.find('.dropdown-list_item').removeClass('active');
					arrTime[elm_frm_id].map(function (value) {
						elm_frm_dropdownTime.find(`.dropdown-list_item[data-time="${value}"`).addClass('active');
					})
				});
			});
		}
	}


	let dropdownTime = function () {
		// Xử lý dropdown chọn kỳ quay tham gia
		if ($('.handleDropdownTime').length) {
			$('.handleDropdownTime').on('click', '.dropdown-list_item', function (e) {
				e.stopPropagation();
				let elm_event = $(this);

				if (elm_event.hasClass('active')) {
					if (elm_event.closest('.handleDropdownTime').find('.dropdown-list_item.active').length == 1) {
						return false;
					}
					elm_event.removeClass('active');
				} else {
					elm_event.addClass('active');
				}
			});

			$('.handleDropdownTime').on('click', '.handleDropdownClose', function () {
				let elm_event = $(this), elm_dropdown = elm_event.closest('.handleDropdownTime'),
					elm_active = elm_dropdown.find('.dropdown-list_item.active'),
					elm_item_preview = elm_dropdown.find('.dropdown-toggle span'),
					elm_frm_id = elm_event.closest('form').attr('id');

				if (elm_active.length === 1) {
					elm_item_preview.text(elm_active.text());
				} else {
					elm_item_preview.text(`Đã chọn ${elm_active.length} kỳ`);
				}

				arrTime[elm_frm_id] = [];
				elm_active.each(function () {
					arrTime[elm_frm_id].push($(this).attr('data-time'));
				});

				handleFillTime(elm_dropdown);
				handlePrice(elm_event);
			});
		}
	}

	let handleFillTime = function (elm) {
		// Fill vào input kỳ: nối chuỗi id kỳ quay tham gia
		let arrValueTime = [], elm_active = elm.find('.dropdown-list_item.active');
		for (let i = 0; i < elm_active.length; i++) {
			arrValueTime.push($(elm_active[i]).attr('data-time'));
		}

		arrValueTime = arrValueTime.join('-');
		elm.find('.random-time').val(arrValueTime);
	}

	let formatPrice = function (price, format = '.') {
		let arrayPrice = [];
		var x = price;
		x = x.replace(/[^0-9]/g, '');

		let $j = 0;
		for (let $i = x.length - 1; $i >= 0; $i--) {

			if ($j === 3) {
				arrayPrice.push(format);
				arrayPrice.push(x[$i]);
				$j = 0;
			} else {
				arrayPrice.push(x[$i]);
			}
			$j++;
		}
		let temp = '';
		for (let $i = arrayPrice.length - 1; $i >= 0; $i--) {
			temp = temp + arrayPrice[$i];
		}

		return temp;
	}

	let handlePrice = function (elm) {
		// Xử lý và render giá tiền
		let elm_frm = elm.closest('form'), elm_frm_type = elm_frm.attr('data-type'),
			ticket_length = elm_frm.find('.random-event.active').length, elm_price = elm_frm.find('.unit-price'),
			elm_input_price = elm_frm.find('input[name="unit-price"]'),
			number_time = elm_frm.find('.handleDropdownTime .dropdown-list_item.active').length, return_price = '';

		if (elm_frm_type != 'undefined') {
			if (elm_frm_type === 'v-6') {
				let unit_price = elm_frm.find('.handleDropdownType .dropdown-list_item.active').attr('data-price');
				return_price = (ticket_length * unit_price * number_time).toString();
			} else if (elm_frm_type === 'v-3d') {
				let unit_price = 0;
				elm_frm.find('.random-event.active').each(function () {
					unit_price += parseInt($(this).parent().find('.random-price_event').attr('data-value'));
				})
				return_price = (unit_price * number_time).toString();
			} else if (elm_frm_type === 'v-3d-pro') {
				let unit_price = 0;
				elm_frm.find('.random-event.active').each(function () {
					unit_price += parseInt($(this).parent().find('.random-price_event').attr('data-value'));
				})
				return_price = (unit_price * number_time).toString();
			}
		} else {
			console.log('Có lỗi xảy ra, vui lòng thử lại!');
			return false;
		}

		elm_price.html(formatPrice(return_price) + '&nbsp;<span>vnđ</span>');
		elm_input_price.val(return_price);
	};

	/***
	 * elm: element click
	 * max_rangeNumber: số lượng bóng (45, 55...)
	 * type: create - 1, delete - 0;
	 */


	let handleRandom = function (length, max) {
		// Random n số bóng
		let arrNumbersTemp = [];
		// Get được mảng number bao gồm bộ số từ 1 -> tối đa max_rangeNumber
		for (let i = 0; i < parseInt(max); i++) {
			arrNumbersTemp.push({
				number: i + 1, time: 0
			});
		}

		// Chạy n lần để tìm ra các con số xuất hiện nhiều lần
		for (let i = 0; i < 100000; i++) {
			let number = Math.floor(Math.random() * parseInt(max)) + 1;
			arrNumbersTemp[number - 1].time++;
		}

		// Sắp xếp lại mảng theo thứ tự xuất hiện nhiều lần đến ít
		arrNumbersTemp.sort(function (a, b) {
			return b.time - a.time
		});

		let arrTicket = [];

		// Bỏ vào mảng Ticket số n phần tử (n: loại vé (thường, bao 5,...))
		for (let i = 0; i < length; i++) {
			arrTicket.push(((arrNumbersTemp[i].number < 10) ? '0' : '') + arrNumbersTemp[i].number)
		}

		// Sắp xếp lại mảng theo giá trị số từ nhỏ đến lớn
		arrTicket.sort(function (a, b) {
			return a - b
		});

		return arrTicket;
	}

	let handleRandom3D = function () {
		// Random n số bóng
		let arrNumbersTemp = [];
		// Get được mảng number bao gồm bộ số từ 1 -> tối đa max_rangeNumber

		for (let i = 0; i < 10; i++) {
			arrNumbersTemp.push({
				number: i, time: 0
			});
		}

		// Chạy n lần để tìm ra các con số xuất hiện nhiều lần
		for (let i = 0; i < 100000; i++) {
			let number = Math.floor(Math.random() * 10) + 1;
			arrNumbersTemp[number - 1].time++;
		}

		// Sắp xếp lại mảng theo thứ tự xuất hiện nhiều lần đến ít
		arrNumbersTemp.sort(function (a, b) {
			return b.time - a.time
		});

		return arrNumbersTemp[0].number;
	}

	let handleRenderRandom = function (elm, max_rangeNumber, isModal = false, type = 1) {
		// Render số ra view và fill vào input
		let elmBox = elm.closest('.random-box'), elmBox_key = elmBox.attr('data-key'),
			childLength_elmBox = elmBox.find('.random-number'), elm_frm_type = elm.closest('form').attr('data-type'),
			elm_frm_id = elm.closest('form').attr('id'), elmBox_list = elmBox.find('.random-list .random-number');
		if (type === 1) {

			if (elm_frm_type === 'v-3d') {

				if (elmBox_list.length) {
					let arrTicket = [];
					for (let i = 0; i < childLength_elmBox.length; i++) {
						let ticketValue = handleRandom3D();
						arrTicket.push(ticketValue);
					}
					elmBox_list.each(function (i) {
						$(this).find('span').text(arrTicket[i]);
						$(this).find('.random-number_value').val(arrTicket[i]);
					});

					$(`.modal-ticket[data-form="#${elm_frm_id}"] .ticket-popup[data-key=${elmBox_key}] .ticket-popup_numbers`).each(function (i) {
						let ticketNumber = $(this).find('.ticket-choose_number');
						ticketNumber.each(function () {
							if ($(this).text() == arrTicket[i]) {
								$(this).addClass('active');
							}
						})
					});

					arrNumbers[elmBox_key] = arrTicket;

					if (isModal) {
						$(childLength_elmBox[0]).trigger('click');
					}
				} else {
					return false;
				}
			} else if (elm_frm_type === 'v-3d-pro') {
				if (elmBox_list.length) {
					let arrTicket = [];
					for (let i = 0; i < 6; i++) {
						let ticketValue = handleRandom3D();
						arrTicket.push(ticketValue);
					}

					elmBox_list.each(function (i) {
						$(this).find('span').text(arrTicket[i]);
						$(this).find('.random-number_value').val(arrTicket[i]);
					});

					$(`.modal-ticket[data-form="#${elm_frm_id}"] .ticket-popup[data-key=${elmBox_key}] .ticket-popup_numbers`).each(function (i) {
						let ticketNumber = $(this).find('.ticket-choose_number');
						ticketNumber.each(function () {
							if ($(this).text() == arrTicket[i]) {
								$(this).addClass('active');
							}
						})
					});

					arrNumbers[elmBox_key] = arrTicket;

					if (isModal) {
						$(childLength_elmBox[0]).trigger('click');
					}
				} else {
					return false;
				}
			} else {
				let arrTicket = handleRandom(childLength_elmBox.length, max_rangeNumber);
				// Render ra view
				for (let i = 0; i < childLength_elmBox.length; i++) {
					$(childLength_elmBox[i]).find('.random-number_preview').text(arrTicket[i]);
					$(childLength_elmBox[i]).find('.random-number_value').val(arrTicket[i]);

					$(`.modal-ticket[data-form="#${elm_frm_id}"] .ticket-popup[data-key=${elmBox_key}] .ticket-popup_numbers`).each(function () {
						let ticketNumber = $(this).find('.ticket-choose_number');
						ticketNumber.each(function () {
							if ($(this).text() === arrTicket[i]) {
								$(this).addClass('active');
							}
						})
					});
				}

				if (isModal) {
					$(childLength_elmBox[0]).trigger('click');
				}

				arrNumbers[elmBox_key] = arrTicket;
			}

			checkValidPopup($(`.modal-ticket[data-form="#${elm_frm_id}"]`), elmBox_key, true);
		} else {
			if (!isModal) {
				elmBox.find('.random-number_preview').text('');
				elmBox.find('.random-number_value').val('');
			}

			arrNumbers[elmBox_key] = [];
			let btnQuick = $(elmBox.closest('form').find('.random-event_quick'));
			if (btnQuick.hasClass('active')) {
				btnQuick.removeClass('active');
                btnQuick.text('Chọn nhanh');
			}

			$(`.modal-ticket[data-form="#${elm_frm_id}"] .ticket-popup[data-key=${elmBox_key}] .ticket-popup_numbers`).each(function (i) {
				let ticketNumber = $(this).find('.ticket-choose_number');
				ticketNumber.each(function () {
					if ($(this).hasClass('active')) {
						$(this).removeClass('active');
					}
				})
			});

			checkValidPopup($(`.modal-ticket[data-form="#${elm_frm_id}"]`), elmBox_key, false);
		}
		if (!isModal) {
			elm.toggleClass('active');
		} else {
			elm.addClass('active');
		}
		handlePrice(elm);
	}

	let handleRandomNumber = function (elm, max_rangeNumber) {
		// Xử lý random khi click vào button chọn của từng dãy
		if (elm.length) {
			elm.on('click', '.random-event', function () {

				handleRenderRandom($(this), max_rangeNumber, false, (!$(this).hasClass('active') ? 1 : 0));

				let btnQuick = $(elm.find('.random-event_quick')), getRowActive = $(elm.find('.random-event.active'));
				if (btnQuick.hasClass('active') === false) {
					if (getRowActive.length === 6) {
						btnQuick.addClass('active');
						btnQuick.text('Hủy');
					}
				}
			});

			elm.on('click', '.random-event_quick', function (e) {

				let btnQuick = $(elm.find('.random-event_quick')), randomEvent = $(elm.find('.random-event')),
					getRowNoActive = $(elm.find('.random-event:not(.active)'));
				if (btnQuick.hasClass('active') === false) {
					if (getRowNoActive.length > 0) {
						$(`.modal-ticket[data-form="#${btnQuick.closest('form').attr('id')}"] .ticket-popup:not(.is-valid) .ticket-random`).trigger('click');
					}
					btnQuick.addClass('active');
					btnQuick.text('Hủy');
				} else {
					randomEvent.trigger('click');
					btnQuick.removeClass('active');
                     btnQuick.html('<i class="fas fa-sync-alt"></i> Chọn nhanh');
				}
			});
		}
	}

	// let handleSubmitTicket = function (elm) {
	// 	// Submit form
	// 	elm.submit(function (e) {
	// 		console.log(elm.serializeArray());
	// 		return false;
	// 	});
	// }

	let elmTicketSlider;
	let ticketSlider = function () {
		if ($('#ticket-slider').length > 0) {
			elmTicketSlider = new Swiper('#ticket-slider .swiper', {
				loop: false, simulateTouch: true, speed: 250, spaceBetween: 15,
			});
		}
	}

	let handleCallTicketPopup = function (elm, elmModal) {
		// Gọi modal Ticket
		elm.on('click', '.random-number', function (event) {
			let elm_event = $(this), elm_box = elm_event.closest('.random-box'), idx_box = elm_box.attr('data-index'),
				key_box = elm_box.attr('data-key'), flag_active = false,
				elm_frm_type = $($(elmModal).attr('data-form')).attr('data-type');

			$(elmModal.find('.swiper-slide')[idx_box]).find('.ticket-popup_numbers > span').removeClass('active');

			elm_box.find('.random-number_value').each(function (index) {
				let val_item = parseInt($(this).val());
				let itemLoop = $(elmModal.find('.swiper-slide')[idx_box]).find('.ticket-popup_numbers > span');
				if (elm_frm_type === 'v-3d') {
					let ticket_popup_item = $(elmModal.find('.swiper-slide')[idx_box]).find('.ticket-popup_numbers--list .ticket-popup_numbers')[index];
					itemLoop = $(ticket_popup_item).find('span');

					let price_value = elm_box.find('.random-price_event').attr('data-value');
					$(elmModal.find('.swiper-slide')[idx_box]).find(`.ticket-popup_buttons > .ticket-popup_prices > .ticket-popup_prices--item`).removeClass('active');
					$(elmModal.find('.swiper-slide')[idx_box]).find(`.ticket-popup_buttons > .ticket-popup_prices > .ticket-popup_prices--item[data-value="${price_value}"]`).addClass('active');
				} else if (elm_frm_type === 'v-3d-pro') {
					let ticket_popup_item = $(elmModal.find('.swiper-slide')[idx_box]).find('.ticket-popup_numbers--list .ticket-popup_numbers')[index];
					itemLoop = $(ticket_popup_item).find('span');

					let price_value = elm_box.find('.random-price_event').attr('data-value');
					$(elmModal.find('.swiper-slide')[idx_box]).find(`.ticket-popup_buttons > .ticket-popup_prices > .ticket-popup_prices--item`).removeClass('active');
					$(elmModal.find('.swiper-slide')[idx_box]).find(`.ticket-popup_buttons > .ticket-popup_prices > .ticket-popup_prices--item[data-value="${price_value}"]`).addClass('active');
				}

				itemLoop.each(function () {
					let number = parseInt($(this).text());
					if (val_item === number) {
						$(this).addClass('active');
						flag_active = true;
						return false;
					} else {
						flag_active = false
					}
				});
			});

			if (flag_active === true) {
				checkValidPopup(elmModal, key_box, true);
			} else {
				checkValidPopup(elmModal, key_box, false);
			}
			handlePrice(elm_event);

			if (typeof (event.isTrigger) === 'undefined') {
				elmTicketSlider.slideTo(idx_box);
				elmModal.modal('show');
			}
		});
	}
	let isFirst = false;
	let handleRandomTicketPopup = function () {
		// Random ngẫu nhiên trên modal
		$(document).on('click', '.ticket-random', function () {
			let key = $(this).closest('.ticket-popup').find('.ticket-popup_header > .ticket-popup_seri').text().toLowerCase().trim(),
				frm = $(this).closest('.modal-ticket').attr('data-form'),
				max_rangeNumber = $(this).closest('.modal-ticket').attr('data-ball');

			handleRenderRandom($(frm).find(`.random-box[data-key=${key}]`).find('.random-event'), max_rangeNumber, true);
			let btnQuick = $($(frm).find('.random-event_quick')), getRowActive = $($(frm).find('.random-event.active'));
			if (btnQuick.hasClass('active') === false) {
				if (getRowActive.length === 6 && isFirst === false) {
					isFirst = true;
					btnQuick.addClass('active');
					btnQuick.text('Hủy');
				}
			}
		});
	}

	let handleOnlyBall = function (arrNumbers, key, frm) {
		let elm_frm_type = $(frm).attr('data-type'), elmBox_list = $(frm).find('.random-list .random-number');

		if (elm_frm_type === 'v-3d') {
			if (elmBox_list.length) {
				let ticket_numbers = $(`.modal-ticket[data-form="${frm}"] .ticket-popup[data-key="${key}"] .ticket-popup_numbers`);
				ticket_numbers.each(function (i) {
					if ($(this).find('.ticket-choose_number.active').length) {
						let valueBall = $(this).find('.ticket-choose_number.active').text();
						let childLength_elmBox = $(frm).find(`.random-box[data-key="${key}"]`).find('.random-number');
						$(childLength_elmBox[i]).find('.random-number_preview').text(valueBall);
						$(childLength_elmBox[i]).find('.random-number_value').val(valueBall);
					}
				});
			} else {
				return false;
			}
		} else if (elm_frm_type === 'v-3d-pro') {
			if (elmBox_list.length) {
				let ticket_numbers = $(`.modal-ticket[data-form="${frm}"] .ticket-popup[data-key="${key}"] .ticket-popup_numbers`);
				ticket_numbers.each(function (i) {
					if ($(this).find('.ticket-choose_number.active').length) {
						let valueBall = $(this).find('.ticket-choose_number.active').text();
						let childLength_elmBox = $(frm).find(`.random-box[data-key="${key}"]`).find('.random-number');
						$(childLength_elmBox[i]).find('.random-number_preview').text(valueBall);
						$(childLength_elmBox[i]).find('.random-number_value').val(valueBall);
					}
				});
			} else {
				return false;
			}
		} else {
			// X lý các số được chọn và show ra view - fill vào input
			arrNumbers[key].sort(function (a, b) {
				return a - b
			});

			let childLength_elmBox = $(frm).find(`.random-box[data-key="${key}"]`).find('.random-number');

			$(childLength_elmBox).find('.random-number_preview').text('');
			$(childLength_elmBox).find('.random-number_value').val('');

			for (let i = 0; i < arrNumbers[key].length; i++) {
				$(childLength_elmBox[i]).find('.random-number_preview').text(arrNumbers[key][i]);
				$(childLength_elmBox[i]).find('.random-number_value').val(arrNumbers[key][i]);
			}
		}

	}

	let handleChooseNumberTicketPopup = function () {
		// Chọn từng bóng trong modal
		$(document).on('click', '.ticket-choose_number', function () {
			let elm = $(this),
				key = elm.closest('.ticket-popup').find('.ticket-popup_header > .ticket-popup_seri').text().toLowerCase().trim(),
				frm = elm.closest('.modal-ticket').attr('data-form'), type = $(frm).attr('data-type'),
				lengthBall = elm.closest('.modal-ticket').attr('data-length');

			if (!arrNumbers.hasOwnProperty(key)) {
				arrNumbers[key] = [];
			}

			if (!elm.hasClass("active")) {
				if (arrNumbers[key].length < lengthBall) {
					if (type === 'v-3d' || type === 'v-3d-pro') {
						if (elm.closest('.ticket-popup_numbers').find('.ticket-choose_number.active').length) {
							return false;
						}
					}
					arrNumbers[key].push(elm.text());
					elm.addClass('active');
				} else {
					return false;
				}
			} else {
				if (type === 'v-3d' || type === 'v-3d-pro') {
					elm.removeClass('active');
					arrNumbers[key] = [];
					elm.closest('.ticket-popup_numbers--list').find('.ticket-popup_numbers').each(function (i) {
						if ($(this).find('.ticket-choose_number.active').length) {
							arrNumbers[key].push($(this).find('.ticket-choose_number.active').text());
						}
					});

					let index = elm.closest('.ticket-popup_numbers').attr('data-index');
					let listRandomBox = $(frm).find(`.random-box[data-key=${key}] .random-list .random-number`);
					$(listRandomBox[index]).find('.random-number_preview').text('');
					$(listRandomBox[index]).find('.random-number_value').val('');

				} else {
					arrNumbers[key] = arrNumbers[key].filter(item => item !== elm.text());
					console.log(arrNumbers);
					elm.removeClass('active');
				}
			}

			if (arrNumbers[key].length > 0) {
				if (arrNumbers[key].length == lengthBall) {
					checkValidPopup(elm.closest('.modal-ticket'), key, true)
				} else {
					checkValidPopup(elm.closest('.modal-ticket'), key, false)
				}
			} else {
				checkValidPopup(elm.closest('.modal-ticket'), key, false)
			}

			if (arrNumbers[key].length == lengthBall) {
				$(frm).find(`.random-box[data-key=${key}] .random-event`).addClass('active');
			} else {
				$(frm).find(`.random-box[data-key=${key}] .random-event`).removeClass('active');
			}

			handlePrice($(frm).find(`.random-box[data-key=${key}]`));
			handleOnlyBall(arrNumbers, key, frm);
		});
	}

	let handleClearTicketPopup = function () {
		// Clear bộ số đã chọn trong modal
		$(document).on('click', '.ticket-clear', function () {
			let ticket_key = $(this).closest('.ticket-popup').attr('data-key'),
				ticket_number = $(this).closest('.ticket-popup_body').find('.ticket-popup_numbers > span');

			if (ticket_number.hasClass('active')) {
				checkValidPopup($(this).closest('.modal-ticket'), ticket_key, false);

				ticket_number.removeClass('active');
				let key = $(this).closest('.ticket-popup').find('.ticket-popup_header > .ticket-popup_seri').text().toLowerCase().trim(),
					frm = $(this).closest('.modal-ticket').attr('data-form'),
					max_rangeNumber = $(this).closest('.modal-ticket').attr('data-ball'),
					type = !$(frm).find(`.random-box[data-key=${key}]`).find('.random-event').hasClass('active') ? 1 : 0;

				handleRenderRandom($(frm).find(`.random-box[data-key=${key}]`).find('.random-event'), max_rangeNumber, false, type);
			}
		});
	}

	let checkValidPopup = function (elm, key = '', isValid = true) {
		let ticketPopup = elm.find(`.ticket-popup`);
		if (key != '') {
			ticketPopup = elm.find(`.ticket-popup[data-key="${key}"]`);
		}
		// Kiểm tra hợp lệ của modal
		if (isValid === true) {
			ticketPopup.addClass("is-valid");
			ticketPopup.find('.ticket-popup_check').text("Hợp lệ");
		} else {
			ticketPopup.removeClass("is-valid");
			ticketPopup.find('.ticket-popup_check').text("Không hợp lệ");
		}
	}

	function handleCallPopupPrice(elm) {
		if (elm.length) {
			elm.on('click', '.random-price_event', function () {
				let value = $(this).attr('data-value'), key = $(this).closest('.random-box').attr('data-key');
				popupPrice(value, key)
			});
		}
	}

	let popupPrice = function (value, key) {
		$('#modalTicket-price .price-list_item').removeClass('active');
		$(`#modalTicket-price .price-list_item[data-value="${value}"]`).addClass('active');
		$('#modalTicket-price').attr('data-key', key).modal('show');
		handleChoosePriceItem();
		handleClosePopupPrice();
	}

	let handleChoosePriceItem = function () {
		$('#modalTicket-price').on('click', '.price-list_item', function (e) {
			let elm_event = $(this), elm_modal = elm_event.closest('.modal-price'),
				elm_item_price = elm_modal.find('.price-list_item');

			if (elm_event.hasClass('active')) {
				return false;
			} else {
				elm_item_price.removeClass('active');
				elm_event.addClass('active');

				elm_modal.find('.handlePriceClose').attr('data-key', elm_modal.attr('data-key'));
			}
		})
	}

	let handleClosePopupPrice = function () {
		$('#modalTicket-price').on('click', '.handlePriceClose', function (e) {
			let elm_event = $(this), elm_modal = elm_event.closest('.modal-price'),
				elm_active = elm_modal.find('.price-list_item.active'),
				elm_active_value = elm_active.attr('data-value'), elm_active_format = elm_active.attr('data-format'),
				frm = elm_modal.attr('data-form'), key = elm_event.attr('data-key'),
				frmRandom = $('#modalTicket-3dmax'),
				frmRandom_prices = frmRandom.find(`.swiper-slide .ticket-popup[data-key=${key}] .ticket-popup_prices`);

			if (elm_active.length == 1) {
				$(frm).find(`.random-box[data-key=${key}] .random-price_event`).attr('data-value', elm_active_value);
				$(frm).find(`.random-box[data-key=${key}] .random-price_event span`).text(elm_active_format);
                $(frm).find(`.random-box[data-key=${key}] .input_price`).val(elm_active_value);
				$('#modalTicket-price').modal('hide');
				if ($(frm).find(`.random-box[data-key=${key}] .random-event.active`).length) {
					handlePrice($(frm).find(`.random-box[data-key=${key}] .random-event.active`));
				}

				if (frmRandom_prices.length) {
					frmRandom_prices.find('.ticket-popup_prices--item').removeClass('active');
					frmRandom_prices.find(`.ticket-popup_prices--item[data-value="${elm_active_value}"]`).addClass('active');
				}
			} else {
				console.log('Có lỗi xảy ra, vui lòng thử lại!');
				return false;
			}
		});
	}

	let handlePriceTicket = function () {
		$(document).on('click', '.ticket-prices_event', function () {
			let elm = $(this), elm_ticket = elm.closest('.ticket-popup'), key = elm_ticket.attr('data-key'),
				frm = elm.closest('.modal-ticket').attr('data-form');

			if (elm.hasClass('active')) {
				return false;
			} else {
				let elm_active_value = elm.attr('data-value'), elm_active_format = elm.attr('data-format');

				elm_ticket.find('.ticket-prices_event').removeClass('active');
				elm.addClass('active');

				$(frm).find(`.random-box[data-key=${key}] .random-price_event`).attr('data-value', elm_active_value);
				$(frm).find(`.random-box[data-key=${key}] .random-price_event span`).text(elm_active_format);
                $(frm).find(`.random-box[data-key=${key}] .input_price`).val(elm_active_value);
				if ($(frm).find(`.random-box[data-key=${key}] .random-event.active`).length) {
					handlePrice($(frm).find(`.random-box[data-key=${key}] .random-event.active`));
				}
			}
		});
	}

	$(function () {
		initArrTime();

		// Vietlott 6-55
		handleRandomNumber($('#random-type_655'), 55);
		handleCallTicketPopup($('#random-type_655'), $('#modalTicket-655'));
		// handleSubmitTicket($('#random-type_655'));

		// Vietlott 6-45
		handleRandomNumber($('#random-type_645'), 45);
		handleCallTicketPopup($('#random-type_645'), $('#modalTicket-645'));
		// handleSubmitTicket($('#random-type_645'));

		// Vietlott 3D Max
		handleCallPopupPrice($('#random-type_3dmax'));
		handleRandomNumber($('#random-type_3dmax'), 10);
		handleCallTicketPopup($('#random-type_3dmax'), $('#modalTicket-3dmax'));
	//	handleSubmitTicket($('#random-type_3dmax'));


		// Vietlott 3D Pro
		handleCallPopupPrice($('#random-type_3dpro'));
		handleRandomNumber($('#random-type_3dpro'), 10);
		handleCallTicketPopup($('#random-type_3dpro'), $('#modalTicket-3dpro'));
		// handleSubmitTicket($('#random-type_3dpro'));

		// Dùng chung
		handleRandomTicketPopup();
		handleChooseNumberTicketPopup();
		handleClearTicketPopup();
		handlePriceTicket();


		if ($('.event-countdown').length) {
			$('.event-countdown').each(function () {
				let elm = $(this);
				setInterval(function () {
					countDown(elm, elm.attr('data-date'));
				}, 1000);
			});
		}

		dropdownType();
		dropdownTime();

		ticketSlider();
	});
})(jQuery);
