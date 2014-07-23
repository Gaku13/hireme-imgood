/* r-system */

/* vars */
var body = $('body'),
	wrp = $('#wrapper'),
	con = $('#container'),
	snv = $('div.sidebar-nav'),
	snvH = $('div.sidebar-nav').height(),
	gnv = $('#globalnav'),
	tl = $('#realtime-box'),
	mco = $('div.main-content'),
	mcoH = $('div.main-content').height(),
	note = $('div.notification'),
	bs = $('div.base-inner'),
	tr = $('#to-realtime'),
	pn = $('div.popup-nav'),
	aao = $('div.all-at-once'),
	winH,
	tempH,
	winO,
	scrollTo,
	scrollBox1;

// ローダーセット
$.fn.spin.presets.circle = {
	lines: 7,
	length: 3,
	width: 4,
	radius: 6
}
$.fn.spin.presets.tinyc = {
	lines: 7,
	length: 2,
	width: 3,
	radius: 4
}

if(Modernizr.mq('screen and (min-width:1441px)')) {
	body.addClass('large-window').removeClass('small-window');
}
else if(Modernizr.mq('screen and (max-width:1440px)')) {
	body.removeClass('large-window').addClass('small-window');
}



// sidebar toggle by window sizing
function doneResizing() {
	if(Modernizr.mq('screen and (min-width:1105px)')) {
		if($('body').hasClass('detail')){
		}
		else {
			con.removeClass('sidebar-collapsed');
		}
	}
	else if(Modernizr.mq('screen and (max-width:1104px)')) {
		con.addClass('sidebar-collapsed');
		if(Modernizr.mq('screen and (max-width:892px)')) {
			con.removeClass('sidebar-collapsed3 sidebar-collapsed slide-right260');
			$('body').append(aao);
		}
		else {
			aao.insertAfter('div.spacer');
		}
	}
}

