$(document).ready(onReady);

let empSalList = [];

function onReady() {
    buttonHoverSubmit();
    buttonHoverClear();
    submitEmp();
    clearTable();
    delEmp();
    $("#totalMonthlyIncome").append(0);
}

function buttonHoverSubmit() {
    $("#submitButton").hover(function () {
        $("#submitButton").addClass('hoveredSubmit');
    },
        function () {
            $("#submitButton").removeClass('hoveredSubmit');
        })
}

function buttonHoverClear() {
    $("#clearButton").hover(function () {
        $("#clearButton").addClass('hoveredClear');
    },
        function () {
            $("#clearButton").removeClass('hoveredClear');
        })
}

function submitEmp() {
    $("#submitButton").on("click", function () {
        let fName = $("#fName").val();
        let lName = $("#lName").val();
        let id = $("#id").val();
        let title = $("#title").val();
        let salary = $("#salary").val();
        if (!fName || !lName || !id || !title || !salary) {
            alert("Please Enter All Employee Fields")
        }

        else {
            $("#empTable").append(`<tr>
            <td>${fName}</td>
            <td>${lName}</td>
            <td>${id}</td>
            <td>${title}</td>
            <td>${salary}</td>
            <td><button id="delEmp" class="delEmp">Delete</button></td></tr>`);
            $("#delEmp").val(salary/12);
            empSalList.push((salary/12));
            updateTotal();
            $("#fName").val('');
            $("#lName").val('');
            $("#id").val('');
            $("#title").val('');
            $("#salary").val('');
        }

    })
}

function clearTable(){
    $("#clearButton").on("click",function(){
        $("#empTable").empty();
        $("#empTable").append(`<tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>ID</th>
        <th>Title</th>
        <th>Annual Salary</th>
        <th class="invis"></th></tr>`);
        empSalList=[];
        updateTotal();
    })
}

function delEmp(){
    $("#empTable").on(`click`,`.delEmp`,function(event){
        let salary = $(event.target).closest('button').val()
        let index = empSalList.indexOf(salary);
        empSalList.splice(index,1)
        $(event.target).closest('tr').remove();
        updateTotal();
    })
}

function updateTotal(){
    let tot = 0;
    for (let sal of empSalList){
        tot+=sal;
    }
    $("#totalMonthlyIncome").empty();
    $("#totalMonthlyIncome").append(`Total Monthly Income: ${tot.toFixed(2)}`);
    if (tot<20000){
        $("#totalMonthlyIncome").removeClass('exceeds')
    }
    else {
        $("#totalMonthlyIncome").addClass('exceeds')

    }
}
