// $(function () {
//     $('#request_button').click(function() {
//         $('#span6').text("データ取得中です");
//         $.ajax({
//             url:"https://reqres.in/api/users",
//             type:"GET",
//             data: {
//                 page:2
//             },
//             datatype:"JSON",
//             timespan:1000,
//          }).done(function(content, textStatus, jqXHR){
//             $("#span1").text(jqXHR.status);
//             $("#span2").text(textStatus);
//             $('#span4').text(content.data[0].first_name)

//             let content2 = JSON.stringify(content);
            
//             let content3 = JSON.parse(content2)
//             appendPerson(content3)
//          })
//     })

// })
// function appendPerson(content3) {
//     $(content3.data).each(function() {
//         console.log($(this)[0].first_name)
//     })
// }
// let data = {
//     "name": "morpheus",
//     "job": "leader"
// }
// $(function () {
//     $('#request_button').click(function() {
//         $('#span6').text("データ取得中です");
//         $.ajax({
//             url:"https://reqres.in/api/users",
//             type:"POST",
//             data:JSON.stringify(data),
//             datatype:"JSON",
//             timespan:1000,
//          }).done(function(content, textStatus, jqXHR){
//             $("#span1").text(jqXHR.status);
//             $("#span2").text(textStatus);
//             $('#span4').text(content)

//             let content2 = JSON.stringify(content);
            
//             let content3 = JSON.parse(content2)
//             console.log(content3)
//             appendCreatedAt(content3)
//          })
//     })

// })
// function appendCreatedAt(content3) {
//     $('#span4').text(content3.createdAt)
// }

$(function () {
    $('#request_button').click(function() {
        $('#span6').text("データ取得中です");
        $.ajax({
            url:"https://reqres.in/api/users/2",
            type:"DELETE",
            datatype:"JSON",
            timespan:1000,
         }).done(function(content, textStatus, jqXHR){
            $("#span1").text(jqXHR.status);
            $("#span2").text(textStatus);
            console.log(content)
         })
    })

})