// onload ====================================================================================================
$(function(){



	// ご意見ご感想のUI用（開いた時に目立つように出てくる）
	setTimeout(function(){
		$('.feedback').removeClass('first-hide');
	}, 300);
	
	// サイドバー切り替え
	$('a.toggle-sidenav').on('click', function(e) {
		if(Modernizr.mq('screen and (min-width:1105px)')) {
			con.toggleClass('sidebar-collapsed3');
		}
		else if(Modernizr.mq('screen and (max-width:1104px)')) {
			if(Modernizr.mq('screen and (max-width:892px)')) {
				if(snv.hasClass('sidebar-collapsed2')){
					snv.removeClass('sidebar-collapsed2');
				}
				else {
					snv.addClass('sidebar-collapsed2');
				}
			}
			else {
				con.toggleClass('slide-right260');
			}
		}
		e.preventDefault();
		e.stopPropagation();
	});
	
	
		
	/* common
	==================================================================================================== */
	// size setting
	sizeSet();
	
	/* tooltip ================================================== */
	var is_touch_device = 'ontouchstart' in document.documentElement;
	
	if (!is_touch_device) {
		$('.action > a, span.hot, span.point, a.calc, a.go-search, .change-layout > label, .realtime-tab > a, div.pane a, div.popup-nav a, div.menu > a, a.close-chart-pop, a.fa-question-circle, div.corner > div.dropdown > a, div.needs > a, .openhouse-bar > p, .feedback-form label, .feedback > a, #to-account span.id > a, a.subject-remove, a.add-favorite, a.add-alert, .ac-wrap .control a, .picture-box a, div.edit-group a, ul.room-list-map .tts, div.check a, .picture-box .picture-remove').tooltip({
			container: 'body'
		});
		
		// popover 1
/*		$('.gnav').popover({
			html: true,
			animation: false,
			trigger: 'manual',
			container: '#wrapper',
			placement: 'right',
			content: function(){
				return $($(this).data('contentwrapper')).html();
			}
		}).on('mouseenter', function () {
	        var _this = this;
	        $(this).popover('show');
	        $('.popover').on('mouseleave', function () {
	            $(_this).popover('hide');
	        });
	    }).on('mouseleave', function () {
	        var _this = this;
	        setTimeout(function () {
	            if (!$('.popover:hover').length) {
	                $(_this).popover('hide')
	            }
	        }, 100);
	    });
*/		
		// popover 2
		$('#qfav').popover({
			html: true,
			animation: false,
			trigger: 'hover',
			container: 'body',
			placement: 'bottom',
			content: function(){
				return $($(this).data('contentwrapper')).html();
			}
		});
		
		// popover 3
		$('.info-data').popover({
			html: true,
			animation: false,
			trigger: 'hover',
			container: 'body',
			placement: 'bottom',
			content: function(){
				return $($(this).data('contentwrapper')).html();
			}
		});
		
		// help popover
		$('.help-popover').popover({
			html: true,
			trigger: 'hover',
			placement: 'bottom',
			container: 'body'
		});
		
	}
	
	// 
	$('#go-signout').on('click', function(e){
		window.location = 'login.html';
		e.preventDefault();
	});
	
	// set dialog position	
	$('div.modal-confirm').on('show.bs.modal', function(e){
		var thismodal = $(this);
		
		thismodal.show();
		
		var winH1 = $(window).height();
		var tempH1 = $('div.modal-dialog', thismodal).height();
		
		tempH1 = (winH1 - tempH1) / 2 - 50;
		
		if(tempH1 > 0) {
			$('div.modal-dialog', thismodal).attr('style', 'margin-top:' + tempH1 + 'px;');
		}
		
	});

	// feedback
	$('div.feedback > a').on('click', function(e){
		if(!$('div.feedback').hasClass('slide-in')){
			$('div.feedback div.feedback-form').show();
			setTimeout(function(){
				$('div.feedback').addClass('slide-in');
			}, 100);
		}
		else {
			$('div.feedback').removeClass('slide-in');
			setTimeout(function(){
				$('div.feedback div.feedback-form').hide();
			}, 400);
		}
		e.preventDefault();
	});
	$('.feedback-close').on('click', function(e){
		$('div.feedback').removeClass('slide-in');
		setTimeout(function(){
			$('div.feedback div.feedback-form').hide();
		}, 400);
	});
	
	// send feedback
	$('#send-feedback').on('click', function(){
		var tempPfb = $(this).parents('.feedback');
		if($('textarea.feedback-text').val() == ''){
			$('.error-text', tempPfb).show();
			setTimeout(function(){
				$('.error-text', tempPfb).addClass('animation-in');
				$('textarea.feedback-text').addClass('error');
			}, 500);
		}
		else {
			$('.spin-load', '.feedback').spin('circle', '#fff');
			$('.loading', '.feedback').show();
			setTimeout(function(){
				$('.loading', '.feedback').removeClass('fade-out');
				setTimeout(function(){
					$('.thanks', '.feedback').show();
					setTimeout(function(){
						$('.loading', '.feedback').addClass('fade-out');
						setTimeout(function(){
							$('.loading', '.feedback').hide();
							setTimeout(function(){
								$('div.feedback').removeClass('slide-in');
								setTimeout(function(){
									$('div.feedback div.feedback-form').hide();
								}, 400);
							}, 2000);
						}, 750);
					}, 100);
				}, 2000);
			}, 100);
		}
	});
	
	// to guide tour
	$('#to-guide').on('click', function(){
		introJs().setOptions({
			'nextLabel': '次へ',
			'prevLabel': '戻る',
			'skipLabel': 'スキップ',
			'doneLabel': '閉じる'
		}).start();
	});

	// realtime-open
	$('#to-realtime > a').on('click', function(e){
		if(con.hasClass('slide-left280') || body.hasClass('large-window')){
			$('#to-realtime > a').removeClass('active');
			con.removeClass('slide-left280');
			setTimeout(function(){
				tl.hide();
			}, 500);
		}
		else {
			$('#to-realtime > a').addClass('active');
			tl.show();
			setTimeout(function(){
				con.addClass('slide-left280');
			}, 100);
		}
		e.preventDefault();
		e.stopPropagation();
	});
	
	/* scroll ================================================== */
	$('div.scroll-list, #filter-box form div.inner').on('mousewheel DOMMouseScroll', function(e) {
		scrollTo = null;
		if(e.type == 'mousewheel') {
			scrollTo = (e.originalEvent.wheelDelta * -1);
		}
		else if (e.hasOwnProperty('type') && e.type == 'DOMMouseScroll') {
			scrollTo = (e.originalEvent.wheelDelta * -1);
		}
		else if(e.type == 'DOMMouseScroll') {
			scrollTo = 1000 * e.originalEvent.detail;
		}
		if(scrollTo) {
			e.preventDefault();
			$(this).scrollTop(scrollTo + $(this).scrollTop());
		}
	});
	
	/* sidenav accordion ================================================== */
	$('a.accordion').on('click', function(){
		var plist = $(this).parent();
		if(plist.hasClass('open')){
			plist.removeClass('open');
		}
		else {
			$('div.subnav', plist).show();
			setTimeout(function(){
				plist.addClass('open');
			}, 50);
		}
	});
	
	/* on scroll ================================================== */
	$('.spacer').on('scroll', function(){
/*		if(!$('div.notification').hasClass('hide-note')){
			setTimeout(function(){
				$('div.notification').addClass('hide-note');
				setTimeout(function(){
					$('div.notification').hide();
				}, 500);
			}, 600);
		}
*/
	});
	
	// close notification
/*	$('a.close-note').on('click', function(e){
		var noteB = $(this).parent();
		noteB.addClass('hide-note');
		setTimeout(function(){
			noteB.hide();
		}, 400);
		e.preventDefault();
		e.stopPropagation();
	});
*/	
	/* toggle sidenav ================================================== */
/*	$('a.toggle-sidenav').on('click', function() {
	
	
		$(this).addClass('clicked');
		
		toggleSidenav();
		
		setTimeout(function () {
			$('a.toggle-sidenav').removeClass('clicked');
		}, 1000);
		
		
	});
*/	
	// new registration hover
	$('#globalnav> ul > li > a.add').on({
		'mouseenter':function(){
			$(this).addClass('in');
		},
		'mouseleave':function(){
			$(this).removeClass('in');
		}
	});
	// sidenav accordion collapsed
/*	$('#globalnav> ul > li.has-sub').on('mouseenter', function(){
		var $this = $(this);
		if(con.hasClass('sidebar-collapsed')){
			$this.addClass('open');
			$('div.subnav', $this).show();
		}
	});
	$('#globalnav> ul > li.has-sub').on('mouseleave', function(){
		var $this = $(this);
		if(con.hasClass('sidebar-collapsed')){
			$this.removeClass('open');
			$('div.subnav', $this).hide();
		}
	});
*/
	/* window resize ================================================== */
/*	$(window).resize(function() {
		sizeSet();
		clearTimeout(winO);
		winO = setTimeout(doneResizing, 0);
	});
*/

	if(!body.hasClass('suggest')) {
		var timer = false;
		
		$(window).resize(function(e) {
		
			if (timer !== false) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				sizeSet();
				doneResizing();
			}, 200);
			
			e.preventDefault();
			e.stopPropagation();
		});
	}
	
	doneResizing();

	
	/* add 2014/05/14 
	======================================================================================================================================= */
	
	// プロトタイプ用
	$('.confirm-wrap label').on('click', function() {
		$(this).addClass('selected');
		$('#confirm-send').removeClass('btn-disable');
	});
	$('#modal-company-info').on('hidden.bs.modal', function (e) {
		$(this).removeClass('confirmation').removeData();
	});
	$('#confirm-send').on('click', function() {
		$('#modal-company-info').modal('hide');
	});



	$('.text-fault > a').on('click', function() {
		$('#modal-company-info').modal('hide');
		$('#modal-contact').modal('show');
	});
	
	
	// 問合せフォーム用
	var temP1,
		temP2,
		temP3;

	$('#go-sendmail').on('click', function() {
		if($('#contact-mail').val() == ''){
			temP1 = $('#contact-mail').parent();
			$('.error-text', temP1).show();
			setTimeout(function(){
				$('.error-text', temP1).addClass('animation-in');
				$('#contact-mail').addClass('error');
			}, 500);
		}
		if($('#contact-name').val() == ''){
			temP2 = $('#contact-name').parent();
			$('.error-text', temP2).show();
			setTimeout(function(){
				$('.error-text', temP2).addClass('animation-in');
				$('#contact-name').addClass('error');
			}, 500);
		}
		if($('#contact-text').val() == ''){
			temP3 = $('#contact-text').parent();
			$('.error-text', temP3).show();
			setTimeout(function(){
				$('.error-text', temP3).addClass('animation-in');
				$('#contact-text').addClass('error');
			}, 500);
		}
	});
	
	// それでもダメな時はお問合せモーダル
	$('#error-to-contact').on('click', function() {
		$('#modal-error').modal('hide');
		setTimeout(function () {
			$('#modal-contact').modal('show');
		}, 100);
	});
	
	
	/* エラー画面用プロトタイプのみ
	==================================================================================================== */
	if($('body').hasClass('error')){
		$('#modal-error').modal('show');
		$('#modal-error').on('shown.bs.modal', function (e) {
			$('#modal-error').addClass('shake');
		});
	}
	
	
	/* index
	==================================================================================================== */
	if($('body').hasClass('top')){
		
		/* notification ================================================== */
		setTimeout(function(){
			if(!con.hasClass('slide-left280') && !$('body').hasClass('large-window')){
				$('.notification').show();
				setTimeout(function(){
					$('.notification').removeClass('hide-note');
				}, 50);
			}
		}, 500);
	
		// 会社情報変更確認
		$('#modal-company-info').addClass('confirmation').modal({
			'backdrop': 'static'
		});

		if (!is_touch_device) {
			// panel click 3
			$('#panel-alert-access').on('click', function(){
				var tempS = $('#frequency').position().top;
				$('div.scroller').animate({
					scrollTop: tempS - 80
				}, 250);
				$('div.chart-help').show();
				setTimeout(function(){
					$('div.chart-help').removeClass('hide-out');
					$('body').addClass('chart-highlight');
				}, 350);
			});
		
			$('a.close-help').on('click', function() {
				$('div.chart-help').addClass('hide-out');
				$('body').removeClass('chart-highlight');
				setTimeout(function(){
					$('div.chart-help').hide();
				}, 350);
			});
		}
		/* counter ================================================== */
		setTimeout(function(){
			var num = 0,
				tgt = 31,
				tgt2 = 6,
				tgt3 = 107,
				speed = 1;
			setInterval(function(){
				if(num <= tgt){
					$('#num-react').html(num);
					num++;
				}
				if(num <= tgt2){
					$('#num-alert').html(num);
					num++;
				}
/*				if(num <= tgt3){
					$('#num-member').html(num);
					num++;
				}
*/			}, speed);
			$('.feedback').removeClass('first-hide');
		}, 300);
		


		/* chart ================================================== */
		var d1 = [
			[new Date('2011-01-01').getTime(), 33],
			[new Date('2011-02-01').getTime(), 34],
			[new Date('2011-03-01').getTime(), 23],
			[new Date('2011-04-01').getTime(), 39],
			[new Date('2011-05-01').getTime(), 47],
			[new Date('2011-06-01').getTime(), 26],
			[new Date('2011-07-01').getTime(), 11],
			[new Date('2011-08-01').getTime(), 12],
			[new Date('2011-09-01').getTime(), 24],
			[new Date('2011-10-01').getTime(), 39],
			[new Date('2011-11-01').getTime(), 48],
			[new Date('2011-12-01').getTime(), 48]
		];
		var d2 = [
			[new Date('2011-01-01').getTime(), 11],
			[new Date('2011-02-01').getTime(), 13],
			[new Date('2011-03-01').getTime(), 16],
			[new Date('2011-04-01').getTime(), 18],
			[new Date('2011-05-01').getTime(), 22],
			[new Date('2011-06-01').getTime(), 28],
			[new Date('2011-07-01').getTime(), 33],
			[new Date('2011-08-01').getTime(), 32],
			[new Date('2011-09-01').getTime(), 28],
			[new Date('2011-10-01').getTime(), 21],
			[new Date('2011-11-01').getTime(), 15],
			[new Date('2011-12-01').getTime(), 11]
		];
		var d3 = [
			[new Date('2011-01-01').getTime(), 0],
			[new Date('2011-02-01').getTime(), 2],
			[new Date('2011-03-01').getTime(), 3],
			[new Date('2011-04-01').getTime(), 5],
			[new Date('2011-05-01').getTime(), 9],
			[new Date('2011-06-01').getTime(), 13],
			[new Date('2011-07-01').getTime(), 16],
			[new Date('2011-08-01').getTime(), 16],
			[new Date('2011-09-01').getTime(), 13],
			[new Date('2011-10-01').getTime(), 8],
			[new Date('2011-11-01').getTime(), 4],
			[new Date('2011-12-01').getTime(), 2]
		];
		var d4 = [
			[new Date('2011-01-01').getTime(), 10],
			[new Date('2011-02-01').getTime(), 6],
			[new Date('2011-03-01').getTime(), 6],
			[new Date('2011-04-01').getTime(), 8],
			[new Date('2011-05-01').getTime(), 1],
			[new Date('2011-06-01').getTime(), 2],
			[new Date('2011-07-01').getTime(), 4],
			[new Date('2011-08-01').getTime(), 3],
			[new Date('2011-09-01').getTime(), 4],
			[new Date('2011-10-01').getTime(), 12],
			[new Date('2011-11-01').getTime(), 10],
			[new Date('2011-12-01').getTime(), 7]
		];
		
		
		var u1 = [
			[new Date('2011-01-01').getTime(), 10],
			[new Date('2011-02-01').getTime(), 6],
			[new Date('2011-03-01').getTime(), 6],
			[new Date('2011-04-01').getTime(), 8],
			[new Date('2011-05-01').getTime(), 1],
			[new Date('2011-06-01').getTime(), 2],
			[new Date('2011-07-01').getTime(), 4],
			[new Date('2011-08-01').getTime(), 3],
			[new Date('2011-09-01').getTime(), 4],
			[new Date('2011-10-01').getTime(), 12],
			[new Date('2011-11-01').getTime(), 10],
			[new Date('2011-12-01').getTime(), 7]
		];

		var udata = [
			{
				label: '賃貸',
				data: u1,
				lines: {
					show: true,
					fill: false
				},
				points: {
					show: true,
					fillColor: '#3498DB'
				},
				color: '#3498DB',
				yaxis: 1,
				shadowSize: 0
			}
		];

		var data = [
			{
				label: '新規登録数',
				data: d1,
				bars: {
					show: true,
					align: 'center',
					barWidth: 12 * 24 * 60 * 60 * 1000,
					fill: true,
					lineWidth: 1
				},
				color: '#2980B9'
			},
			{
				label: 'アクセス数',
				data: d2,
				lines: {
					show: true,
					fill: false
				},
				points: {
					show: true,
					fillColor: '#3498DB'
				},
				color: '#3498DB',
				yaxis: 1,
				shadowSize: 0
			},
			{
				label: 'マイリスト追加数',
				data: d3,
				lines: {
					show: true,
					fill: false
				},
				points: {
					show: true,
					fillColor: '#1ABC9C'
				},
				color: '#1ABC9C',
				yaxis: 1,
				shadowSize: 0
			},
			{
				label: '問合せ数',
				data: d4,
				lines: {
					show: true,
					fill: false
				},
				points: {
					show: true,
					fillColor: '#E74C3C'
				},
				color: '#E74C3C',
				yaxis: 1,
				shadowSize: 0
			}
		];
		
		// generate
		$.plot($('#chart-analyze'), data, {
			xaxis: {
				min: (new Date(2010, 11, 15)).getTime(),
				max: (new Date(2011, 11, 18)).getTime(),
				mode: 'time',
				timeformat: '%b',
				tickSize: [1, 'month'],
				monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
				tickLength: 0
			},
			yaxes: [
				{
					show: false,
					tickFormatter: function (val, axis) {
						return val + 'mm';
					},
					max: 65
				},
				{
					show: false,
					position: 0,
					tickFormatter: function (val, axis) {
						return val + '\u00B0C';
					},
					max: 40
				}
			],
			grid: {
				hoverable: true,
				borderWidth: 1,
				borderColor: '#dddddd'
			},
			legend: {
				labelBoxBorderColor: 'none',
				position: 'nw'
			}
		});


		$('a#f-use-tab').on('shown.bs.tab', function (e) {
			e.target // activated tab
			e.relatedTarget // previous tab
			
			$.plot($('#frequency-use'), udata, {
				xaxis: {
					min: (new Date(2010, 11, 15)).getTime(),
					max: (new Date(2011, 11, 18)).getTime(),
					mode: 'time',
					timeformat: '%b',
					tickSize: [1, 'month'],
					monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					tickLength: 0
				},
				yaxes: [
					{
						show: false,
						tickFormatter: function (val, axis) {
							return val + 'mm';
						},
						max: 65
					},
					{
						show: false,
						position: 0,
						tickFormatter: function (val, axis) {
							return val + '\u00B0C';
						},
						max: 40
					}
				],
				grid: {
					hoverable: true,
					borderWidth: 1,
					borderColor: '#dddddd'
				},
				legend: {
					labelBoxBorderColor: 'none',
					position: 'nw'
				}
			});
	
		});
		

		var previousPoint = null;
		var previousPointLabel = null;

		$('#chart-analyze, #frequency-use').on('plothover', function (event, pos, item) {
			if (item) {
				if ((previousPoint != item.dataIndex) || (previousLabel != item.series.label)) {
					previousPoint = item.dataIndex;
					previousLabel = item.series.label;
					
					$('#flot-tooltip').remove();
					
				if (item.series.label == '問合せ数') {
					var unitLabel = '\u00B0C';
				}
				else if (item.series.label == 'マイリスト追加数') {
					var unitLabel = '\u00B0C';
				}
				else if (item.series.label == 'アクセス数') {
					var unitLabel = '\u00B0C';
				}
				else if (item.series.label == '新規登録') {
					var unitLabel = 'mm';
				}
				
				var x = convertToDate(item.datapoint[0]);
				y = item.datapoint[1];
				z = item.series.color;
				
				showTooltip(item.pageX, item.pageY,
					'<b>' + item.series.label + '</b><br /> ' + x + ' = ' + y + unitLabel,
					z);
				}
			}
			else {
				$('#flot-tooltip').remove();
				previousPoint = null;
			}
		});
		
		
		
		// card flipper
		$('.flip-container a.flipper').on('click', function(){
			$(this).parents('.flip-container').addClass('flip');
		});
		// card flipper-back
		$('.flip-container a.flipper-back').on('click', function(){
			$(this).parents('.flip-container').removeClass('flip');
		});
	
	}
	
	
	
	/* list 
	==================================================================================================== */
	if($('body').hasClass('list')){





		/* 建物って？ボード用 */
//		$('.whatisbld').addClass('in');
		
		$('.whatisbld-hero > a').on('click', function () {
			$('.whatisbld').removeClass('in');
			setTimeout(function () {
				$('.whatisbld').hide();
			}, 500);
		});


		/* タッチデバイスか判別してツールチップ起動 */	
		if (!is_touch_device) {
			$('.union-status > a, .add-room > a').tooltip({
				container: 'body'
			});
		}


		// list vars
		var lcon = $('section.list-container'),
			lbod = $('div.list-body'),
			chw = $('div.box > div.chart-bg').width();


/*		$('').on('scroll', function () {
			if ($(window).scrollTop() >= 100) {
				$('.text-search-wrap').addClass('in');
			}
			else {
				$('.text-search-wrap').removeClass('in');
			}
		});
*/

//		$('#modal-bld-packer').modal('show');
		
		
		// 建物まとめ用
		$('#modal-bld-packer').on('shown.bs.modal', function (e) {
			$('#is-bld1').spin('circle', '#34495E');
			$('#is-bld2').spin('circle', '#34495E');
			setTimeout(function () {
				$('.bld-box-inner').show();
				setTimeout(function () {
					$('#is-bld1').data('spinner').stop();
					$('#is-bld1').remove();
					$('.bld-box-inner').removeClass('fade-out');
					setTimeout(function () {
						$('.recommend-bld-inner').show();
						setTimeout(function () {
							$('#is-bld2').data('spinner').stop();
							$('#is-bld2').remove();
							$('.recommend-bld-inner').removeClass('fade-out');
						}, 100);
					}, 700);
				}, 100);
			}, 500);
		});
		
		// 建物まとめ動作確認用1
		$('#go-bld-grouping').on('click', function (e) {
			$('.text', this).hide();
			$('#ts-bld1').spin('circle', '#ffffff');
			setTimeout(function () {
				$('#modal-bld-packer .main').hide();
				$('#modal-bld-packer .confirm').show();
				$('#modal-bld-packer').scrollTop(0);
			}, 1000);
			e.preventDefault();
			e.stopPropagation();
		});
		// 建物まとめ動作確認用2
		$('#go-bld-grouping-finish').on('click', function (e) {
			$('.text', this).hide();
			$('#ts-bld2').spin('circle', '#ffffff');
			setTimeout(function () {
				$('#modal-bld-packer .confirm').hide();
				$('#modal-bld-packer .finish').show();
				$('#modal-bld-packer').animate({scrollTop: 0}, 500);
			}, 1000);
			e.preventDefault();
			e.stopPropagation();
		});
		
		
		// 建物まとめ内セレクトトグル
		$('.bld-box').on('click', function (e) {
			$(this).toggleClass('selected');
			e.preventDefault();
			e.stopPropagation();
		});
		
		
		// オープンハウス
		$('.to-open-info').popover({
			html: true,
			animation: false,
			trigger: 'hover',
			container: 'body',
			placement: 'right',
			template: '<div class="popover popover-large" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
			content: function(){
				return $($(this).data('contentwrapper')).html();
			}
		});
			
		// オープンハウス情報表示
		$('.open-sign > a').on('mouseenter', function (e) {
			var tempPP = $(this).parents('li');
			tempPP = $('.openhouse-belt', tempPP);
			tempPP.show();
			setTimeout(function () {
				tempPP.removeClass('fade-out');
			}, 100);
		});
		$('.openhouse-belt').on('mouseleave', function (e) {
			var tempPb = $(this);
			tempPb.addClass('fade-out');
			setTimeout(function () {
				tempPb.hide();
			}, 250);
		});
			
		// 
		$('.show-rest-result a').on('click', function (e) {
			var tempPP = $(this).parents('div.prop-list'),
				tempTT = $(this);
			if(tempPP.hasClass('show-rest')) {
				tempTT.text('表示する');
				tempPP.removeClass('show-rest');
			}
			else {
				tempTT.text('閉じる');
				tempPP.addClass('show-rest');
			}
		});


		// swipe modal
/*		var mySwiper,
			winHeight = $(window).height();
*/			
		// popover 4
		$('.to-image-info').popover({
			html: true,
			animation: false,
			trigger: 'hover',
			container: 'body',
			placement: 'bottom',
			content: function(){
				return $($(this).data('contentwrapper')).html();
			}
		});

		// arrow control
/*		$('.arrow-left').on('click', function(e){
			e.preventDefault();
			mySwiper.swipePrev();
		})
		$('.arrow-right').on('click', function(e){
			e.preventDefault();
			mySwiper.swipeNext();
		})
		
		$('div.swiper-slide').height(winHeight);
*/		

		// 掲載中変更用
		$('.change-publish-type').on('click', function (e) {
			var tempB = $(this);
			if(tempB.hasClass('on')) {
				$('.text', tempB).hide();
				tempB.append('<div class="spin-tiny"></div>');
				$('.spin-tiny').spin('tiny', 'white');
				setTimeout(function () {
					tempB.removeClass('on');
					$('.spin-tiny').data('spinner').stop();
					$('.spin-tiny').remove();
					$('.text', tempB).text('連合隊に掲載').show();
				}, 1000);
			}
			else {
				$('.text', this).hide();
				$(this).append('<div class="spin-tiny"></div>');
				$('.spin-tiny').spin('tiny', '#E67E22');
				setTimeout(function () {
					tempB.addClass('on');
					$('.spin-tiny').data('spinner').stop();
					$('.spin-tiny').remove();
					$('.text', tempB).text('連合隊掲載中').show();
				}, 1000);
			}
			e.preventDefault();
			e.stopPropagation();
		});
		
		// dblclick line
		$('div.prop-list > ul > li').on('dblclick', function(e){
			$('.menu a').trigger('click');
			e.preventDefault();
			e.stopPropagation();
		});
		// click menu
		$('.menu a').on('click', function(e){
			// このif文がないと#overlayが大量に発生してしまう？？？
			if(!$('#overlay').length) {
				$('body').append('<div id="overlay"></div>');
			}
			$('#modal-prop').show();
			setTimeout(function(){
				$('#overlay').addClass('in-show');
				setTimeout(function(){
					$('#modal-prop').addClass('prop-show');
					// mySwiper = new Swiper('.modal-room-gallery-inner');
					
					setTimeout(function(){
						// chart
						var l1 = [
							[new Date('2011-01-01').getTime(), 11],
							[new Date('2011-02-01').getTime(), 13],
							[new Date('2011-03-01').getTime(), 16],
							[new Date('2011-04-01').getTime(), 18],
							[new Date('2011-05-01').getTime(), 22],
							[new Date('2011-06-01').getTime(), 28],
							[new Date('2011-07-01').getTime(), 33],
							[new Date('2011-08-01').getTime(), 32],
							[new Date('2011-09-01').getTime(), 28],
							[new Date('2011-10-01').getTime(), 21],
							[new Date('2011-11-01').getTime(), 15],
							[new Date('2011-12-01').getTime(), 11]
						];
						
						var l2 = [
							[new Date('2011-01-01').getTime(), 10],
							[new Date('2011-02-01').getTime(), 6],
							[new Date('2011-03-01').getTime(), 6],
							[new Date('2011-04-01').getTime(), 8],
							[new Date('2011-05-01').getTime(), 1],
							[new Date('2011-06-01').getTime(), 2],
							[new Date('2011-07-01').getTime(), 4],
							[new Date('2011-08-01').getTime(), 3],
							[new Date('2011-09-01').getTime(), 4],
							[new Date('2011-10-01').getTime(), 12],
							[new Date('2011-11-01').getTime(), 10],
							[new Date('2011-12-01').getTime(), 7]
						];
				
						var ldata = [
							{
								label: 'アクセス数',
								data: l1,
								lines: {
									show: true,
									fill: false
								},
								points: {
									show: true,
									fillColor: '#3498DB'
								},
								color: '#3498DB',
								yaxis: 1,
								shadowSize: 0
							},
							{
								label: 'マイリスト追加数',
								data: l2,
								lines: {
									show: true,
									fill: false
								},
								points: {
									show: true,
									fillColor: '#1ABC9C'
								},
								color: '#1ABC9C',
								yaxis: 1,
								shadowSize: 0
							}
						];
						
						// generate
							$.plot($('#chart-test-layer1'), ldata, {
								xaxis: {
									min: (new Date(2010, 11, 15)).getTime(),
									max: (new Date(2011, 11, 18)).getTime(),
									mode: 'time',
									timeformat: '%b',
									tickSize: [1, 'month'],
									monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
									tickLength: 0
								},
								yaxes: [
									{
										show: false,
										tickFormatter: function (val, axis) {
											return val + 'mm';
										},
										max: 65
									},
									{
										show: false,
										position: 0,
										tickFormatter: function (val, axis) {
											return val + '\u00B0C';
										},
										max: 40
									}
								],
								grid: {
									hoverable: true,
									borderWidth: 1,
									borderColor: '#ffffff'
								},
								legend: {
									labelBoxBorderColor: 'none',
									position: 'nw'
								}
							});
						
				
						var previousPoint = null;
						var previousPointLabel = null;
				
						$('#chart-test-layer1').on('plothover', function (event, pos, item) {
							if (item) {
								if ((previousPoint != item.dataIndex) || (previousLabel != item.series.label)) {
									previousPoint = item.dataIndex;
									previousLabel = item.series.label;
									
									$('#flot-tooltip').remove();
									
								if (item.series.label == '問合せ数') {
									var unitLabel = '\u00B0C';
								}
								else if (item.series.label == 'マイリスト追加数') {
									var unitLabel = '\u00B0C';
								}
								else if (item.series.label == 'アクセス数') {
									var unitLabel = '\u00B0C';
								}
								else if (item.series.label == '新規登録') {
									var unitLabel = 'mm';
								}
								
								var x = convertToDate(item.datapoint[0]);
								y = item.datapoint[1];
								z = item.series.color;
								
								showTooltip(item.pageX, item.pageY,
									'<b>' + item.series.label + '</b><br /> ' + x + ' = ' + y + unitLabel,
									z);
								}
							}
							else {
								$('#flot-tooltip').remove();
								previousPoint = null;
							}
						});
					}, 500);
				}, 150);
			}, 100);
			
			e.preventDefault();
			e.stopPropagation();
			
		});
		
		//
		$('#modal-prop').on('click', function(e){
			var target = $(e.target);
			if(target.hasClass('modal-prop-wrap')) {
				$('#modal-prop').removeClass('prop-show');
				setTimeout(function(){
					$('#overlay').removeClass('in-show');
					setTimeout(function(){
						$('#overlay').remove();
						$('#modal-prop').hide();
					}, 150);
				}, 200);
				return false;
			}
		});
		
		$('.info-close').on('click', function(e){
			$('#modal-prop').removeClass('prop-show');
			setTimeout(function(){
				$('#overlay').removeClass('in-show');
				setTimeout(function(){
					$('#overlay').remove();
					$('#modal-prop').hide();
				}, 150);
			}, 200);
		});

		// openhouse go
		$('a.change-openhouse').on('click', function(e){
			$('.action a').removeClass('active');
			$(this).addClass('active');
			$('div.info-box-group1').addClass('hide-info-group');
			$('div.loader-wrap').show();
			$('div.loader').spin('normal', 'white');
			setTimeout(function(){
				$('div.info-box-group1').hide();
				setTimeout(function(){
					$('#info-openhouse').show();
					setTimeout(function(){
						$('#info-openhouse').removeClass('hide-info');
						$('div.loader').data('spinner').stop();
						$('div.loader-wrap').hide();
					}, 100);
				}, 2000);
			}, 280);
		});
		// openhouse finish
		$('#openhouse-change-finish').on('click', function(e) {
			$('.openhouse-date, #info-openhouse .show-wrap').addClass('fade-out');
			
			$('#info-openhouse div.inside-spinner').show();
			$('#info-openhouse div.inside-spinner').spin('normal', '#666');
			
			setTimeout(function() {
				$('.openhouse-date').hide();
				setTimeout(function() {
					$('.finish-container').show();
					$('#info-openhouse .show-wrap').hide();
					setTimeout(function() {
						$('#info-openhouse .hide-wrap').show();
						$('.finish-container').removeClass('fade-out');
						$('#info-openhouse div.inside-spinner').data('spinner').stop();
						$('#info-openhouse div.inside-spinner').hide();
						setTimeout(function() {
							$('#info-openhouse .hide-wrap').removeClass('fade-out');
						}, 100);
					}, 100);
				}, 2000);
			}, 280);
		});

		$('#handmade-to-confirm').on('click', function(e) {
			$('.handmade-inner, #handmade-form .show-wrap').addClass('fade-out');
			
			$('#handmade-form div.inside-spinner').show();
			$('#handmade-form div.inside-spinner').spin('normal', '#666');
			
			setTimeout(function() {
				$('.handmade-inner').hide();
				setTimeout(function() {
					$('.confirm-container').show();
					$('#handmade-form .show-wrap').hide();
					setTimeout(function() {
						$('#handmade-form .hide-wrap').show();
						$('.confirm-container').removeClass('fade-out');
						$('#handmade-form div.inside-spinner').data('spinner').stop();
						$('#handmade-form div.inside-spinner').hide();
						setTimeout(function() {
							$('#handmade-form .hide-wrap').removeClass('fade-out');
						}, 100);
					}, 100);
				}, 2000);
			}, 280);
		});

		$('#handmade-to-finish').on('click', function(e) {
			$('#handmade-form .confirm-container, #handmade-form .hide-wrap').addClass('fade-out');
			
			$('#handmade-form div.inside-spinner').show();
			$('#handmade-form div.inside-spinner').spin('normal', '#666');
			
			setTimeout(function() {
				$('#handmade-form .confirm-container').hide();
				setTimeout(function() {
					$('#handmade-form .finish-container').show();
					$('#handmade-form .hide-wrap').hide();
					setTimeout(function() {
						$('#handmade-form .hide-wrap2').show();
						$('#handmade-form .finish-container').removeClass('fade-out');
						$('#handmade-form div.inside-spinner').data('spinner').stop();
						$('#handmade-form div.inside-spinner').hide();
						setTimeout(function() {
							$('#handmade-form .hide-wrap2').removeClass('fade-out');
						}, 100);
					}, 100);
				}, 2000);
			}, 280);
		});

		// 連合隊掲載用
		$('#go-publish-union').on('click', function(e) {
			$('#modal-publish-type .publish-type-inner, #modal-publish-type .show-wrap').addClass('fade-out');
			
			$('#modal-publish-type div.inside-spinner').show();
			$('#modal-publish-type div.inside-spinner').spin('normal', '#666');
			
			setTimeout(function() {
				$('#modal-publish-type .publish-type-inner').hide();
				setTimeout(function() {
					$('#modal-publish-type .finish-container').show();
					$('#modal-publish-type .show-wrap').hide();
					setTimeout(function() {
						$('#modal-publish-type .hide-wrap').show();
						$('#modal-publish-type .finish-container').removeClass('fade-out');
						$('#modal-publish-type div.inside-spinner').data('spinner').stop();
						$('#modal-publish-type div.inside-spinner').hide();
						setTimeout(function() {
							$('#modal-publish-type .hide-wrap').removeClass('fade-out');
						}, 100);
					}, 100);
				}, 2000);
			}, 280);
		});
		
		//連合隊掲載中止
		$('#stop-publish-union').on('click', function(e) {
			$('#modal-publish-type-unfold .publish-type-inner, #modal-publish-type-unfold .show-wrap').addClass('fade-out');
			
			$('#modal-publish-type-unfold div.inside-spinner').show();
			$('#modal-publish-type-unfold div.inside-spinner').spin('normal', '#666');
			
			setTimeout(function() {
				$('#modal-publish-type-unfold .publish-type-inner').hide();
				setTimeout(function() {
					$('#modal-publish-type-unfold .finish-container').show();
					$('#modal-publish-type-unfold .show-wrap').hide();
					setTimeout(function() {
						$('#modal-publish-type-unfold .hide-wrap').show();
						$('#modal-publish-type-unfold .finish-container').removeClass('fade-out');
						$('#modal-publish-type-unfold div.inside-spinner').data('spinner').stop();
						$('#modal-publish-type-unfold div.inside-spinner').hide();
						setTimeout(function() {
							$('#modal-publish-type-unfold .hide-wrap').removeClass('fade-out');
						}, 100);
					}, 100);
				}, 2000);
			}, 280);
		});
		
		// handmade go
		$('a.order-handmade').on('click', function(e){
			$('.action a').removeClass('active');
			$(this).addClass('active');
			$('div.info-box-group1').addClass('hide-info-group');
			$('div.loader-wrap').show();
			$('div.loader').spin('normal', 'white');
			setTimeout(function(){
				$('div.info-box-group1').hide();
				setTimeout(function(){
					$('#handmade-form').show();
					setTimeout(function(){
						$('#handmade-form').removeClass('hide-info');
						$('div.loader').data('spinner').stop();
						$('div.loader-wrap').hide();
					}, 100);
				}, 2000);
			}, 280);
		});
		
		// handmade back
		$('a.back-info-nav').on('click', function(e){
			$('.action a').removeClass('active');
			$('#info-openhouse, #handmade-form').addClass('hide-info');
			$('div.loader-wrap').show();
			$('div.loader').spin('normal', 'white');
			setTimeout(function(){
				$('#info-openhouse, #handmade-form').hide();
				setTimeout(function(){
					$('div.info-box-group1').show();
					setTimeout(function(){
						$('div.info-box-group1').removeClass('hide-info-group');
						$('div.loader').data('spinner').stop();
						$('div.loader-wrap').hide();
					}, 100);
				}, 2000);
			}, 280);
		});
		
		






		// list-hide
		$('.prop-list-inner .check a, .prop-list-inner .text a').on('click', function(e){
			var tempUL = $(this).parents('ul');
			if(tempUL.hasClass('list-hide')){
				$('.prop-list-inner .check .go-open').hide();
				$('.prop-list-inner .check .go-close').show();
				tempUL.removeClass('list-hide');
			}
			else {
				$('.prop-list-inner .check .go-open').show();
				$('.prop-list-inner .check .go-close').hide();
				tempUL.addClass('list-hide');
			}
		});
		
		// modal-gallery
		$('.prop-list > ul > li').on('click', function(e){
			// z-index up when click detail-group-row
			if(!pn.hasClass('open')){
				var boxP = $(this).parents('.box');
				$('.prop-list > ul > li, div.box').removeAttr('style');
				$(this).css('z-index', '3');
				boxP.css('z-index', '3');
			}
		});
		
		// modal-gallery
		$('.prop-list > ul > li').on('mouseenter', function(e){
			// z-index up when click detail-group-row
			var boxP = $(this).parents('.box');
			$('.prop-list > ul > li, div.box').removeAttr('style');
			$(this).css('z-index', '3');
			boxP.css('z-index', '3');
		});
		// modal-gallery
		$('.prop-list > ul > li').on('mouseleave', function(e){
			$(this).removeAttr('style');
		});
		
		// Popup-to-openhouse
		$('#pu-openhouse').on('click', function(e){
			pn.addClass('openhouse');
			$('#pu-basic').addClass('pu-hide');
			setTimeout(function(){
				$('#pu-basic').hide();
				$('div.openhouse-date').show();
				setTimeout(function(){
					$('div.openhouse-date').removeClass('pu-hide');
				}, 100);
			}, 400);
		});

		// Popup-to-openhouse
		$('#pu-handmade').on('click', function(e){
			pn.addClass('handmade');
			$('#pu-basic').addClass('pu-hide');
			setTimeout(function(){
				$('#pu-basic').hide();
				$('div.handmade-order').show();
				setTimeout(function(){
					$('div.handmade-order').removeClass('pu-hide');
				}, 100);
			}, 400);
		});
		// Popup-to-top-from-openhouse
		$('.back-popup-nav').on('click', function(e){
			$('div.openhouse-date, div.handmade-order').addClass('pu-hide');
			setTimeout(function(){
				$('div.openhouse-date, div.handmade-order').hide();
				pn.removeClass('openhouse handmade');
				setTimeout(function(){
					$('#pu-basic').show();
					setTimeout(function(){
						$('#pu-basic').removeClass('pu-hide');
					}, 100);
				}, 400);
			}, 400);
		});

		// datepicker
//		$('#dp-start').datepicker();
//		$('#dp-end').datepicker();


		var nowTemp = new Date();
		var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
		
		var checkin = $('#dp-start').datepicker({
				onRender: function(date) {
				return date.valueOf() < now.valueOf() ? 'disabled' : '';
			}
		}).on('changeDate', function(ev) {
			if (ev.date.valueOf() > checkout.date.valueOf()) {
				var newDate = new Date(ev.date)
				newDate.setDate(newDate.getDate() + 1);
				checkout.setValue(newDate);
			}
			checkin.hide();
			$('#dp-end')[0].focus();
		}).data('datepicker');
		var checkout = $('#dp-end').datepicker({
			onRender: function(date) {
				return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
			}
		}).on('changeDate', function(ev) {
			checkout.hide();
		}).data('datepicker');
		
		// layout change
		$('.change-layout > label').on('click', function(e){
			var tempI = $(this).attr('id');
			$('.change-layout > label').removeClass('selected');
			if(tempI =='layout-double') {
				$(this).addClass('selected');
				bs.removeClass('single');
			}
			else {
				$(this).addClass('selected');
				bs.addClass('single');
			}
			e.preventDefault();
			sizeSet();
		});
		
		// check
		$('div.box-group > div.group-check > label').on('click', function(e){
		
			var pBox = $(this).parents('.box');
			if(pBox.hasClass('selected')){
				pBox.removeClass('selected');
				if(!$('.box').hasClass('selected')) {
					aao.removeClass('show-bottom');
					setTimeout(function(){
						aao.hide();
					}, 300);
				}
				e.preventDefault();
			}
			else {
				pBox.addClass('selected');
				if(!aao.hasClass('show-bottom')) {
					aao.show();
					setTimeout(function(){
						aao.addClass('show-bottom');
					}, 100);
				}
				e.preventDefault();
			}
		});
		// check cancel
		$('div.all-at-once > a.cancel').on('click', function(e) {
			$('div.box').removeClass('selected');
			aao.removeClass('show-bottom');
			setTimeout(function(){
				aao.hide();
			}, 300);
		});
		
		// check
		$('div.prop-list > ul > li > div.check > label').on('click', function(e){
			var pList = $(this).parent().parent();
			if(pList.hasClass('selected')){
				pList.removeClass('selected');
				if(!$('.box').hasClass('selected') && !$('div.prop-list > ul > li').hasClass('selected')) {
					aao.removeClass('show-bottom');
					setTimeout(function(){
						aao.hide();
					}, 300);
				}
				e.preventDefault();
			}
			else {
				pList.addClass('selected');
				if(!aao.hasClass('show-bottom')) {
					aao.show();
					setTimeout(function(){
						aao.addClass('show-bottom');
					}, 100);
				}
				e.preventDefault();
			}
		});



	if(!$('body').hasClass('list-map')){
			setTimeout(function(){
				// chart
			}, 500);
		}

		// log show
/*		$('#show-accesschart').on('click', function(){
			pn.removeClass('open');
			setTimeout(function(){
				pn.hide();
			}, 400);
			var temBox = $(this).parents('.box');
			$('.chart-pop', temBox).show();
			setTimeout(function(){
				temBox.addClass('chart-mode');
				var	myLine1p = new Chart(document.getElementById('chart1-p').getContext('2d')).Line(lineChartData0, optionsUp);
			}, 100);
		});
*/
/*		$('a.close-chart-pop').on('click', function(){
			var temBox = $(this).parents('.box');
			temBox.removeClass('chart-mode');
			$('.g-bars', temBox).removeClass('popup-close');
			setTimeout(function(){
				$('.chart-pop, .bar-chart-pop', temBox).hide();
			}, 500);
		});
*/
		// log mylist show
/*		$('#show-mylistchart').on('click', function(){
			pn.removeClass('open');
			setTimeout(function(){
				pn.hide();
			}, 400);
			var temBox = $(this).parents('.box');
			$('.bar-chart-pop', temBox).show();
			setTimeout(function(){
				temBox.addClass('chart-mode');
				var myLine1p = new Chart(document.getElementById('bar-chart1-p').getContext('2d')).Bar(barChartData0, optionsBarUp);
			}, 100);
		});
*/
/*		$('a.close-chart-pop').on('click', function() {
			var temBox = $(this).parents('.box');
			temBox.removeClass('chart-mode');
			$('.g-bars', temBox).removeClass('popup-close');
			setTimeout(function() {
				$('.bar-chart-pop, .chart-pop', temBox).hide();
			}, 500);
		});
*/
		// select2
		$('#sub-add, #s-id, #s-name, #s-area1, #p-size-lowest, #p-size-highest, #p-price-lowest, #p-price-highest, #s-price-lowest, #s-price-highest, #s-old-lowest, #s-old-highest, #s-line, #s-incharger, .for-serch').select2();

		if($('body').hasClass('list-map')) {
			var teH = $(window).height();
			setTimeout(function(){
				initialize();
				sizeSet();
			}, 100);
		}
		
		// winSize
		winH = window.innerHeight;
		if(Modernizr.mq('screen and (max-width:892px)')) {
			$('#filter-box > form').height(winH - 80);
			$('#filter-box > form div.inner').height(winH - 80);
		}
		else {
			$('#filter-box > form').height(winH - 196 - 40);
			$('#filter-box > form div.inner').height(winH - 196 - 41 - 24);
		}

		// search layout change
/*		$('a.go-mapping').on('click', function(e){
			lcon.addClass('map-layout');
			var teH = $(window).height();
			// map activate
			initialize();
			setTimeout(function(){
				$('#map-body').addClass('fade-in');
				setTimeout(function(){
					lbod.height(teH - 185 - 5).hide();
					$('.list-inner').height(teH - 249 - 5 - 24);
					// size setting
					sizeSet();
					setTimeout(function(){
						lbod.show();
						lcon.addClass('body-show');
						setTimeout(function(){
							lcon.addClass('body-slide-in');
							$('.change-searchbox-style').addClass('slide-in');
						}, 100);
					}, 100);
				}, 300);
			}, 100);
			e.stopPropagation();
			e.preventDefault();
		});
		
		$('a.quit-mapview').on('click', function(){
			lcon.removeClass('body-slide-in');
			$('.change-searchbox-style').removeClass('slide-in');
			setTimeout(function(){
				lbod.hide();
				lcon.removeClass('body-show');
				setTimeout(function(){
					lbod.removeAttr('style').show();
					$('.list-inner').removeAttr('style');
					$('#map-body').removeClass('fade-in');
					setTimeout(function(){
						lcon.removeClass('map-layout');
						// size setting
						sizeSet();
					}, 250);
				}, 250);
			}, 300);
		});
*/

/*		$('div.change-searchbox-style a.map').on('click', function(e){
			$('div.text-search').css('transform', 'translateY(-150px)');
			setTimeout(function(){
				$('div.text-search').addClass('map-search');
				setTimeout(function(){
					$('div.text-search').removeAttr('style');
				}, 100);
			}, 250);
			e.stopPropagation();
			e.preventDefault();
		});
		// 
		$('div.change-searchbox-style a.prop').on('click', function(e){
			$('div.text-search').css('transform', 'translateY(-150px)');
			setTimeout(function(){
				$('div.text-search').removeClass('map-search');
				setTimeout(function(){
					$('div.text-search').removeAttr('style');
				}, 100);
			}, 250);
			e.stopPropagation();
			e.preventDefault();
		});
*/		
		
/*
		$('div.option  > p.show-all > a.to-open').on('click', function(){
			$(this).parents('.option').addClass('open');
		});
		$('div.option  > p.show-all > a.to-close').on('click', function(){
			$(this).parents('.option').removeClass('open');
		});
*/

		// action
/*		$('div.menu > a').on('click', function(){
			var tret = $(this).next();
			$('.g-bars', this).toggleClass('popup-close');
			
			if(pn.hasClass('open')){
				pn.removeClass('open');
				setTimeout(function(){
					pn.hide();
				}, 400);
			}
			else {
				$(this).after(pn);
				pn.show();
				setTimeout(function(){
					pn.addClass('open');
				}, 100);
			}
		});
*/
	}
	
	/* list or suggest
	==================================================================================================== */
	if($('body').hasClass('list')) {
		
		// 
		$('.group-bld').on('mouseenter', function (e) {
			var thisI = $(this);
			$('.bounce-nav', thisI).show();
			setTimeout(function () {
				thisI.removeClass('pop-out');
			}, 100);
		});
		$('.group-bld').on('mouseleave', function (e) {
			var thisD = $(this);
			thisD.addClass('pop-out');
			setTimeout(function () {
				$('.bounce-nav', thisD).hide();
			}, 300);
		});
		
		// search open
		$('div.text-search').on('click', function(){
			if(Modernizr.mq('screen and (max-width:892px)')) {
				var fbox = $('.filter-box-wrap'),
					textBox = $('.text-search-inner');
				body.append(fbox);
				body.css('position','fixed');
				$('div.filter-box-wrap, a.close-text-search').show();
				setTimeout(function(){
					$('div.filter-box-wrap').addClass('fixed');
				}, 100);
			}
			else {
				$('div.filter-box-wrap, a.close-text-search').show();
				$('div.text-search').addClass('active');
			}
		});
		// search close
		$('a.close-text-search').on('click', function(e){
			if(Modernizr.mq('screen and (max-width:892px)')) {
				$('div.text-search').removeClass('active');
				$('div.filter-box-wrap').removeClass('fixed');
				setTimeout(function() {
					$('div.filter-box-wrap, a.close-text-search').hide();
					body.removeAttr('style');
				}, 200);
			}
			else {
				$('div.text-search').removeClass('active');
				$('div.filter-box-wrap, a.close-text-search').hide();
				if($('.tag-wrap').css('display') == 'block'){
					$('a.add-favorite').addClass('show-star');
				}
			}
			e.stopPropagation();
			e.preventDefault();
		});
		$('a.add-favorite, a.add-alert').on('click', function(e){
			$(this).addClass('added');
			$('a.to-favorite').addClass('btn-disable');
/*			e.stopPropagation();
			e.preventDefault();
*/		});
		
		// 
		$('div.text-search-inner').on('mouseenter', function(){
			if($('.tag-wrap').css('display') == 'block'){
				$('.tag-wrap').removeClass('display-ds');
				var twHeight = $('.tag-wrap').height();
				if(twHeight >= 38){
					twHeight = twHeight + 38;
				}
				else {
					twHeight = 38;
				}
				$('div.text-search-inner').css('height', twHeight);
			}
		});
		$('div.text-search-inner').on('mouseleave', function(){
			$('div.text-search-inner').css('height', '38px');
			$('.tag-wrap').addClass('display-ds');
		});
		
		// add
		$('a.add-subject-btn').on('click', function(){
			$('div.added').removeClass('add-hide');
		});
		
		// add-delete
		$('a.subject-remove').on('click', function(){
			$('div.added').addClass('add-hide');
		});
		
		// プロトタイプ用
		$('#mine').on('click', function(){
			$('.tag-wrap').show();
			$('.text-search > div').addClass('active');
		});
	}
	
	
	/* detail
	==================================================================================================== */

	if($('body').hasClass('detail')) {
	
//		$('#modal-kotu').modal('show');
		
		// 交通追加クリック
		$('#kotu-add').on('click', function() {
			var tempP = $('#modal-kotu').innerHeight();
			$('#modal-kotu').animate({scrollTop: tempP}, 500);
			// 画面縦小さい時用タイムアウト
			setTimeout(function () {
				$('.result-box ul li.new').show();
				// プロトタイプ用タイムアウト
				setTimeout(function () {
					$('.result-box ul li.new').removeClass('hide-out');
				}, 100);
			}, 500);
		});


		// 交通初期表示プロトタイプ
		$('#modal-kotu').on('shown.bs.modal', function (e) {
			$('#modal-kotu .inside-spinner').spin('circle','#34495E');
			// プロトタイプ用タイムアウト
			setTimeout(function () {
				$('#modal-kotu .list-group').show();
				setTimeout(function () {
					$('#modal-kotu .inside-spinner').remove();
					$('#modal-kotu .list-group').removeClass('fade-out');
				}, 100);
			}, 1000);
		});
		
		// 駅選択したら
		$('#modal-kotu .list-group-item').on('click', function() {
			$('#modal-kotu .list-group-item.active').removeClass('active');
			$(this).addClass('active');
			
			$('#modal-kotu .step2').show();
			setTimeout(function() {
				$('#modal-kotu .step2').removeClass('hide-out');
			}, 100);
		});
		
		// 交通モーダル用
		// 物件がない？
		$('.step1-help > .other-station').popover({
			html: true,
			animation: false,
			trigger: 'hover',
			container: 'body',
			placement: 'right',
			template: '<div class="popover popover-large" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
			content: function(){
				return $($(this).data('contentwrapper')).html();
			}
		});
		// 路線見る
		$('.step1-help > .view-line').on('click', function() {
			$('.line-list, .step1-help > .view-line > .l-open, .step1-help > .view-line > .l-close').toggle();
		});		
		

		// プロトタイプ用
		// $('#select-category-invest').modal('show');
		
		
//		$('.float-image-box').draggable();


		// 画像エディター
		$('.dd-area').on('click', function() {
			$('#image-editer').show();
			setTimeout(function () {
				$('#image-editer').removeClass('hide-out');
				$('body').addClass('fixed');
			}, 100);
			
			$('.tmp-wrap').magnificPopup({
				delegate: 'a', // child items selector, by clicking on it popup will open
				type: 'image',
				gallery: {
					enabled: true
				},
				image: {
					markup: '<div class="mfp-figure">'+
								'<div class="mfp-close"></div>'+
								'<div class="mfp-img"></div>'+
								'<div class="mfp-bottom-bar">'+
									'<div class="mfp-title"></div>'+
									'<div class="mfp-counter"></div>'+
								'</div>'+
							'</div>',
					cursor: 'mfp-zoom-out-cur',
					titleSrc: 'title',
					verticalFit: true,
					tError: '<a href="%url%">The image</a> could not be loaded.'
				}
			});
	
		});
		$('.close-editer').on('click', function() {
//			alert('内容が変更されています。変更した内容で保存しますか？');
			$('#modal-leave-editer').modal('show');
			
/*
			$('#image-editer').addClass('hide-out');
			setTimeout(function () {
				$('body').removeClass('fixed');
				$('#image-editer').hide();
			}, 350);
*/
		});

		$('#save-change').on('click', function() {
			$('#modal-leave-editer').modal('hide');
			$('#image-editer').addClass('hide-out');
			setTimeout(function () {
				$('body').removeClass('fixed');
				$('#image-editer').hide();
			}, 350);
		});
		$('#drop-change').on('click', function() {
			$('#modal-leave-editer').modal('hide');
			$('#image-editer').addClass('hide-out');
			setTimeout(function () {
				$('body').removeClass('fixed');
				$('#image-editer').hide();
			}, 350);
		});
		
		// 配置場所から
		$('.to-slide').on('click', function() {
			
		});
		$('.pic-wrap').on('click', function() {
			if(!$('.image-line-inner').hasClass('i-p-mode') && !$(this).hasClass('pic-in')) {
				if($(this).find('.pic-wrap-help').length) {
					$('.tmp-wrap').removeClass('p-i-mode');
					$('.pic-wrap-help').appendTo('.tmp-wrap');
				}
				else {
					$('.tmp-wrap').addClass('p-i-mode');
					$('.pic-wrap-help').appendTo(this);
				}
			}
		});
		// 画像から
		$('.image-line-inner li').on('click', function() {
			if(!$('.tmp-wrap').hasClass('p-i-mode')) {
				if($(this).hasClass('picked')) {
					$(this).removeClass('picked');
					$('.image-line-inner').removeClass('i-p-mode');
					$('.picked-image-help').appendTo('.image-line-inner');
				}
				else {
					$('.image-line-inner li').removeClass('picked');
					$(this).addClass('picked');
					$('.image-line-inner').addClass('i-p-mode');
					$('.picked-image-help').appendTo(this);
				}
			}
		});
		
		// プロトタイプ用(ヘッダークリックで確認ボタン)
		$('.tmp-line-toolbar h2').on('click', function() {
			$('.image-editer-finish').show();
			setTimeout(function() {
				$('.image-editer-finish').removeClass('hide-out');
			}, 100);
		});
		
		// ウィンドウサイズ変更時
		var timer = false;
		
		$(window).resize(function(e) {
		
			if (timer !== false) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				anchorPlace();
			}, 200);
			
			e.preventDefault();
			e.stopPropagation();
		});
		
		// 建物モーダル起動時
		$('#modal-bld').on('shown.bs.modal', function (e) {
			anchorPlace();
			$('.kanav').show();
		});
		
		$('#modal-bld').on('hidden.bs.modal', function (e) {
			$('.kanav').hide();
		});
	
