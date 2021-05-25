const body = document.body;
var flag_3 = false;

function scrollLock(){
	const sidebar = document.querySelector('.floatup_sidebar');
	const modalWindow = document.querySelector('.modal_window');
	if (window.innerWidth <= 768 && sidebar.classList.contains('active') || modalWindow.classList.contains('floatup_input')) {
		$('body').addClass("scroll_disable");	
	}
	else
	{
		$('body').removeClass("scroll_disable");
	}
};

$(document).ready(function click(){		/*Sidebar floatup*/
	var sidebar = document.querySelector('.floatup_sidebar')

	$('.slide_icons').click(function(event){
		$('.slide_icons').toggleClass("click");
     	$('.floatup_sidebar').toggleClass('active');		
		scrollLock();
		if (window.innerWidth <= 500)
		{
			if (sidebar.classList.contains('active'))
			{
				flag_3 = true;
				$('.inactive_button').addClass('orange_menu');
				$('.active_button').addClass('orange_cancel');
			}
			else
			{
				$('.inactive_button').removeClass('orange_menu');
				$('.active_button').removeClass('orange_cancel');
				flag_3 = false;
			}
		}
	});
});

$(document).ready(function form(){		/*Popup floatup*/
	$('.request_button, .contacts_button').click(function(event){
    	$('.modal_toner').addClass('active_toner');
    	$('.modal_window').addClass('floatup_input');
		$('.menu_button').addClass('hidden');
		scrollLock();
 	});
	$('.close_window_button, .m_close').click(function(event){
		$('.modal_toner').removeClass('active_toner');
    	$('.modal_window').removeClass('floatup_input');
		$('.menu_button').removeClass('hidden');
		scrollLock();
	 });
	 	//button close window
	let button = $('#close_window_button');
    let floatBorder = $('#floating_border');
    button.mouseover(function(){
        floatBorder.addClass('border_visible')
    });
    button.mouseout(function(){
        floatBorder.removeClass('border_visible')
    });
});

$(document).ready(function sticky(){			/*Sticky menu button*/
	const navOffset = $('.sticky').offset().top;
	const winHeight = window.innerHeight;
	var buttonWidth = $('.menu_button').width();
	$(window).scroll(function(){
		const scroll = $(this).scrollTop();
		if (scroll >= (navOffset) - 10) {
			$('.sticky').addClass('menu_button_sticky');
			$('.phone_wrapper').css(
				{
					'paddingRight': `${buttonWidth}px`
				});
		}
		else if(scroll <= (navOffset) - 10) {
			$('.sticky').removeClass('menu_button_sticky');
			$('.phone_wrapper').css(
				{
					'paddingRight': '0px'
				});
		}
			//Change color menu button
		if (scroll >= (winHeight - 30) && flag_3 == false) {
			$('.inactive_button').addClass('orange_menu');
			$('.active_button').addClass('orange_cancel');
		}
		if (scroll <= (winHeight - 30) && flag_3 == false) {
			$('.inactive_button').removeClass('orange_menu');
			$('.active_button').removeClass('orange_cancel');
		}

	});
});

