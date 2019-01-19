function login() {
  alert('logging in');
  $.post('/getSaltForLogin',
    function(saltForLogin,status) {
    $.post('/getSaltForUser',
        {email: $('#email').val()},
        function (saltForUser,status){
      $.post('/checkUserHash',
      {clienthash: sha512(saltForLogin + sha512(saltForUser + $('#password').val())),email: $('#email').val()},
        function (data,status) {
          window.location.replace("/home");
        });
    });
  });
}

function add_page() {
  if ($('#name').val() == "") {
    alert("Provide a name");
    return;
  }
  if ($('#tags').val() == "") {
    alert("Provide a tag");
    return;
  }
  if ($('#route').val() == "") {
    alert("Provide a route");
    return;
  }
  if ($('#desc').val() == "") {
    alert("Provide a description.");
    return;
  }
  if ($('#by').val() == "") {
    alert("Please provide an author.");
    return;
  }
  if ($('#category').val() == "") {
    alert("Please provide a category.");
    return;
  }

  var myObj = new Object();
  myObj.route = $('#route').val();
  myObj.desc = $('#desc').val();
  myObj.by = $('#by').val();
  myObj.category = $('#category').val();
  myObj.page = $('#name').val();
  myObj.tags = $('#tags').val().split(",").map(function(item){
    return item.trim();
  });

  $.post('/add_page_into_db',
  {data: myObj},
  function(data,status) {
    alert(data);
  });
}

function editDetail(route) {
  window.location.replace("/api/edit_index_detail?route=" + route);
  alert('editing ' + route);
}