/*
		$('div.vador-box').on('click', 'div.check > ul.float > li > a > span.fa', function(e) {
			var tempP = $(this).parents('li');
			tempP.remove();
			
			e.stopPropagation();
			e.preventDefault();
		});
*/		

		// 学区モーダル起動時
		$('#modal-school').on('shown.bs.modal', function (e) {
			// map
			initialize3();
		});
		
		// 交通モーダル起動時
		$('#modal-kotu').on('shown.bs.modal', function (e) {
			// map
			initialize3();
			// 
			$('#kotu-s2 label').on('click', function(e) {
				$('#kotu-s2 label').removeClass('selected');
				$(this).addClass('selected');
				
				var tempID = $(this).attr('id');
				
				$('div.hide-out-kotu').hide();
				
				$('.' + tempID).show();
				
				e.preventDefault();
			});
			
			$('div.more > .hide-open').on('click', function(e) {
				$('div.more > .hide-open').hide();
				$('div.more > .hide-close').show();
				$('.hide-hide-bus').show();
				e.preventDefault();
			});
			
			$('div.more > .hide-close').on('click', function(e) {
				$('div.more > .hide-close').hide();
				$('div.more > .hide-open').show();
				$('.hide-hide-bus').hide();
				e.preventDefault();
			});
			
		});
	
		$('div.add-others > select').on('change', function() {
			var tempV = $(this).val();
			if($(this).hasClass('parking-umu')) {
				if(tempV == 'あり' || tempV == '近隣月極') {
					$(this).next().removeClass('hide-out');
				}
				else {
					$(this).next().addClass('hide-out');
				}
			}
			else {
				if(tempV == 'others') {
					$(this).next().removeClass('hide-out');
				}
				else {
					$(this).next().addClass('hide-out');
				}
			}
		});
	
		// 
		$('div.submit-wrap > button').on('click', function(e) {
			$('span.text', this).hide();
			$('div.spinner').spin('normal', '#ffffff');
			// デモ用
			setTimeout(function() {
				$('html, body').addClass('fixed');
				if($('#detail_url').val() == '') {
					$('.confirm-layer').show();
					setTimeout(function() {
						$('.confirm-layer').removeClass('hide-out');
					}, 100);
				}
				else {
					$('.error-layer').show();
					setTimeout(function() {
						$('.error-layer').removeClass('hide-out');
					}, 100);
				}
			}, 1000);
			e.preventDefault();
		});
		
		// 
		$('div.layer-footer > button.btn-blue').on('click', function(e) {
			$('span.text', this).hide();
			$('div.spinner2').spin('normal', '#ffffff');
			setTimeout(function() {
				$('.finish-layer').show();
				setTimeout(function() {
					$('.finish-layer').removeClass('hide-out');
					setTimeout(function() {
						$('.confirm-layer').hide().addClass('hide-out');
					}, 500);
				}, 100);
			}, 1000);
			e.preventDefault();
		});
		
		// 
		$('.modal-magic-inner label').on('click', function(e) {
			var tempP = $(this).parents('div.rb').attr('id');
			if(!tempP == 'kotu-s2') {
				$(this).addClass('selected');
				$('div.current-block').removeClass('hide-out');
				
				var tempT = $('span.text', this).text();
				
				tempT = '<li>'+ tempT + '</li>';
				
				$('div.current-block ul').append(tempT);
				
			}
			e.preventDefault();
		});
		
		$('.close-help').on('click', function(e) {
			$('div.current-block').addClass('hide-out');
		});
		
		var vadorT;
		// VADOR
		$('.prospector').on('click', function(e) {
			$('div.vador-box .scroller div').remove();
			
			var	tempBox,
				posX = $(this).offset().left,
				posY = $(this).offset().top,
				widthG = $(this).width(),
				heightG = $(this).height();
				
			vadorT = '';
			vadorT = $(this);

			tempBox = '';
			tempBox = $(this).next().clone();
			$('div.vador-box > div.scroller').append(tempBox);
			
			// position set
			$('div.vador-box').css({
				'display': 'block',
				'top': posY + heightG + 12,
				'left': posX,
				'width': widthG + 26
			}).addClass('vador-show');
			
			e.preventDefault();
			e.stopPropagation();
		});
		
		// VADOR outer click
		$('body').on('click', function(event) {
			if($('div.vador-box').css('display') == 'block') {
				if (!$.contains($('div.vador-show')[0], event.target)) {
					$('div.vador-show').hide().removeClass('vador-show');
					$('div.vador-box .scroller div').remove();
				}
			}
		});
		
		// click vador link
		$('div.vador-box').on('click', 'li > a', function(e) {
		
			var tempV = $(this).text(),
				tempU = $(this).parents('ul'),
				tempA;
			
			tempA = vadorT.val();
			conA = tempA.length;
			conV = tempV.length + 1;
			conM = conA + conV;
			
			
			if(tempU.hasClass('float')) {
				if(tempA == '') {
					vadorT.val(tempV);
				}
				else if(conM < 250) {
					vadorT.val(tempA + '、' + tempV);
				}
				else {
					$('.warning-text').show();
					setTimeout(function() {
						$('.warning-text').removeClass('hide-out');
						setTimeout(function() {
							$('.warning-text').addClass('hide-out');
							setTimeout(function() {
								$('.warning-text').hide();
							}, 100);
						}, 2000);
					}, 100);
				}
			}
			else {
				$('div.vador-show').hide().removeClass('vador-show');
				$('div.vador-box .scroller div').remove();
				vadorT.val(tempV);
			}
			e.preventDefault();
			e.stopPropagation();
		});

		// click vador link
		$('div.vador-box').on('click', 'button.add-new-btn', function(e) {
			var tempB = $(this).prev().val(),
				tempUL = $(this).parents('ul');
			tempB = '<li><a href="javascript:void(0);">'+ tempB + '</a></li>';
			tempUL.prepend(tempB);
		});
		
		// 
		$('div.vador-box').on('click', 'a.go-edit-mode', function(e) {
			var offT = $('span.off', this),
				onT = $('span.on', this),
				tempP = $(this).parents('.check-header').next();

			if(offT.css('display') == 'none') {
				offT.show();
				onT.hide();
				$('span.fa', tempP).hide();
			}
			else {
				offT.hide();
				onT.show();
				$('span.fa', tempP).show();
			}
		});

		// click others
		$('a.open-others').on('click', function(){
			var temP = $(this).parents('.tag-list');
			$('div.hidden-input', temP).show();
			$(this).hide();
		});
		
		// window close proceasure
		var isChanged = false;
		
		$(window).on('beforeunload', function() {
			console.log(isChanged);
			if (isChanged) {
				return 'このページを離れようとしています。';
			}
		});
		$('form input, form select, form textarea').on('change', function() {
			isChanged = true;
		});
		$('button[type=submit]').on('click', function() {
			isChanged = false;
		});

		// 
		$('a.close-alert').on('click', function(){
			$(this).parent().hide();
			$('div.input-nav').removeData('affix').removeClass('affix affix-top affix-bottom');
			setTimeout(function() {
				$('div.input-nav').affix({
					offset: {
						top: 48
					}
				});
				$('body').scrollspy('refresh');
			}, 100);
		});
		// select2
