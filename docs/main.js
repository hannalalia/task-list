const tasks = document.querySelector('#tasks')
	const taskRows = document.querySelector('#taskRows');
	const taskInp = document.querySelector('#task');
	const add =  document.querySelector('#addBtn');
	var taskList = {
		names: []
	}

	if(localStorage.length>0){
			pop_table();
			var delBtn = document.querySelectorAll('.delete');
			var editBtn = document.querySelectorAll('.edit');
		}

	
	add.addEventListener("click", function () {
		let taskName = taskInp.value; 
		if(!taskName){
			alert("Please type something...")
		}
		else{
		taskList.names.push(taskName);
		localStorage.setItem("taskList", JSON.stringify(taskList));
		tasks.innerHTML += `<tr>
						<td>${taskName}</td>
						<td class="btnColumn"><button class="btn edit"><i class="far fa-edit"></i></button></td>
						<td class="btnColumn"><button class="btn delete"><i class="far fa-trash-alt"></i></button></td>
					</tr>`;
		}
		location.reload();
	});

		function pop_table(){
				 taskList = JSON.parse(localStorage.getItem('taskList'));
				for (let i = 0; i < taskList.names.length; i++) {
					tasks.innerHTML += `<tr>
						<td>${taskList.names[i]}</td>
						<td class="btnColumn"><button class="btn edit"><i class="far fa-edit"></i></button></td>
						<td class="btnColumn"><button class="btn delete"><i class="far fa-trash-alt"></i></button></td>
					</tr>`;

				}
		}
		if(delBtn){
			for(let i = 0; i<delBtn.length; i++){
					delBtn[i].addEventListener("click", function(){
					taskList.names.splice(i,1);
					localStorage.setItem("taskList", JSON.stringify(taskList));
					location.reload();
					})
			}
		}
		if(editBtn){
			for(let i = 0; i<editBtn.length; i++){
				var count =1;
					editBtn[i].addEventListener("click", function(){
						const list = tasks.children;
						const rows = list[i];
						const td = rows.children;
						const  taskName = td[0];
						const taskEdit = taskName.children;
						
						if(count%2==1){
							taskName.innerHTML = `<input class='editTask' type='text' value='${taskList.names[i]}'>`;
							const editTask = document.querySelector('.editTask');
							editTask.select()
							count++;
						}
						else{
							if(!taskEdit[0]){
								alert('Please save the current edit.')
							}
							else{
							taskList.names[i]=taskEdit[0].value;	
							localStorage.setItem("taskList", JSON.stringify(taskList));
							location.reload();	
							count++;	}		
						}						
					});
			}
		}
	
