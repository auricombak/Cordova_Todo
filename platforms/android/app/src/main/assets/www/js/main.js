//Set todo list variable
var todoList = JSON.parse(localStorage.getItem('todos'));

$(document).ready(function(){
//Set counter
var i = 0;
//Check for todos
if(localStorage.getItem('todos') != null){
	//Loop through and output li items

	// HashMap<date, html>
	var html_list_view_map = {};

	$.each(todoList,function(key, value){

		if(!html_list_view_map.hasOwnProperty(value.todo_date)){
			html_list_view_map[value.todo_date] = [];
		}
		html_list_view_map[value.todo_date].push('<li id="task-'+i+'"><a id="todo_link" href="#edit" data-todo_name ="'+value.todo_name+'" data-todo_date="'+value.todo_date +'" data-todo_category="'+value.todo_category+'" data-todo_adress="'+value.todo_adress+'" data-todo_adress="'+value.todo_category+'" data-todo_time="'+value.todo_time+'">'+'<h2>'+value.todo_name+'</h2><p><strong>'+value.todo_adress+'</strong></p><p>'+value.todo_category+'</p><p class="ui-li-aside"><strong>'+value.todo_time+'</strong></p></a></li>');
		i++;
	});

	const html_list_view_map_sorted = {};
	Object.keys(html_list_view_map).sort().forEach(function(key) {
  	html_list_view_map_sorted[key] = html_list_view_map[key];
	});

	//For each date group event append to the list of events
	for (var key_date in html_list_view_map_sorted) {
 			if (html_list_view_map_sorted.hasOwnProperty(key_date)) {

					$('#todos').append('<li data-role="list-divider id="'+key_date+'">'+key_date+'<span class="ui-li-count">'+html_list_view_map_sorted[key_date].length+'</span></li>');
					html_list_view_map_sorted[key_date].forEach(function(event_html)
					{
   							$('#todos').append(event_html);
					});
 			}
	}

	//Refresh
	$('#todos').listview('refresh');
}

//Add Todo
$('#add_form').submit(function(){
	//Get submitted values
	var todo_name = $('#todo_name').val();
	var todo_date = $('#todo_date').val();
	var todo_time = $('#todo_time').val();
	var todo_category = $('#todo_category').val();
	var todo_adress = $('#todo_adress').val();

	//Simple field validation
	if(todo_name == ''){
		alert('Please give the todo a name');
	} else if(todo_date == ''){
		alert('Please add a date');
	} else {
		var todos = JSON.parse(localStorage.getItem('todos'));
		//Check todos
		if(todos == null){
			todos = [];
		}

		//Create array with new todo
		var new_todo = {
			"todo_name": todo_name,
			"todo_date": todo_date,
			"todo_time": todo_time,
			"todo_category": todo_category,
			"todo_adress" : todo_adress
		}
		todos.push(new_todo);
		//Store list of todo into JSON
		localStorage.setItem('todos',JSON.stringify(todos));
	}
});

	//Edit Todo
	$('#edit_form').submit(function(){
		currentTodoName = localStorage.getItem('currentTodoName');
		currentTodoDate = localStorage.getItem('currentTodoDate');
		currentTodoTime = localStorage.getItem('currentTodoTime');
		currentTodoCategory = localStorage.getItem('currentTodoCategory');
		currentTodoAdress = localStorage.getItem('currentTodoAdress');

		//Loop through todos
		for(var i=0; i < todoList.length; i++){
			if(todoList[i].todo_name == currentTodoName){
				//Delete the old todo
				todoList.splice(i,1);
				//todoList.splice(i,1, todo); New object
			}
			localStorage.setItem('todos',JSON.stringify(todoList));
		}

		//Create a new todo
		var todo_name_edit = $('#todo_name_edit').val();
		var todo_date_edit = $('#todo_date_edit').val();
		var todo_date_time = $('#todo_date_time').val();
		var todo_category_edit = $('#todo_category_edit').val();
		var todo_adress_edit = $('#todo_adress_edit').val();

		var todos = JSON.parse(localStorage.getItem('todos'));

		//Create array with new values
		var update_todo = {
			"todo_name": todo_name_edit,
			"todo_date": todo_date_edit,
			"todo_time": todo_date_time,
			"todo_category": todo_category_edit,
			"todo_adress" : todo_adress_edit
		};

		todos.push(update_todo);
		localStorage.setItem('todos',JSON.stringify(todos));
	});

	//Delete Todo
	$('#edit_form').on('click','#delete',function(){
		currentTodoName = localStorage.getItem('currentTodoName');
		currentTodoDate = localStorage.getItem('currentTodoDate');
		currentTodoTime = localStorage.getItem('currentTodoTime');
		currentTodoCategory = localStorage.getItem('currentTodoCategory');
		currentTodoAdress = localStorage.getItem('currentTodoAdress');

		//Loop through todos
		for(var i=0; i < todoList.length; i++){
			if(todoList[i].todo_name == currentTodoName){
				todoList.splice(i,1);
			}
			localStorage.setItem('todos',JSON.stringify(todoList));
		}
		//Close and go home
		$.mobile.changePage($('#home'),'pop');
	});

	$('#todos').on('click','#todo_link',function(){
		localStorage.setItem('currentTodoName',$(this).data('todo_name'));
		localStorage.setItem('currentTodoDate',$(this).data('todo_date'));
		localStorage.setItem('currentTodoTime',$(this).data('todo_time'));
		localStorage.setItem('currentTodoCategory',$(this).data('todo_category'));
		localStorage.setItem('currentTodoAdress',$(this).data('todo_adress'));
	});

	//Insert current data into edit form
	$(document).on('pageshow','#edit',function(){
		currentTodoName = localStorage.getItem('currentTodoName');
		currentTodoDate = localStorage.getItem('currentTodoDate');
		currentTodoTime = localStorage.getItem('currentTodoTime');
		currentTodoCategory = localStorage.getItem('currentTodoCategory');
		currentTodoAdress = localStorage.getItem('currentTodoAdress');

		$('#edit_form input[name=todo_name_edit]',this).val(currentTodoName);
		$('#edit_form input[name=todo_date_edit]',this).val(currentTodoDate);
		$('#edit_form input[name=todo_time_edit]',this).val(currentTodoTime);
		$('#edit_form input[name=todo_category_edit]',this).val(currentTodoCategory);
		$('#edit_form input[name=todo_adress_edit]',this).val(currentTodoAdress);
	});

	$(document).on('pageshow','#home',function(){
		window.location.reload();
	});

	//Clear Todos
	$('#clear_btn').click(function(){
		localStorage.clear();
	});


});
