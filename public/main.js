var check = document.getElementsByClassName("fa fa-solid fa-check");
var trash = document.getElementsByClassName("fa-trash");



Array.from(check).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText

        fetch('/shows/watched', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'watched': true
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});


// this array is used to show how to delete the messages
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        fetch('/shows', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'watched': false
          })
        }).then(function (response) {
          window.location.reload() //triggers the get request
        })
      });
});