//		$('#prop-list, #charger-list, #address1, #address2, #tikunen_year, #tikunen_month, #tpl-list, #supplier-name-list, #prop-type, #store-list').select2();

		// 
		$('#prop-list').on('change', function(){
			if($(this).val() == '') {
				$('div.include').hide();
			}
			else {
				$('div.include').show();
			}
		});
		
		/* view all
		 ================================================================================ */
		$('li.view-all > a > .ying').on('click', function(){
			var tempP = $(this).parent().parent().parent(),
				tempLi = $('li.hide-li', tempP);
			tempLi.show();
			setTimeout(function(){
				tempP.addClass('view-all-on');
			}, 50);
		});
		$('li.view-all > a > .yang').on('click', function(){
			var tempP = $(this).parent().parent().parent(),
				tempLi = $('li.hide-li', tempP);
			tempP.removeClass('view-all-on');
			setTimeout(function(){
				tempLi.hide();
			}, 50);
		});
		
		// add building
		$('a.add-subject').on('click', function(){
			var parT = $(this).parents('div.input-inner');
			$(this).hide();
			$('a.add-subject-close', parT).show();
			$('div.add-subject-box', parT).show();
		});
		$('a.add-subject-close').on('click', function(){
			var parS = $(this).parents('div.input-inner');
			$(this).hide();
			$('div.add-subject-box', parS).hide();
			$('a.add-subject', parS).show();
		});
		
		$('#modal-set-location').on('shown.bs.modal', function (e) {
			initialize2();
		});
		
		// affix
		$('div.input-nav').affix({
			offset: {
				top: 202
			}
		});
		// scrollspy
		$('body').scrollspy({
			target: 'div.input-nav',
			offset: 104
		});
		
		// anchor hover
		$('div.input-nav a').on('mouseenter', function(e){
			var tempBox = $(this).attr('href');
			tempBox = tempBox.replace('#', '');
			$('#' + tempBox).addClass('selected');
			e.preventDefault();
		});
		$('div.input-nav a').on('mouseleave', function(e){
			var tempBox = $(this).attr('href');
			tempBox = tempBox.replace('#', '');
			$('#' + tempBox).removeClass('selected');
			e.preventDefault();
		});
		
		// anchor click
		$('div.input-nav a').on('click', function(e) {
			var href = $(this).attr('href');
			var target = $(href == '#' || href == '' ? 'html' : href);
			var position = target.offset().top;
			position = position - 44;
			
			$('body, html').animate({
				scrollTop: position
			}, 400, 'swing');
			
			e.preventDefault();
			
			return false;
		});
		
		// scrollspy refresh
		$('div.building-box').on('shown.bs.collapse', function() {
			if ($(this).attr('id') == 'building-box-info') {
				$('ul.building-info-anchor').addClass('activate');
			}
			setTimeout(function() {
				$('body').scrollspy('refresh');
			}, 100);
		});
		$('div.building-box').on('hidden.bs.collapse', function() {
			if ($(this).attr('id') == 'building-box-info') {
				$('ul.building-info-anchor').removeClass('activate');
			}
			setTimeout(function() {
				$('body').scrollspy('refresh');
			}, 100);
		});
		
		$(window).scroll(function() {
			var s = $(this).scrollTop();
			var m = 300;
			if (s > m && !body.hasClass('bld-only')) {
				$('div.selected-building').addClass('active');
			}
		});
	}
	
	/* account
	==================================================================================================== */
	if($('body').hasClass('account')) {
		$('select.accesibility').on('change', function() {
			var tempV = $(this).val();
			if(tempV == '一般') {
				$('.additional-box').show();
			}
			else {
				$('.additional-box').hide();
			}
		});
	}
	
	/* login
	==================================================================================================== */
	if($('body').hasClass('login')) {
		$('#login-button').on('click', function(e){
			$('p.error-msg').show();
			$('#password').addClass('error');
			e.preventDefault();
			e.stopPropagation();
		});
		
		setTimeout(function(){
			$('div.login-notification').show();
			setTimeout(function(){
				$('#login-form').addClass('show-in');
			}, 300);
		}, 500);
	}

	
	/* chart
	==================================================================================================== */
	if($('body').hasClass('chart')) {

		/* chart ================================================== */
		
		
		
		
		
	}
	
	
	