$(document).ready(function slider(){			/*Slider form*/
	var slideStep = 1;
		position = 0;
	const slideArea = $('.slide_tracker').width();/*horizontal slide distance*/
	const track = $('.slide_tracker'); /*Moving line*/
	const stepsBg = $('.steps_bg_1, .steps_bg_2, .steps_bg_3, .steps_bg_4');/*For shorten the code length further*/
	const stepsNum = $('.step_number_1, .step_number_2, .step_number_3, .step_number_4');/*For shorten the code length further*/
	const stepsMod = $('.active_step, .left_to_center_anim, .center_to_right_anim, .right_to_center_anim, .center_to_left_anim');
	const stepsModClass = 'active_step left_to_center_anim center_to_right_anim right_to_center_anim center_to_left_anim';
	var trackHeight = $('.slide_box');
	var slidesHeight = [$('.slide_1').outerHeight(), $('.slide_2').outerHeight(), $('.slide_3').outerHeight(), $('.slide_4').outerHeight()];
	var next = $('.next').height();
	var gridCollection = $('#grid_1, #grid_2, #grid_3, #grid_4, #grid_5, #grid_6, #grid_7, #grid_8');
	var choiceText = $('.choice_text');
	var choiceID;
	var cho;
	var flag_1 = false;
	var flag_2;
	var slideHeight;

	$('.choice_body_wrapper').click(function slideSteps(){
		gridCollection.css(
			{
				'transform': ''
			});
		cho = choiceID;
		$(`#on_${cho}`).removeClass('opacity_enable_anim opacity_disable_anim');
		$(`#on_${cho}`).addClass('opacity_disable_anim');
		$(`#cur_${cho}`).removeClass('slide_right_to_center slide_center_to_right');
		$(`#cur_${cho}`).addClass('slide_right_to_center');
		$(`#choice_img_${cho}`).removeClass('choice_shadow');
		choiceID = this.id.substring(this.id.length -1);

		if ($(`#check_${choiceID}`).prop('checked') === false){
			flag_1 = true;
			$(`#check_${choiceID}`).prop('checked', true)
			gridCollection.css(
				{
					'transform': 'scale(1.0)',
				});

			$(`#grid_${choiceID}`).css(
				{
					'transform': 'scale(1.05)',
				});
			$(`#on_${choiceID}`).removeClass('opacity_disable_anim');
			$(`#on_${choiceID}`).addClass('opacity_enable_anim');
			$(`#cur_${choiceID}`).removeClass('slide_right_to_center');
			$(`#cur_${choiceID}`).addClass('slide_center_to_right');
			$(`#choice_img_${choiceID}`).removeClass('choice_shadow_none');
			$(`#choice_img_${choiceID}`).addClass('choice_shadow');
		}
		else if($(`#check_${choiceID}`).prop('checked') === true){
				flag_1 = false;
				$(`#check_${choiceID}`).prop('checked', false);
				$(`#on_${choiceID}`).addClass('opacity_disable_anim');
				$(`#choice_img_${choiceID}`).removeClass('choice_shadow_none');
				$(`#choice_img_${choiceID}`).addClass('choice_shadow');
		}
	});
	
	$('.choice_body_wrapper').mouseover(function mouse1(){
		if (flag_1 == true){
			return;
		};
		let choiceID = this.id.substring(this.id.length -1);
		$(`#choice_img_${choiceID}`).addClass('choice_shadow');
		
	});

	$('.choice_body_wrapper').mouseout(function mouse2(){
		if (flag_1 == true){
			return;
		};
		let choiceID = this.id.substring(this.id.length -1);
		$(`#choice_img_${choiceID}`).removeClass('choice_shadow');
	});

	$('.contact_wrapper').click(function slideSteps(){
		cho = choiceID;
		$(`#contact_${cho}`).removeClass(`contact_shadow_${cho}`);
		choiceID = this.id.substring(this.id.length -1);
		$('.contact_wrapper').css(
			{
				'transform': ''
			});
		if ($(`#a_check_${choiceID}`).prop('checked') === false){
			flag_2 = true;
			$(`#a_check_${choiceID}`).prop('checked', true);
			$(`#contact_${choiceID}`).css(
				{
					'transform': 'scale(1.05)'
				});
			$(`#contact_${choiceID}`).addClass(`contact_shadow_${choiceID}`);
		}
		else if ($(`#a_check_${choiceID}`).prop('checked') === true){
			flag_2 = false;
			$(`#a_check_${choiceID}`).prop('checked', false);
			$(`#contact_${choiceID}`).addClass(`contact_shadow_${choiceID}`);
		}
	});

	$('.contact_wrapper').mouseover(function mouse3(){
		if (flag_2 == true){
			return;
		};
		let choiceID = this.id.substring(this.id.length -1);

		$(`#contact_${choiceID}`).addClass(`contact_shadow_${choiceID}`);
	});

	$('.contact_wrapper').mouseout(function mouse4(){
		if (flag_2 == true){
			return;
		};
		let choiceID = this.id.substring(this.id.length -1);

		$(`#contact_${choiceID}`).removeClass(`contact_shadow_${choiceID}`);
	});

	function buttonText(){
		if (slideStep == 4){
			document.querySelector('.next').innerHTML = "Отправить";
		}
		else{
			document.querySelector('.next').innerHTML = "Следующий вопрос";
		}
		};
		
		function slideQuestion()
		{
			if (slideStep == 1){
				document.querySelector('.slide_question_2').innerHTML = "Какая у вас техника?";
			}
			if (slideStep == 2){
				document.querySelector('.slide_question_2').innerHTML = "Какая у вас наработка?";
			}
			if (slideStep == 3){
				document.querySelector('.slide_question_2').innerHTML = "Какая у вас неисправность?";
			}
			if (slideStep == 4){
				document.querySelector('.slide_question_2').innerHTML = "Остался последний шаг до получения скидки";
			}
		};

		$('.back').click(function(){
			if (slideStep > 1){
				slideStep = slideStep - 1;

				slideHeight = $(`.slide_${slideStep}`).outerHeight();
				position = (position + slideArea) + 400;
				trackHeight.height(slidesHeight[slideStep - 1]);

				$(`.slide_step_${slideStep + 1}`).removeClass('border_none');
				$(`.step_number_${slideStep + 1}`).removeClass('white');
				$(`.steps_bg_${slideStep + 1}`).removeClass('active_step left_to_center_anim center_to_right_anim right_to_center_anim center_to_left_anim');
				$(`.steps_bg_${slideStep + 1}`).addClass('center_to_left_anim');
				$(`.steps_bg_${slideStep}`).removeClass('active_step left_to_center_anim center_to_right_anim right_to_center_anim center_to_left_anim');
				$(`.slide_step_${slideStep}`).addClass('border_none');
				$(`.steps_bg_${slideStep}`).addClass('right_to_center_anim');				
				$(`.step_number_${slideStep}`).addClass('white');
					track.css(
					{
						transform: `translateX(${position}px)`
					});
			}
			slideQuestion();
			buttonText();
		});

		$('.next').click(function(){
			if (slideStep < 4){
				slideStep = slideStep + 1;

				slideHeight = $(`.slide_${slideStep}`).outerHeight();
				position = (position - slideArea) - 400;
				trackHeight.height(slidesHeight[slideStep - 1]);

				$(`.slide_step_${slideStep - 1}`).removeClass('border_none');
				$(`.step_number_${slideStep - 1}`).removeClass('white');
				$(`.steps_bg_${slideStep - 1}`).removeClass('active_step left_to_center_anim center_to_right_anim right_to_center_anim center_to_left_anim');
				$(`.steps_bg_${slideStep - 1}`).addClass('center_to_right_anim');
				$(`.steps_bg_${slideStep}`).removeClass('active_step left_to_center_anim center_to_right_anim right_to_center_anim center_to_left_anim');
				$(`.slide_step_${slideStep}`).addClass('border_none');
				$(`.steps_bg_${slideStep}`).addClass('left_to_center_anim');
				$(`.step_number_${slideStep}`).addClass('white')
					track.css(
					{
						transform: `translateX(${position}px)`
					});
			}
			slideQuestion();
			buttonText();
		});
});

$(document).ready(function butt(){		//gradient button
	let button = $('#download_button');
	let buttonText = $('#download_button_text');
	let buttonBG = $('#download_button_bg');

    button.mouseover(function(){
		buttonBG.addClass('download_button_body_hover')
        buttonText.addClass('download_button_text_hover');

    });
    button.mouseout(function(){
		buttonBG.removeClass('download_button_body_hover')
        buttonText.removeClass('download_button_text_hover');
		
    });
});

$(document).ready(function kamaz(){
	const kamazPosition = $('.truck_kamaz').offset().top;
	const winHeight = window.innerHeight;
	const kamazHeight = document.querySelector('.truck_kamaz').offsetHeight;
	$(window).scroll(function(){
		const scroll = $(this).scrollTop();
		if (scroll + winHeight - kamazHeight - 40 >= kamazPosition && window.innerWidth > 1200) {
			$('.truck_kamaz').addClass('kamaz_anim');
		}
		else if(scroll + winHeight - kamazHeight - 40 >= kamazPosition && window.innerWidth <= 1200)
		{
			$('.truck_kamaz').addClass('kamaz_anim_adaptive');
		}
	});
});