/*
	if($('body').hasClass('list')){
		$('#list-paging').select2();
	}
*/
	// activate detail
/*	$('#select-category a').on('click', function(){
		$('#select-category').addClass('hide-slcate');
		$('div.spinner').spin('normal');
		setTimeout(function(){
			$('#select-category').hide().removeClass('hide-slcate');
			setTimeout(function(){
				$('#select-category').addClass('hide-slcate');
			}, 500);
		}, 1000);
		
	});
*/

	// notifications dropdown
/*	
	$('#notifications > div.inner > div > a').on('click', function(e){
		var tempP = $(this).parent();
		if(tempP.hasClass('dropped')){
			tempP.removeClass('dropped');
		}
		else {
			$('#notifications > div.inner > div').removeClass('dropped');
			tempP.addClass('dropped');
		}
		e.preventDefault();
		e.stopPropagation();
	});
*/
	// notification dropdown close
/*
	$('body').on('click', function(){
		if($('#notifications > div.inner > div').hasClass('dropped')){
			$('#notifications > div.inner > div').removeClass('dropped');
		}
	});
*/





});





/* ================================================================================
   functions
   ================================================================================ */

function sizeSet() {
	setTimeout(function(){
		$('div.sidebar-nav, div.main-content').removeAttr('style');
		
		snvH = $('div.sidebar-nav').height();
		mcoH = $('div.main-content').height();

		winH = $(window).height();
		tempH = (snvH >= mcoH) ? snvH : mcoH;
		tempH = (tempH >= winH) ? tempH : winH;

//		snv.height(tempH - 78);
//		mco.height(tempH);
	
//		$('.loader-container').height(winH - 300);
	
		// list
		if($('body').hasClass('list')){
			$('.search-container').height(tempH - 179);
		}
	}, 100);
	
}

// google map
function initialize() {
	// set height
	var temH = $(window).height();
	$('#map-body').height(temH - 206);
	
	// create marker
/*	var marker1 = new google.maps.Marker({
		positon: latlng
	});
*/
	// set first position
	var latlng = new google.maps.LatLng(35.709984,139.810703);
	// option
	var opts = {
		zoom: 15,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: true,
		zoomControl: true,
		scaleControl: true,
		streetViewControl: true
	};
	var map = new google.maps.Map(document.getElementById('map-body'), opts);
}
// google map
function initialize2() {
	// set height
	var temH = $(window).height();
	$('#map-body').height(temH - 240);
	// set first position
	var latlng = new google.maps.LatLng(35.709984,139.810703);
	// option
	var opts = {
		zoom: 15,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: true,
		zoomControl: true,
		scaleControl: true,
		streetViewControl: true
	};
	var map = new google.maps.Map(document.getElementById('map-body'), opts);
}
// google map
function initialize3() {
	// set first position
	var latlng = new google.maps.LatLng(35.709984,139.810703);
	// option
	var opts = {
		zoom: 15,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: true,
		zoomControl: true,
		scaleControl: true,
		streetViewControl: true
	};
	var map = new google.maps.Map(document.getElementById('kotu-map'), opts);
	var map2 = new google.maps.Map(document.getElementById('school-map'), opts);
}




// function for chart
function showTooltip(x, y, contents, z) {
	$('<div id="flot-tooltip">' + contents + '</div>').css({
		position: 'absolute',
		display: 'none',
		top: y - 30,
		left: x + 30,
		border: '2px solid',
		padding: '2px',
		'background-color': '#FFF',
		opacity: 0.80,
		'border-color': z,
		'-moz-border-radius': '5px',
		'-webkit-border-radius': '5px',
		'-khtml-border-radius': '5px',
		'border-radius': '5px'
	}).appendTo('body').fadeIn(200);
}
function getMonthName(numericMonth) {
	var monthArray = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
	var alphaMonth = monthArray[numericMonth];
	return alphaMonth;
}
function convertToDate(timestamp) {
	var newDate = new Date(timestamp);
	var dateString = newDate.getMonth();
	var monthName = getMonthName(dateString);
	return monthName;
}
 
function anchorPlace() {
	var winH1 = $(window).height(),
		winW1 = $(window).width(),
		contW = $('.modal-lg').width();
	contW = (winW1 - contW) / 2;
	$('.kanav').height(winH1 - 230).css('right', contW + 30);
}



